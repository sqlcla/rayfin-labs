import { AlertTriangle } from "lucide-react";
import { DataGrid } from "@microsoft/fabric-datagrid";
import {
    VegaVisual,
    useCssTheme,
    type VisualizationSpec,
} from "@microsoft/fabric-visuals";
import type { InteractionEvent } from "@microsoft/fabric-visuals-core";

import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { toDataTable } from "@/lib/to-data-table";

export interface QueryConfig {
    connection: string;
    query: string;
    columnMetadata: ColumnMetadataMap;
    vegaLiteSpec: VisualizationSpec;
}

interface QueryPanelProps {
    config: QueryConfig;
    title: string;
    subtitle?: string;
    className?: string;
    onInteraction?: (events: InteractionEvent[]) => void;
}

function PanelState({
    title,
    message,
    error,
}: {
    title: string;
    message: string;
    error?: boolean;
}) {
    return (
        <section
            className={`flex h-full min-h-[180px] items-center justify-center rounded-xl border bg-card p-500 text-center shadow-2 ${
                error ? "border-destructive/40" : "border-border"
            }`}
        >
            <div>
                {error && (
                    <AlertTriangle className="mx-auto mb-300 icon-size-400 text-destructive" aria-hidden="true" />
                )}
                <p className="mb-100 text-300 font-semibold text-card-foreground">{title}</p>
                <p className={`text-200 ${error ? "text-destructive" : "text-muted-foreground"}`}>
                    {message}
                </p>
            </div>
        </section>
    );
}

export function QueryChart({
    config,
    title,
    subtitle,
    className = "",
    onInteraction = () => undefined,
}: QueryPanelProps) {
    const theme = useCssTheme();
    const { data, isLoading, error } = useSemanticModelQuery(config);

    if (isLoading) {
        return <div className={`animate-pulse rounded-xl border border-border bg-card shadow-2 ${className}`} aria-label={`Loading ${title}`} />;
    }
    if (error || data?.status === "error") {
        return (
            <div className={className}>
                <PanelState title={title} message={error?.message ?? "The query could not be completed."} error />
            </div>
        );
    }
    if (data?.status !== "success" || data.table.rows.length === 0) {
        return (
            <div className={className}>
                <PanelState title={title} message="No data matches the current filters." />
            </div>
        );
    }

    return (
        <div className={`h-full min-h-0 ${className}`}>
            <VegaVisual
                spec={config.vegaLiteSpec}
                data={toDataTable(data.table, config.columnMetadata)}
                theme={theme}
                header={{ title, subtitle }}
                onInteraction={onInteraction}
                containerClassName="h-full bg-card shadow-2"
            />
        </div>
    );
}

export function QueryGrid({
    config,
    title,
    subtitle,
    className = "",
    onInteraction = () => undefined,
}: QueryPanelProps) {
    const theme = useCssTheme();
    const { data, isLoading, error } = useSemanticModelQuery(config);

    if (isLoading) {
        return <div className={`animate-pulse rounded-xl border border-border bg-card shadow-2 ${className}`} aria-label={`Loading ${title}`} />;
    }
    if (error || data?.status === "error") {
        return (
            <div className={className}>
                <PanelState title={title} message={error?.message ?? "The query could not be completed."} error />
            </div>
        );
    }
    if (data?.status !== "success" || data.table.rows.length === 0) {
        return (
            <div className={className}>
                <PanelState title={title} message="No data matches the current filters." />
            </div>
        );
    }

    return (
        <div className={`h-full min-h-0 overflow-hidden rounded-xl ${className}`}>
            <DataGrid
                data={toDataTable(data.table, config.columnMetadata)}
                theme={theme}
                header={{ title, subtitle }}
                onInteraction={onInteraction}
                capabilities={{ virtualization: true }}
                containerClassName="h-full bg-card shadow-2"
            />
        </div>
    );
}
