import { dataset } from './Data';

export function getMapForYear(year: number) {
    // Filter the dataset for the selected year
    const yearData = dataset.filter((d: { year: string | number; }) => +d.year === year);

    if (yearData.length === 0) {
        console.error(`Data for year ${year} is not available.`);
        return null;
    }

    const processedData = yearData.map((d: { X: string | number; Y: string | number; V: string | number; }) => ({
        x: +d.X,
        y: +d.Y,
        V: +d.V,
        text: `Value: ${d.V}`, // Adjust the text as needed
    }));

    return {
        x: processedData.map((d: { x: any; }) => d.x),
        y: processedData.map((d: { y: any; }) => d.y),
        mode: 'markers',
        type: 'scattergl',
        text: processedData.map((d: { text: any; }) => d.text),
        marker: {
            color: processedData.map((d: { V: any; }) => d.V),
            colorscale:[
                [1.0, 'rgb(0,0,255)'],
                [0.8, 'rgb(0,127,255)'],
                [0.6, 'rgb(0,255,0)'],
                [0.4, 'rgb(255,255,0)'],
                [0.2, 'rgb(255,165,0)'],
                [0.0, 'rgb(255,0,0)']
            ],
            size: 8, // You can also map the size to V if needed
            opacity: 0.8,
            colorbar: {
                title: "Value",
                titleside: "right",
                thickness: 10,
                len: 0.5,
                x: 1.20,
                y: 0.5,
            },
        },
        name: "Data for " + year
    };
}
