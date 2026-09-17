import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./kpi-row.dax?raw";
import spec from "./kpi-row.json";

export const kpiRowColumnMetadata: ColumnMetadataMap = {
    "[BilledValue]": { name: "BilledValue", displayName: "Billed value", format: "$#,0", semanticType: "Amount" },
    "[TotalHours]": { name: "TotalHours", displayName: "Total hours", format: "#,0", semanticType: "Duration" },
    "[ActiveMatters]": { name: "ActiveMatters", displayName: "Active matters", format: "#,0", semanticType: "Count" },
    "[OutstandingAmount]": { name: "OutstandingAmount", displayName: "Outstanding amount", format: "$#,0", semanticType: "Amount" },
};

export function kpiRow(filters?: ReportQueryFilters) {
    return {
        connection: "legalModel",
        query: applyReportFilters(baseQuery, filters),
        columnMetadata: kpiRowColumnMetadata,
        vegaLiteSpec: spec as VisualizationSpec,
    };
}
