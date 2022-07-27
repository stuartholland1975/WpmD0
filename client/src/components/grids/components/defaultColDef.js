import React from "react";

export function DefaultColDef() {
    return React.useMemo(
        () => ({
            filter: true,
            sortable: true,
            resizable: true,
            flex: 1,
        }),
        [],
    );
}