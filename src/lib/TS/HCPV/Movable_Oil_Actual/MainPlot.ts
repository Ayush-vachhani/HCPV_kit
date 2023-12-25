import { dataset } from './Data';

export function getMapForYear(year:number) {
    const yearData = dataset.filter(d => +d.year === year);

    if (yearData.length === 0) {
        console.error(`Data for year ${year} is not available.`);
        return null;
    }

    const processedData = yearData.map(d => ({
        x: +d.X,
        y: +d.Y,
        V: +d.V,
        text: `Value: ${d.V}`, // Adjust the text as needed
    }));

    return {
        x: processedData.map(d => d.x),
        y: processedData.map(d => d.y),
        mode: 'markers',
        type: 'scattergl',
        text: processedData.map(d => d.text),
        marker: {
            color: processedData.map(d => d.V),
            colorscale:[
                [1.0, 'rgb(0,0,255)'],
                [0.8, 'rgb(0,127,255)'],
                [0.6, 'rgb(0,255,0)'],
                [0.4, 'rgb(255,255,0)'],
                [0.2, 'rgb(255,165,0)'],
                [0.0, 'rgb(255,0,0)']
            ],
            size: 8,
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
