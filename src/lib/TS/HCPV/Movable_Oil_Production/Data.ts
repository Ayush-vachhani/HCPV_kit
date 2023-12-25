import {csv} from "d3-fetch";
let boundaryData: any = [];
let wellsData: any = [];
let dataset = await csv("/HCPV_MOVABLE_OIL_PRODUCTION.csv");
export {dataset};