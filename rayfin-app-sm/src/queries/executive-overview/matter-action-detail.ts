import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./matter-action-detail.dax?raw";
import spec from "./matter-action-detail.json";

export const matterActionDetailColumnMetadata: ColumnMetadataMap = {
    "[MatterId]": { name: "MatterId", displayName: "Matter ID", semanticType: "ID" },
    "[MatterName]": { name: "MatterName", displayName: "Matter", semanticType: "Name" },
    "[ClientName]": { name: "ClientName", displayName: "Client", semanticType: "Name" },
    "[MatterStatus]": { name: "MatterStatus", displayName: "Matter status", semanticType: "Status" },
    "[RiskLevel]": { name: "RiskLevel", displayName: "Risk level", semanticType: "Category" },
    "[OpenDate]": { name: "OpenDate", displayName: "Open date", format: "mmm d, yyyy", semanticType: "Date" },
    "[BilledValue]": { name: "BilledValue", displayName: "Billed value", format: "$#,0", semanticType: "Amount" },
    "[OutstandingAmount]": { name: "OutstandingAmount", displayName: "Outstanding amount", format: "$#,0", semanticType: "Amount" },
    "[RecommendedAction]": { name: "RecommendedAction", displayName: "Recommended action", semanticType: "Category" },
};

export function matterActionDetail(filters?: ReportQueryFilters) {
    return {
        connection: "legalModel",
        query: applyReportFilters(baseQuery, filters),
        columnMetadata: matterActionDetailColumnMetadata,
        vegaLiteSpec: spec as VisualizationSpec,
    };
}
