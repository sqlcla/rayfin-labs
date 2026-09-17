import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./rank-comparison.dax?raw";
import spec from "./rank-comparison.json";

export const rankComparisonColumnMetadata: ColumnMetadataMap = {
    "[AttorneyName]": { name: "AttorneyName", displayName: "Attorney", semanticType: "Name" },
    "[PracticeArea]": { name: "PracticeArea", displayName: "Practice area", semanticType: "Category" },
    "[BilledRank]": { name: "BilledRank", displayName: "Billed rank", format: "#,0", semanticType: "Rank" },
    "[HoursRank]": { name: "HoursRank", displayName: "Hours rank", format: "#,0", semanticType: "Rank" },
    "[BilledValue]": { name: "BilledValue", displayName: "Billed value", format: "$#,0", semanticType: "Amount" },
    "[TotalHours]": { name: "TotalHours", displayName: "Total hours", format: "#,0", semanticType: "Duration" },
    "[UtilizationPercent]": { name: "UtilizationPercent", displayName: "Utilization", format: "0%", semanticType: "Percentage" },
    "[EffectiveBillRate]": { name: "EffectiveBillRate", displayName: "Effective bill rate", format: "$#,0", semanticType: "Price" },
};

export function rankComparison(filters?: ReportQueryFilters) {
    return { connection: "legalModel", query: applyReportFilters(baseQuery, filters), columnMetadata: rankComparisonColumnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
