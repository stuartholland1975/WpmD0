import React from 'react';
import {AgGridReact} from "ag-grid-react";
import {gridSelectionsVar} from "../../../cache";

const ProjectItemsAvailableForApplicationGrid = ({rowData}) => {
    const gridRef = React.useRef()
    const columnDefs = React.useMemo(() => [
        {
            field: 'worksheetReference'
        },
        {
            field: 'itemNumber'
        },
        {
            field: 'activityCode'
        },
        {
            field: 'activityDescription'
        },
        {
            field: 'qtyComplete'
        },
        {
            field: 'unitPayableTotal'
        },
        {
            field: 'valueComplete'
        }
    ], [])

    const defaultColDef = React.useMemo(
        () => ({
            filter: true,
            sortable: true,
            resizable: true,
            flex: 1,
        }),
        [],
    );

    const onSelectionChanged = React.useCallback(() => {
        const selectedRow = gridRef.current.api.getSelectedRows();
        selectedRow.length === 0
            ? gridSelectionsVar({...gridSelectionsVar(), selectedItem: false})
            : gridSelectionsVar({
                ...gridSelectionsVar(),
                selectedItem: selectedRow,
            });
    }, []);

    return (
        <AgGridReact
            className='ag-theme-alpine'
            animateRows='true'
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowData={rowData}
            domLayout='autoHeight'
            pagination={true}
            paginationPageSize={20}
            suppressRowClickSelection={true}
            rowSelection={'multiple'}
            onSelectionChanged={onSelectionChanged}
            ref={gridRef}
            overlayNoRowsTemplate={
                '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow">Please Select An Available Location</span>'
            }
        />
    );
};

export default ProjectItemsAvailableForApplicationGrid;