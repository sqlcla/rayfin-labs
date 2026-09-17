import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./collection-kpis.dax?raw";
import spec from "./collection-kpis.json";

export const collectionKpisColumnMetadata: ColumnMetadataMap = {
    "[InvoicedAmount]": { name: "InvoicedAmount", displayName: "Invoiced amount", format: "$#,0", semanticType: "Amount" },
    "[PaidAmount]": { name: "PaidAmount", displayName: "Paid amount", format: "$#,0", semanticType: "Amount" },
    "[OutstandingAmount]": { name: "OutstandingAmount", displayName: "Outstanding amount", format: "$#,0", semanticType: "Amount" },
    "[CollectionRate]": { name: "CollectionRate", displayName: "Collection rate", format: "0%", semanticType: "Percentage" },
    "[InvoiceCount]": { name: "InvoiceCount", displayName: "Invoices", format: "#,0", semanticType: "Count" },
};

export function collectionKpis(filters?: ReportQueryFilters) {
    return { connection: "legalModel", query: applyReportFilters(baseQuery, filters), columnMetadata: collectionKpisColumnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
