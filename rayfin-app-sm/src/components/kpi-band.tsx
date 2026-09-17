import type { ReactNode } from "react";

import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import {
    formatCompactCurrency,
    formatPercent,
    formatWholeNumber,
} from "@/lib/format";
import type { QueryConfig } from "@/components/query-panels";

interface KpiDefinition {
    column: string;
    label: string;
    format: "currency" | "number" | "percent";
    hint: string;
    icon: ReactNode;
    accent?: boolean;
}

interface KpiBandProps {
    config: QueryConfig;
    definitions: KpiDefinition[];
}

function formatValue(value: unknown, format: KpiDefinition["format"]) {
    const number = typeof value === "number" ? value : Number(value ?? 0);
    if (format === "currency") return formatCompactCurrency(number);
    if (format === "percent") return formatPercent(number);
    return formatWholeNumber(number);
}

export function KpiBand({ config, definitions }: KpiBandProps) {
    const { data, isLoading, error } = useSemanticModelQuery(config);
    const row = data?.status === "success" ? data.table.rows[0] : undefined;

    return (
        <section
            className="grid gap-300 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="Key performance indicators"
        >
            {definitions.map((definition) => {
                const columnIndex =
                    data?.status === "success"
                        ? data.table.columns.findIndex(
                              (column) => column.name === definition.column,
                          )
                        : -1;
                const value = row && columnIndex >= 0 ? row[columnIndex] : undefined;
                return (
                    <article
                        key={definition.column}
                        className={`relative overflow-hidden rounded-xl border bg-card p-500 shadow-2 ${
                            definition.accent ? "border-accent-foreground/30" : "border-border"
                        }`}
                    >
                        <div className={`absolute inset-x-0 top-0 h-1 ${definition.accent ? "bg-accent-foreground" : "bg-primary"}`} />
                        <div className="mb-400 flex items-center justify-between">
                            <p className="text-200 font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                                {definition.label}
                            </p>
                            <span className={definition.accent ? "text-accent-foreground" : "text-primary"}>
                                {definition.icon}
                            </span>
                        </div>
                        <p className="font-numeric text-hero-800 font-bold leading-hero-800 tabular-nums text-card-foreground">
                            {isLoading
                                ? "—"
                                : error || data?.status === "error"
                                  ? "!"
                                  : formatValue(value, definition.format)}
                        </p>
                        <p className="mt-200 text-200 text-muted-foreground">
                            {error ? "Data unavailable" : definition.hint}
                        </p>
                    </article>
                );
            })}
        </section>
    );
}
