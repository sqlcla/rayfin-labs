import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./client-value-ranking.dax?raw";
import spec from "./client-value-ranking.json";

export const clientValueRankingColumnMetadata: ColumnMetadataMap = {
    "[ClientName]": { name: "ClientName", displayName: "Client", semanticType: "Name" },
    "[ClientRank]": { name: "ClientRank", displayName: "Rank", format: "#,0", semanticType: "Rank" },
    "[BilledValue]": { name: "BilledValue", displayName: "Billed value", format: "$#,0", semanticType: "Amount" },
    "[InvoicedAmount]": { name: "InvoicedAmount", displayName: "Invoiced amount", format: "$#,0", semanticType: "Amount" },
    "[OutstandingAmount]": { name: "OutstandingAmount", displayName: "Outstanding amount", format: "$#,0", semanticType: "Amount" },
    "[MatterCount]": { name: "MatterCount", displayName: "Matters", format: "#,0", semanticType: "Count" },
};

export function clientValueRanking(filters?: ReportQueryFilters) {
    return { connection: "legalModel", query: applyReportFilters(baseQuery, filters), columnMetadata: clientValueRankingColumnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
