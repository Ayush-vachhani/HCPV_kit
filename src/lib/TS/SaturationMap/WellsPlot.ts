import { wellsData } from "./Data";

export const wellsPlot = wellsData.map((d: any) => ({
    x: [d.x_b4_b5],
    y: [d.y_b4_b5],
    mode: 'markers+text',
    type: 'scattergl',
    text: [d.WELL],
    marker: {
        color: 'black',
        size: 7
    },
    textposition: 'top right',
    name: d.WELL,
    visible: true
}));