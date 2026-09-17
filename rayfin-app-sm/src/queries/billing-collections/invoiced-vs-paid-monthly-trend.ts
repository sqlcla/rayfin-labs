import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyReportFilters, type ReportQueryFilters } from "../query-filters";
import baseQuery from "./invoiced-vs-paid-monthly-trend.dax?raw";
import spec from "./invoiced-vs-paid-monthly-trend.json";

export const invoicedVsPaidMonthlyTrendColumnMetadata: ColumnMetadataMap = {
    "[MonthStart]": { name: "MonthStart", displayName: "Month", format: "mmm yyyy", semanticType: "YearMonth" },
    "[InvoicedAmount]": { name: "InvoicedAmount", displayName: "Invoiced amount", format: "$#,0", semanticType: "Amount" },
    "[PaidAmount]": { name: "PaidAmount", displayName: "Paid amount", format: "$#,0", semanticType: "Amount" },
};

export function invoicedVsPaidMonthlyTrend(filters?: ReportQueryFilters) {
    return { connection: "legalModel", query: applyReportFilters(baseQuery, filters), columnMetadata: invoicedVsPaidMonthlyTrendColumnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
