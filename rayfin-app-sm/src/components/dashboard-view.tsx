import {
    BriefcaseBusiness,
    CircleDollarSign,
    Clock3,
    FileWarning,
    Gauge,
    ReceiptText,
    Scale,
    UsersRound,
} from "lucide-react";

import type { ViewId } from "@/App";
import { KpiBand } from "@/components/kpi-band";
import { QueryChart, QueryGrid } from "@/components/query-panels";
import type { ReportQueryFilters } from "@/queries";
import {
    clientValueRanking,
    collectionKpis,
    invoiceDetail,
    invoicedVsPaidMonthlyTrend,
    kpiRow,
    matterActionDetail,
    matterDetail,
    matterStatusPracticeMix,
    monthlyAttorneyTrend,
    monthlyBilledValueTrend,
    outstandingByStatus,
    performanceDetail,
    rankComparison,
    riskMatrix,
    selectedProfilePerformance,
    topAttorneyRanking,
} from "@/queries";

interface DashboardViewProps {
    view: ViewId;
    filters: ReportQueryFilters;
}

function ExecutiveView({ filters }: Pick<DashboardViewProps, "filters">) {
    return (
        <div className="space-y-500">
            <KpiBand
                config={kpiRow(filters)}
                definitions={[
                    { column: "[BilledValue]", label: "Billed value", format: "currency", hint: "Value generated in filter context", icon: <CircleDollarSign className="icon-size-300" />, accent: true },
                    { column: "[TotalHours]", label: "Total hours", format: "number", hint: "Recorded attorney effort", icon: <Clock3 className="icon-size-300" /> },
                    { column: "[ActiveMatters]", label: "Active matters", format: "number", hint: "Open matters requiring attention", icon: <BriefcaseBusiness className="icon-size-300" /> },
                    { column: "[OutstandingAmount]", label: "Outstanding", format: "currency", hint: "Receivables not yet collected", icon: <ReceiptText className="icon-size-300" /> },
                ]}
            />
            <div className="grid auto-rows-[360px] gap-500 xl:grid-cols-12">
                <QueryChart className="xl:col-span-7" config={monthlyBilledValueTrend(filters)} title="Billed value by month" subtitle="Work-date trend" />
                <QueryChart className="xl:col-span-5" config={topAttorneyRanking(filters)} title="Attorneys driving billed value" subtitle="Highest value first" />
            </div>
            <QueryGrid className="h-[390px]" config={matterActionDetail(filters)} title="Matters requiring attention" subtitle="Open and higher-risk legal work" />
        </div>
    );
}

function AttorneyView({ filters }: Pick<DashboardViewProps, "filters">) {
    return (
        <div className="grid auto-rows-[360px] gap-500 xl:grid-cols-12">
            <QueryChart className="xl:col-span-7 xl:row-span-2" config={rankComparison(filters)} title="Attorney value and utilization ranking" subtitle="Relative performance across the team" />
            <QueryChart className="xl:col-span-5" config={selectedProfilePerformance(filters)} title="Selected attorney profile" subtitle="Role, office, practice, and performance" />
            <QueryChart className="xl:col-span-5" config={monthlyAttorneyTrend(filters)} title="Attorney performance by month" subtitle="Hours and billed value" />
            <QueryGrid className="h-[420px] xl:col-span-12" config={performanceDetail(filters)} title="Attorney performance detail" subtitle="Sortable exact values" />
        </div>
    );
}

function PortfolioView({ filters }: Pick<DashboardViewProps, "filters">) {
    return (
        <div className="grid auto-rows-[360px] gap-500 xl:grid-cols-12">
            <QueryChart className="xl:col-span-7" config={clientValueRanking(filters)} title="Client value concentration" subtitle="Billed value and hours by client" />
            <QueryChart className="xl:col-span-5" config={matterStatusPracticeMix(filters)} title="Matter mix by practice and status" subtitle="Portfolio composition" />
            <QueryChart className="xl:col-span-5" config={riskMatrix(filters)} title="Client and matter risk matrix" subtitle="Combined exposure profile" />
            <QueryGrid className="xl:col-span-7" config={matterDetail(filters)} title="Matter portfolio detail" subtitle="Clients, jurisdictions, status, and value" />
        </div>
    );
}

function BillingView({ filters }: Pick<DashboardViewProps, "filters">) {
    return (
        <div className="space-y-500">
            <KpiBand
                config={collectionKpis(filters)}
                definitions={[
                    { column: "[InvoicedAmount]", label: "Invoiced", format: "currency", hint: "Total amount issued", icon: <ReceiptText className="icon-size-300" /> },
                    { column: "[PaidAmount]", label: "Paid", format: "currency", hint: "Cash collected", icon: <CircleDollarSign className="icon-size-300" /> },
                    { column: "[OutstandingAmount]", label: "Outstanding", format: "currency", hint: "Balance still receivable", icon: <FileWarning className="icon-size-300" />, accent: true },
                    { column: "[CollectionRate]", label: "Collection rate", format: "percent", hint: "Paid as a share of invoiced", icon: <Gauge className="icon-size-300" /> },
                ]}
            />
            <div className="grid auto-rows-[360px] gap-500 xl:grid-cols-12">
                <QueryChart className="xl:col-span-5" config={outstandingByStatus(filters)} title="Outstanding value by invoice status" subtitle="Largest balances first" />
                <QueryChart className="xl:col-span-7" config={invoicedVsPaidMonthlyTrend(filters)} title="Invoiced versus paid by month" subtitle="Collection performance over time" />
            </div>
            <QueryGrid className="h-[390px]" config={invoiceDetail(filters)} title="Invoice action queue" subtitle="Largest outstanding balances requiring follow-up" />
        </div>
    );
}

export function DashboardView({ view, filters }: DashboardViewProps) {
    const viewContent = {
        executive: <ExecutiveView filters={filters} />,
        attorneys: <AttorneyView filters={filters} />,
        portfolio: <PortfolioView filters={filters} />,
        billing: <BillingView filters={filters} />,
    };

    return (
        <>
            <section className="mb-500 flex items-start gap-300 border-y border-border py-300 text-200 text-muted-foreground">
                <Scale className="mt-100 icon-size-200 shrink-0 text-accent-foreground" aria-hidden="true" />
                <p>
                    Live legal intelligence. Amounts use compact whole-dollar notation; use the detail grids for exact record-level values.
                </p>
                <UsersRound className="ml-auto hidden icon-size-200 shrink-0 sm:block" aria-hidden="true" />
            </section>
            {viewContent[view]}
        </>
    );
}
