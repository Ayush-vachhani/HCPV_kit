export const axisConfig = {
    title: 'Dynamic Satuaration Map',
    xaxis: {
        title: 'EASTING',
        range: [3.272e6, 3.286e6], // Replace minX and maxX with your actual values
        dtick: 1000 // Replace xTickGap with the desired distance between ticks
    },
    yaxis: {
        title: 'NORTHING',
        range: [1.082e6, 1.092e6], // Replace minY and maxY with your actual values
        dtick: 1000 // Replace yTickGap with the desired distance between ticks
    },
    b: 150,
    r:450,
    width: 1200,
    height: 800,
    autosize:true,
};