import type { VisualizationSpec } from "@microsoft/fabric-visuals";

import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import type { ColumnMetadataMap } from "@/lib/to-data-table";

interface QueryConfig {
    connection: string;
    query: string;
    columnMetadata: ColumnMetadataMap;
    vegaLiteSpec: VisualizationSpec;
}

interface FilterSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    queryConfig: QueryConfig;
    valueColumn: string;
}

export function FilterSelect({
    label,
    value,
    onChange,
    queryConfig,
    valueColumn,
}: FilterSelectProps) {
    const { data, isLoading, error } = useSemanticModelQuery(queryConfig);
    const options =
        data?.status === "success"
            ? data.table.rows
                  .map((row) => {
                      const index = data.table.columns.findIndex(
                          (column) => column.name === valueColumn,
                      );
                      return index >= 0 ? String(row[index] ?? "") : "";
                  })
                  .filter(Boolean)
            : [];

    return (
        <label className="flex min-w-[190px] flex-1 flex-col gap-100 xl:flex-none">
            <span className="text-200 font-semibold text-muted-foreground">{label}</span>
            <select
                value={value}
                disabled={isLoading || Boolean(error)}
                onChange={(event) => onChange(event.target.value)}
                className="h-10 rounded-lg border border-input bg-card px-300 text-[length:var(--text-300)] text-card-foreground shadow-2 transition-[color,box-shadow] hover:border-primary disabled:cursor-not-allowed disabled:opacity-60"
                aria-label={`Filter by ${label.toLowerCase()}`}
            >
                <option value="">
                    {error ? `${label} unavailable` : isLoading ? `Loading ${label.toLowerCase()}s` : `All ${label.toLowerCase()}s`}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}
