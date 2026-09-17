import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./matter-status-practice-mix.dax?raw";
import spec from "./matter-status-practice-mix.json";

export const matterStatusPracticeMixColumnMetadata: ColumnMetadataMap = {
    "[MatterStatus]": { name: "MatterStatus", displayName: "Matter status", semanticType: "Status" },
    "[PracticeArea]": { name: "PracticeArea", displayName: "Practice area", semanticType: "Category" },
    "[MatterCount]": { name: "MatterCount", displayName: "Matters", format: "#,0", semanticType: "Count" },
    "[BilledValue]": { name: "BilledValue", displayName: "Billed value", format: "$#,0", semanticType: "Amount" },
};

export function matterStatusPracticeMix(filters?: ReportQueryFilters) {
    return { connection: "legalModel", query: applyReportFilters(baseQuery, filters), columnMetadata: matterStatusPracticeMixColumnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
