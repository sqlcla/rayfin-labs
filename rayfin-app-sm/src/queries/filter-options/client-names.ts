import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import baseQuery from "./client-names.dax?raw";
import spec from "./client-names.json";

export const clientNamesColumnMetadata: ColumnMetadataMap = {
    "[ClientName]": {
        name: "ClientName",
        displayName: "Client name",
        semanticType: "Name",
    },
};

export function clientNames() {
    return {
        connection: "legalModel",
        query: baseQuery,
        columnMetadata: clientNamesColumnMetadata,
        vegaLiteSpec: spec as VisualizationSpec,
    };
}
