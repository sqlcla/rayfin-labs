import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./outstanding-by-status.dax?raw";
import spec from "./outstanding-by-status.json";

export const outstandingByStatusColumnMetadata: ColumnMetadataMap = {
    "[InvoiceStatus]": { name: "InvoiceStatus", displayName: "Invoice status", semanticType: "Status" },
    "[OutstandingAmount]": { name: "OutstandingAmount", displayName: "Outstanding amount", format: "$#,0", semanticType: "Amount" },
    "[InvoicedAmount]": { name: "InvoicedAmount", displayName: "Invoiced amount", format: "$#,0", semanticType: "Amount" },
    "[InvoiceCount]": { name: "InvoiceCount", displayName: "Invoices", format: "#,0", semanticType: "Count" },
};

export function outstandingByStatus(filters?: ReportQueryFilters) {
    return { connection: "legalModel", query: applyReportFilters(baseQuery, filters), columnMetadata: outstandingByStatusColumnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
