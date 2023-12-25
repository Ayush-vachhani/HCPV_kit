<script lang="ts">
    import { onMount } from "svelte";
    import { getMapForYear } from "$lib/TS/HCPV/Movable_Gas_Actual/MainPlot";
    import { axisConfig } from "$lib/TS/Axis";


    let plotContainer: any;
    let Plotly: any;
    let selectedYear = 1993; // Initial year

    onMount(async () => {
        //@ts-ignore
        Plotly = (await import("plotly.js-dist/plotly.js")).default;
        const initialPlotData = getMapForYear(selectedYear);
        Plotly.newPlot(plotContainer, [initialPlotData], axisConfig);
    });
    $: {
        const plotData = getMapForYear(selectedYear);
        if (Plotly) {
            Plotly.react(plotContainer, [plotData], axisConfig);
        }
    }
</script>

<div class="year-slider-container">
    <input class="year-slider" type="range" min="1993" max="2022" step="1" bind:value={selectedYear}/>
    <div>Selected Year: {selectedYear}</div>
</div>

<div class="plot-container" bind:this={plotContainer}></div>