import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import baseQuery from "./attorney-names.dax?raw";
import spec from "./attorney-names.json";

export const attorneyNamesColumnMetadata: ColumnMetadataMap = {
    "[AttorneyName]": {
        name: "AttorneyName",
        displayName: "Attorney name",
        semanticType: "Name",
    },
};

export function attorneyNames() {
    return {
        connection: "legalModel",
        query: baseQuery,
        columnMetadata: attorneyNamesColumnMetadata,
        vegaLiteSpec: spec as VisualizationSpec,
    };
}
