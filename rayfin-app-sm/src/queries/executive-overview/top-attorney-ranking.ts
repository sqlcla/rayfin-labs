import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./top-attorney-ranking.dax?raw";
import spec from "./top-attorney-ranking.json";

export const topAttorneyRankingColumnMetadata: ColumnMetadataMap = {
    "[AttorneyName]": { name: "AttorneyName", displayName: "Attorney", semanticType: "Name" },
    "[AttorneyRank]": { name: "AttorneyRank", displayName: "Rank", format: "#,0", semanticType: "Rank" },
    "[BilledValue]": { name: "BilledValue", displayName: "Billed value", format: "$#,0", semanticType: "Amount" },
    "[TotalHours]": { name: "TotalHours", displayName: "Total hours", format: "#,0", semanticType: "Duration" },
};

export function topAttorneyRanking(filters?: ReportQueryFilters) {
    return {
        connection: "legalModel",
        query: applyReportFilters(baseQuery, filters),
        columnMetadata: topAttorneyRankingColumnMetadata,
        vegaLiteSpec: spec as VisualizationSpec,
    };
}
