import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./matter-detail.dax?raw";
import spec from "./matter-detail.json";

export const matterDetailColumnMetadata: ColumnMetadataMap = {
    "[MatterId]": { name: "MatterId", displayName: "Matter ID", semanticType: "ID" },
    "[MatterName]": { name: "MatterName", displayName: "Matter", semanticType: "Name" },
    "[ClientName]": { name: "ClientName", displayName: "Client", semanticType: "Name" },
    "[MatterStatus]": { name: "MatterStatus", displayName: "Matter status", semanticType: "Status" },
    "[MatterType]": { name: "MatterType", displayName: "Matter type", semanticType: "Category" },
    "[PracticeArea]": { name: "PracticeArea", displayName: "Practice area", semanticType: "Category" },
    "[RiskLevel]": { name: "RiskLevel", displayName: "Risk level", semanticType: "Category" },
    "[Jurisdiction]": { name: "Jurisdiction", displayName: "Jurisdiction", semanticType: "Region" },
    "[OpenDate]": { name: "OpenDate", displayName: "Open date", format: "mmm d, yyyy", semanticType: "Date" },
    "[CloseDate]": { name: "CloseDate", displayName: "Close date", format: "mmm d, yyyy", semanticType: "Date" },
    "[BilledValue]": { name: "BilledValue", displayName: "Billed value", format: "$#,0", semanticType: "Amount" },
    "[InvoicedAmount]": { name: "InvoicedAmount", displayName: "Invoiced amount", format: "$#,0", semanticType: "Amount" },
    "[PaidAmount]": { name: "PaidAmount", displayName: "Paid amount", format: "$#,0", semanticType: "Amount" },
    "[OutstandingAmount]": { name: "OutstandingAmount", displayName: "Outstanding amount", format: "$#,0", semanticType: "Amount" },
};

export function matterDetail(filters?: ReportQueryFilters) {
    return { connection: "legalModel", query: applyReportFilters(baseQuery, filters), columnMetadata: matterDetailColumnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
