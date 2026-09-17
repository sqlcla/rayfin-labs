import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./selected-profile-performance.dax?raw";
import spec from "./selected-profile-performance.json";

export const selectedProfilePerformanceColumnMetadata: ColumnMetadataMap = {
    "[AttorneyId]": { name: "AttorneyId", displayName: "Attorney ID", semanticType: "ID" },
    "[AttorneyName]": { name: "AttorneyName", displayName: "Attorney", semanticType: "Name" },
    "[Title]": { name: "Title", displayName: "Title", semanticType: "Category" },
    "[AttorneyRole]": { name: "AttorneyRole", displayName: "Role", semanticType: "Category" },
    "[OfficeName]": { name: "OfficeName", displayName: "Office", semanticType: "Category" },
    "[PracticeArea]": { name: "PracticeArea", displayName: "Practice area", semanticType: "Category" },
    "[BilledValue]": { name: "BilledValue", displayName: "Billed value", format: "$#,0", semanticType: "Amount" },
    "[TotalHours]": { name: "TotalHours", displayName: "Total hours", format: "#,0", semanticType: "Duration" },
    "[UtilizationPercent]": { name: "UtilizationPercent", displayName: "Utilization", format: "0%", semanticType: "Percentage" },
    "[EffectiveBillRate]": { name: "EffectiveBillRate", displayName: "Effective bill rate", format: "$#,0", semanticType: "Price" },
    "[HoursVsTarget]": { name: "HoursVsTarget", displayName: "Hours versus target", format: "#,0", semanticType: "Duration" },
};

export function selectedProfilePerformance(filters?: ReportQueryFilters) {
    return { connection: "legalModel", query: applyReportFilters(baseQuery, filters), columnMetadata: selectedProfilePerformanceColumnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
