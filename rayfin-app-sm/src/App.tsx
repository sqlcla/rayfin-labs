import { useMemo, useState } from "react";
import {
    BarChart3,
    BriefcaseBusiness,
    CircleDollarSign,
    Moon,
    RefreshCcw,
    Scale,
    Sun,
    UserRound,
} from "lucide-react";

import { DashboardView } from "@/components/dashboard-view";
import { FilterSelect } from "@/components/filter-select";
import { useThemeContext } from "@/hooks/theme.context";
import {
    attorneyNames,
    clientNames,
    type ReportQueryFilters,
} from "@/queries";

const views = [
    {
        id: "executive",
        label: "Executive Overview",
        eyebrow: "Firm briefing",
        icon: BarChart3,
    },
    {
        id: "attorneys",
        label: "Attorney Performance",
        eyebrow: "People & productivity",
        icon: UserRound,
    },
    {
        id: "portfolio",
        label: "Client & Matter Portfolio",
        eyebrow: "Exposure & workload",
        icon: BriefcaseBusiness,
    },
    {
        id: "billing",
        label: "Billing & Collections",
        eyebrow: "Cash realization",
        icon: CircleDollarSign,
    },
] as const;

export type ViewId = (typeof views)[number]["id"];

function App() {
    const [activeView, setActiveView] = useState<ViewId>("executive");
    const [attorneyName, setAttorneyName] = useState("");
    const [clientName, setClientName] = useState("");
    const { isDark, toggleTheme } = useThemeContext();
    const filters = useMemo<ReportQueryFilters>(
        () => ({
            attorneyName: attorneyName || undefined,
            clientName: clientName || undefined,
        }),
        [attorneyName, clientName],
    );

    const clearFilters = () => {
        setAttorneyName("");
        setClientName("");
    };

    return (
        <div className="min-h-full bg-background text-foreground">
            <div className="mx-auto flex min-h-screen w-full max-w-[1920px]">
                <aside className="hidden w-[280px] shrink-0 border-r border-border bg-primary text-primary-foreground lg:flex lg:flex-col">
                    <div className="border-b border-primary-foreground/20 p-600">
                        <div className="mb-600 flex items-center gap-300">
                            <span className="grid icon-size-600 place-items-center rounded-lg bg-accent text-accent-foreground">
                                <Scale className="icon-size-400" aria-hidden="true" />
                            </span>
                            <div>
                                <p className="font-heading text-500 font-semibold leading-500">
                                    Attorney Report
                                </p>
                                <p className="text-200 text-primary-foreground/70">
                                    Executive legal analytics
                                </p>
                            </div>
                        </div>
                        <div className="h-px bg-primary-foreground/20" />
                    </div>

                    <nav className="flex-1 space-y-200 p-400" aria-label="Report views">
                        {views.map((view) => {
                            const Icon = view.icon;
                            const selected = view.id === activeView;
                            return (
                                <button
                                    key={view.id}
                                    type="button"
                                    aria-current={selected ? "page" : undefined}
                                    onClick={() => setActiveView(view.id)}
                                    className={`flex w-full items-center gap-300 rounded-lg border px-400 py-300 text-left transition-colors ${
                                        selected
                                            ? "border-primary-foreground/30 bg-primary-foreground/10"
                                            : "border-transparent text-primary-foreground/75 hover:bg-primary-foreground/5 hover:text-primary-foreground"
                                    }`}
                                >
                                    <Icon className="icon-size-300 shrink-0" aria-hidden="true" />
                                    <span>
                                        <span className="block text-300 font-semibold">
                                            {view.label}
                                        </span>
                                        <span className="block text-200 opacity-70">
                                            {view.eyebrow}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="border-t border-primary-foreground/20 p-500 text-200 text-primary-foreground/65">
                        <p className="mb-100 font-semibold text-primary-foreground">
                            Attorney Report Analytic App
                        </p>
                        <p>Live data from the legal semantic model</p>
                    </div>
                </aside>

                <main className="min-w-0 flex-1">
                    <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-400 py-300 backdrop-blur md:px-600">
                        <div className="mx-auto flex max-w-[1480px] flex-col gap-300 xl:flex-row xl:items-end xl:justify-between">
                            <div className="flex items-center justify-between gap-300">
                                <div>
                                    <p className="mb-100 text-200 font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                                        Attorney Report
                                    </p>
                                    <h1 className="font-heading text-hero-800 font-semibold leading-hero-800">
                                        {views.find((view) => view.id === activeView)?.label}
                                    </h1>
                                </div>
                                <button
                                    type="button"
                                    onClick={toggleTheme}
                                    className="grid icon-size-600 place-items-center rounded-lg border border-border bg-card text-card-foreground shadow-2 transition-colors hover:bg-accent xl:hidden"
                                    aria-label={isDark ? "Use light theme" : "Use dark theme"}
                                >
                                    {isDark ? <Sun className="icon-size-300" /> : <Moon className="icon-size-300" />}
                                </button>
                            </div>

                            <div className="flex flex-col gap-300 sm:flex-row sm:items-end">
                                <FilterSelect
                                    label="Attorney"
                                    value={attorneyName}
                                    onChange={setAttorneyName}
                                    queryConfig={attorneyNames()}
                                    valueColumn="[AttorneyName]"
                                />
                                <FilterSelect
                                    label="Client"
                                    value={clientName}
                                    onChange={setClientName}
                                    queryConfig={clientNames()}
                                    valueColumn="[ClientName]"
                                />
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    disabled={!attorneyName && !clientName}
                                    className="flex h-10 items-center justify-center gap-200 rounded-lg border border-border bg-card px-400 text-300 font-semibold text-card-foreground shadow-2 transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <RefreshCcw className="icon-size-200" aria-hidden="true" />
                                    Reset
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleTheme}
                                    className="hidden h-10 items-center justify-center gap-200 rounded-lg border border-border bg-card px-300 text-300 font-semibold text-card-foreground shadow-2 transition-colors hover:bg-accent xl:flex"
                                    aria-label={isDark ? "Use light theme" : "Use dark theme"}
                                >
                                    {isDark ? <Sun className="icon-size-200" /> : <Moon className="icon-size-200" />}
                                </button>
                            </div>
                        </div>

                        <div className="mx-auto mt-300 flex max-w-[1480px] gap-200 overflow-x-auto pb-100 lg:hidden">
                            {views.map((view) => (
                                <button
                                    key={view.id}
                                    type="button"
                                    onClick={() => setActiveView(view.id)}
                                    className={`shrink-0 rounded-full border px-400 py-200 text-200 font-semibold ${
                                        view.id === activeView
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border bg-card text-card-foreground"
                                    }`}
                                >
                                    {view.label}
                                </button>
                            ))}
                        </div>
                    </header>

                    <div className="mx-auto max-w-[1480px] p-400 md:p-600">
                        <DashboardView view={activeView} filters={filters} />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
