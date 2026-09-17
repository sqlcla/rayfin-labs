import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./performance-detail.dax?raw";
import spec from "./performance-detail.json";

export const performanceDetailColumnMetadata: ColumnMetadataMap = {
    "[TimeEntryId]": { name: "TimeEntryId", displayName: "Time entry ID", semanticType: "ID" },
    "[WorkDate]": { name: "WorkDate", displayName: "Work date", format: "mmm d, yyyy", semanticType: "Date" },
    "[AttorneyName]": { name: "AttorneyName", displayName: "Attorney", semanticType: "Name" },
    "[ClientName]": { name: "ClientName", displayName: "Client", semanticType: "Name" },
    "[MatterName]": { name: "MatterName", displayName: "Matter", semanticType: "Name" },
    "[TaskCode]": { name: "TaskCode", displayName: "Task code", semanticType: "Category" },
    "[HoursWorked]": { name: "HoursWorked", displayName: "Hours worked", format: "#,0", semanticType: "Duration" },
    "[BillRate]": { name: "BillRate", displayName: "Bill rate", format: "$#,0", semanticType: "Price" },
    "[BilledAmount]": { name: "BilledAmount", displayName: "Billed amount", format: "$#,0", semanticType: "Amount" },
    "[Narrative]": { name: "Narrative", displayName: "Narrative" },
};

export function performanceDetail(filters?: ReportQueryFilters) {
    return { connection: "legalModel", query: applyReportFilters(baseQuery, filters), columnMetadata: performanceDetailColumnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
