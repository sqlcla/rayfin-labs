import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./monthly-billed-value-trend.dax?raw";
import spec from "./monthly-billed-value-trend.json";

export const monthlyBilledValueTrendColumnMetadata: ColumnMetadataMap = {
    "[MonthStart]": { name: "MonthStart", displayName: "Month", format: "mmm yyyy", semanticType: "YearMonth" },
    "[BilledValue]": { name: "BilledValue", displayName: "Billed value", format: "$#,0", semanticType: "Amount" },
};

export function monthlyBilledValueTrend(filters?: ReportQueryFilters) {
    return {
        connection: "legalModel",
        query: applyReportFilters(baseQuery, filters),
        columnMetadata: monthlyBilledValueTrendColumnMetadata,
        vegaLiteSpec: spec as VisualizationSpec,
    };
}
