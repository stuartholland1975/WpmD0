/** @format */

import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import {formatNumberNoDecimals} from '../../../functions/formattingFunctions';
import {useQuery} from '@apollo/client';
import {GET_AREAS_WITH_VALUES} from '../../../api-calls/queries/misc';

const AreaValuesGrid = ({rowData}) => {
    const gridRef = React.useRef();

    const columnDefs = React.useMemo(
        () => [
            {
                field: 'description',
                headerName: 'Area',
            },
            {
                field: 'orderCount',
                headerName: 'Project Count',
            },
            {
                field: 'orderValue',
                headerName: 'Project Order Value',
                type: 'numericColumn',
                filter: 'agNumberColumnFilter',
                valueFormatter: (params) => formatNumberNoDecimals(params.value),
            },
            {
                field: 'valueComplete',
                type: 'numericColumn',
                filter: 'agNumberColumnFilter',
                valueFormatter: (params) => formatNumberNoDecimals(params.value),
            },
            {
                headerName: 'Remaining Value',
                valueGetter: (params) =>
                    params.data.orderValue - params.data.valueComplete,
                valueFormatter: (params) => formatNumberNoDecimals(params.value),
                type: 'numericColumn',
                filter: 'agNumberColumnFilter',
            },
        ],
        [],
    );

    const defaultColDef = React.useMemo(
        () => ({
            filter: true,
            sortable: true,
            resizable: true,
            flex: 1,
        }),
        [],
    );

    const createPinnedRowData = () => {
        return [
            {
                description: 'TOTALS',
                orderCount: rowData
                    .map((item) => Number(item.orderCount))
                    .reduce((tot, val) => tot + val),
                orderValue: rowData
                    .map((item) => Number(item.orderValue))
                    .reduce((tot, val) => tot + val),
                valueComplete: rowData
                    .map((item) => Number(item.valueComplete))
                    .reduce((tot, val) => tot + val),
                remainingValue: rowData
                    .map((item) => Number(item.orderValue) - Number(item.valueComplete))
                    .reduce((tot, val) => tot + val),
            },
        ];
    };

    const onGridReady = () => {
        gridRef.current.api.setPinnedBottomRowData(createPinnedRowData());
    };

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
            pinnedBottomRowData={[]}
            ref={gridRef}
            onGridReady={onGridReady}
            getRowStyle={(params) => {
                if (params.node.rowPinned) {
                    return {fontWeight: 'bold'};
                }
            }}
        />
    );
};

export default AreaValuesGrid;
