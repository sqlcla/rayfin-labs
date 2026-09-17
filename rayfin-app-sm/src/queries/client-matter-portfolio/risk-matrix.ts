import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./risk-matrix.dax?raw";
import spec from "./risk-matrix.json";

export const riskMatrixColumnMetadata: ColumnMetadataMap = {
    "[ClientRiskRating]": { name: "ClientRiskRating", displayName: "Client risk rating", semanticType: "Category" },
    "[MatterRiskLevel]": { name: "MatterRiskLevel", displayName: "Matter risk level", semanticType: "Category" },
    "[MatterCount]": { name: "MatterCount", displayName: "Matters", format: "#,0", semanticType: "Count" },
    "[BilledValue]": { name: "BilledValue", displayName: "Billed value", format: "$#,0", semanticType: "Amount" },
    "[OutstandingAmount]": { name: "OutstandingAmount", displayName: "Outstanding amount", format: "$#,0", semanticType: "Amount" },
};

export function riskMatrix(filters?: ReportQueryFilters) {
    return { connection: "legalModel", query: applyReportFilters(baseQuery, filters), columnMetadata: riskMatrixColumnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
