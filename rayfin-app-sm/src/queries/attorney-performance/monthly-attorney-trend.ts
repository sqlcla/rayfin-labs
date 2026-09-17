import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./monthly-attorney-trend.dax?raw";
import spec from "./monthly-attorney-trend.json";

export const monthlyAttorneyTrendColumnMetadata: ColumnMetadataMap = {
    "[MonthStart]": { name: "MonthStart", displayName: "Month", format: "mmm yyyy", semanticType: "YearMonth" },
    "[BilledValue]": { name: "BilledValue", displayName: "Billed value", format: "$#,0", semanticType: "Amount" },
    "[TotalHours]": { name: "TotalHours", displayName: "Total hours", format: "#,0", semanticType: "Duration" },
};

export function monthlyAttorneyTrend(filters?: ReportQueryFilters) {
    return { connection: "legalModel", query: applyReportFilters(baseQuery, filters), columnMetadata: monthlyAttorneyTrendColumnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
