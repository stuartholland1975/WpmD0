/** @format */

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { formatNumberNoDecimals } from '../../../functions/formattingFunctions';

const ApplicationValuesGrid = ({ rowData }) => {
	const gridRef = React.useRef();
	const columnDefs = React.useMemo(
		() => [
			{
				field: 'application',
				sort: 'desc',
			},
			{
				field: 'north',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueFormatter: (params) => formatNumberNoDecimals(params.value),
			},
			{
				field: 'central',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueFormatter: (params) => formatNumberNoDecimals(params.value),
			},
			{
				field: 'south',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueFormatter: (params) => formatNumberNoDecimals(params.value),
			},
			{
				field: 'admin',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueFormatter: (params) => formatNumberNoDecimals(params.value),
			},
			{
				field: 'misc',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueFormatter: (params) => formatNumberNoDecimals(params.value),
			},
			{
				field: 'test',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueFormatter: (params) => formatNumberNoDecimals(params.value),
			},
			{
				field: 'total',
				headerName: 'Total',
				valueGetter: (params) => {
					const { north, south, central, admin, test, misc } = params.data;
					return [north, south, central, admin, test, misc].reduce(
						(tot, val) => tot + val,
					);
				},
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueFormatter: (params) => formatNumberNoDecimals(params.value),
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
				application: 'TOTALS',
				north: rowData
					.map((item) => Number(item.north))
					.reduce((tot, val) => tot + val),
				central: rowData
					.map((item) => Number(item.central))
					.reduce((tot, val) => tot + val),
				south: rowData
					.map((item) => Number(item.south))
					.reduce((tot, val) => tot + val),
				admin: rowData
					.map((item) => Number(item.admin))
					.reduce((tot, val) => tot + val),
				misc: rowData
					.map((item) => Number(item.misc))
					.reduce((tot, val) => tot + val),
				test: rowData
					.map((item) => Number(item.test))
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
					return { fontWeight: 'bold' };
				}
			}}
		/>
	);
};

export default ApplicationValuesGrid;
