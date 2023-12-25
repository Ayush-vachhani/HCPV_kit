import {csv} from "d3-fetch";
let datasets: { [key: number]: any } = {};
let boundaryData: any = [];
let wellsData: any = [];
datasets[1993] = await csv("/df_1993_WITH_MEAN.csv");
datasets[1998] = await csv("/df_1998_WITH_MEAN.csv");
datasets[2003] = await csv("/df_2003_WITH_MEAN.csv");
boundaryData = await csv("/Study_area_polygon.csv");
wellsData =  await csv("/WellStatic_df.csv");
function interpolateValue(year: number, value1: number, value2: number, year1: number, year2: number): number {
    return value1 + ((year - year1) * (value2 - value1)) / (year2 - year1);
}
function interpolateDataForYear(year: number) {
    if (datasets[year]) return datasets[year];

    let yearBefore: number, yearAfter: number;
    if (year < 1998) {
        yearBefore = 1993;
        yearAfter = 1998;
    } else {
        yearBefore = 1998;
        yearAfter = 2003;
    }
    const interpolatedData = datasets[yearBefore].map(
        (d: any, index: number) => {
            const valueBefore = +datasets[yearBefore][index].SUWI2;
            const valueAfter = +datasets[yearAfter][index].SUWI2;
            const interpolatedValue = interpolateValue(
                year,
                valueBefore,
                valueAfter,
                yearBefore,
                yearAfter
            );
            return {X: d.X, Y: d.Y, SUWI2: interpolatedValue,};
        }
    );
    datasets[year] = interpolatedData; // Storing the interpolated data
    return interpolatedData;
}
for (let year = 1994; year <= 2002; year++) {
    if (!datasets[year]) { // Check if the data isn't already loaded
        interpolateDataForYear(year);
    }
}
export {datasets, boundaryData, wellsData};