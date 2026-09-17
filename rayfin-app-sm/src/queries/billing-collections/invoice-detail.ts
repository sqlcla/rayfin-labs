import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./invoice-detail.dax?raw";
import spec from "./invoice-detail.json";

export const invoiceDetailColumnMetadata: ColumnMetadataMap = {
    "[InvoiceId]": { name: "InvoiceId", displayName: "Invoice ID", semanticType: "ID" },
    "[InvoiceDate]": { name: "InvoiceDate", displayName: "Invoice date", format: "mmm d, yyyy", semanticType: "Date" },
    "[InvoiceStatus]": { name: "InvoiceStatus", displayName: "Invoice status", semanticType: "Status" },
    "[MatterId]": { name: "MatterId", displayName: "Matter ID", semanticType: "ID" },
    "[MatterName]": { name: "MatterName", displayName: "Matter", semanticType: "Name" },
    "[ClientName]": { name: "ClientName", displayName: "Client", semanticType: "Name" },
    "[FeesAmount]": { name: "FeesAmount", displayName: "Fees amount", format: "$#,0", semanticType: "Amount" },
    "[ExpenseAmount]": { name: "ExpenseAmount", displayName: "Expense amount", format: "$#,0", semanticType: "Amount" },
    "[TaxAmount]": { name: "TaxAmount", displayName: "Tax amount", format: "$#,0", semanticType: "Amount" },
    "[InvoicedAmount]": { name: "InvoicedAmount", displayName: "Invoiced amount", format: "$#,0", semanticType: "Amount" },
    "[PaidAmount]": { name: "PaidAmount", displayName: "Paid amount", format: "$#,0", semanticType: "Amount" },
    "[OutstandingAmount]": { name: "OutstandingAmount", displayName: "Outstanding amount", format: "$#,0", semanticType: "Amount" },
};

export function invoiceDetail(filters?: ReportQueryFilters) {
    return { connection: "legalModel", query: applyReportFilters(baseQuery, filters), columnMetadata: invoiceDetailColumnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
