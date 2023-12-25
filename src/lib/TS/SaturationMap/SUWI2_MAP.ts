import { datasets } from "./Data";
export function getSUWI2_MapForYear(year: number) {
    if (!datasets[year]) {
        console.error(`Data for year ${year} is not available.`);
        return null;
    }
    const processedData = datasets[year].map((d: { X: string | number; Y: string | number; SUWI2: any; }) => ({
        x: +d.X,
        y: +d.Y,
        text: `SUWI2: ${d.SUWI2}`,
        SUWI2: +d.SUWI2,
        markerSize: 7, // Assuming marker size is static
    }));
    return {
        x: processedData.map((d:any) => d.x),
        y: processedData.map((d:any) => d.y),
        mode: 'markers',
        type: 'scattergl',
        willReadFrequently: true,
        text: processedData.map((d:any) => d.text),
        processedData: processedData,
        marker: {
            colorbar: {
                title: "SUWI2 Value",
                titleside: "right",
                thickness: 10,
                len: 0.5,
                x: 1.20,
                y: 0.5,
            },
            color: processedData.map((d:any) => d.SUWI2),
            colorscale: [
                [0, "#fde725"],     // Red
                [0.2, "#5ec962"],   // OrangeRed
                [0.4, "#21918c"],   // DarkCyan starts earlier
                [0.7, "#008B8B"],   // DarkCyan dominates more of the scale
                [0.9, "#3b528b"],   // RoyalBlue
                [1, "#440154"]      // Blue
            ],
            size: 8,
            opacity: 0.8,
        },
        name:"SUWI2"
    };
}