import { boundaryData } from "./Data";
export const boundaryPlot = {
    x: boundaryData.map((d: any) => d.X),
    y: boundaryData.map((d: any) => d.Y),
    type: 'scattergl',
    mode: 'lines',
    line: {
        color: 'black',
        width: 2
    },
    name: 'Boundary'
};