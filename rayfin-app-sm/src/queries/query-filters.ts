export interface ReportQueryFilters {
    attorneyName?: string;
    clientName?: string;
}

function daxString(value: string): string {
    return `"${value.replaceAll('"', '""')}"`;
}

function directFilter(
    value: string | undefined,
    table: string,
    column: string,
): string {
    return value?.trim()
        ? `TREATAS({${daxString(value.trim())}}, '${table}'[${column}])`
        : `ALL('${table}'[${column}])`;
}

function attorneyMatterFilter(attorneyName?: string): string {
    if (!attorneyName?.trim()) {
        return "ALL('matter'[matter_key])";
    }

    return `TREATAS(CALCULATETABLE(VALUES('matter_attorney_assignment'[matter_key]), TREATAS({${daxString(attorneyName.trim())}}, 'attorney'[attorney_name])), 'matter'[matter_key])`;
}

export function applyReportFilters(
    baseQuery: string,
    filters: ReportQueryFilters = {},
): string {
    return baseQuery
        .replaceAll(
            "ALL('attorney'[attorney_name]) /*__ATTORNEY_FILTER__*/",
            directFilter(filters.attorneyName, "attorney", "attorney_name"),
        )
        .replaceAll(
            "ALL('client'[client_name]) /*__CLIENT_FILTER__*/",
            directFilter(filters.clientName, "client", "client_name"),
        )
        .replaceAll(
            "ALL('matter'[matter_key]) /*__ATTORNEY_MATTER_FILTER__*/",
            attorneyMatterFilter(filters.attorneyName),
        );
}
