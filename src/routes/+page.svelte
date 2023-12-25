
<script lang="ts">
    import { onMount } from "svelte";
    import {axisConfig} from "$lib/TS/Axis";
    import { getSUWI2_MapForYear } from "$lib/TS/SaturationMap/SUWI2_MAP";
    import { boundaryPlot } from "$lib/TS/SaturationMap/BoundaryPlot";
    import { wellsPlot } from "$lib/TS/SaturationMap/WellsPlot";
    import { wellsData } from "$lib/TS/SaturationMap/Data";
    //Plot container
    let plotContainer: any;
    let allWellsVisible: boolean = true;
    let Plotly: any;
    //Plot config data
    let suwi2Min = 0.0;
    let suwi2Max = 1.0;
    let selectedYear = 1993;
    //reactive data
    let filteredData = getSUWI2_MapForYear(selectedYear)?.processedData.filter(
        (d: any) => d.SUWI2 >= suwi2Min && d.SUWI2 <= suwi2Max,
    );
    let updatedTrace = {
        ...getSUWI2_MapForYear(selectedYear),
        x: filteredData.map((d: any) => d.x),
        y: filteredData.map((d: any) => d.y),
        text: filteredData.map((d: any) => `SUWI2: ${d.SUWI2}`),
    };
    let updatedWells = wellsPlot.map((trace: any) => ({
        ...trace,
        visible: allWellsVisible ? true : "legendonly",
    }));
    function updatePlot(suwi2Min: number, suwi2Max: number, selectedYear: number, updatedWells: any) {
        console.log("updated the plot");
        if (!Plotly) return;
        Plotly.react(
            plotContainer,
            [updatedTrace, boundaryPlot, ...updatedWells],
            axisConfig,
        );
    }
    function toggleAllWells() {
        console.log("toggleAllWells");
        allWellsVisible = !allWellsVisible;
        updatedWells = wellsPlot.map((trace: any) => ({
            ...trace,
            visible: allWellsVisible ? true : "legendonly",
        }));
        Plotly.react(
            plotContainer,
            [getSUWI2_MapForYear(selectedYear), boundaryPlot, ...updatedWells],
            axisConfig,
        );
        updatePlot(suwi2Min, suwi2Max, selectedYear, updatedWells);
    }
    $: filteredData = getSUWI2_MapForYear(selectedYear)?.processedData.filter(
        (d: any) => d.SUWI2 >= suwi2Min && d.SUWI2 <= suwi2Max,
    );
    $: updatedTrace = {
        ...getSUWI2_MapForYear(selectedYear),
        x: filteredData.map((d: any) => d.x),
        y: filteredData.map((d: any) => d.y),
        text: filteredData.map((d: any) => `SUWI2: ${d.SUWI2}`),
    };
    $: updatedWells = wellsPlot.map(trace => {
        const wellData = wellsData.find(well => well.WELL === trace.name);
        const isVisible = wellData.Prod_date-1 < selectedYear;
        return {
            ...trace,
            visible: allWellsVisible && isVisible ? true : 'legendonly',
        };
    });
    console.log("Wells data",wellsData);
    $: updatePlot(suwi2Min, suwi2Max, selectedYear, updatedWells);
    onMount(async () => {
        //@ts-ignore
        Plotly = (await import("plotly.js-dist/plotly.js")).default;
        Plotly.newPlot(
            plotContainer,
            [getSUWI2_MapForYear(selectedYear), boundaryPlot, ...updatedWells],
            axisConfig,
        );
    });
</script>

<div class="body">
    <button class="toggle-wells-btn" style="background-color: {allWellsVisible ? 'green' : 'red'}" on:click={toggleAllWells}>{allWellsVisible ? "SHOW ALL" : "HIDE ALL"}</button>
</div>

<div class="whole-c">
    <div class="plot-container" bind:this={plotContainer}></div>
    <div class="range-sliders">
        <input class="suwi-range" type="range" min="0" max="1" step="0.1" bind:value={suwi2Min}/>
        <br><br>
        <input class="suwi-range" type="range" min="0" max="1" step="0.1" bind:value={suwi2Max}/>
        <div>Selected Range: {suwi2Min} to {suwi2Max}</div>
    </div>
</div>

<div class="year-slider-container">
    <input class="year-slider" type="range" min="1993" max="2003" step="1" bind:value={selectedYear}/>
    <div style="margin-left:auto; margin-right:auto;">Selected Year: {selectedYear}</div>
</div>