/** @format */

import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import { formatNumberGridTwoDecimals } from '../../../functions/formattingFunctions';
import { gridSelectionsVar } from '../../../cache';

const ProjectLocationsAvailableForApplicationGrid = ({
	setItemData,
	rowData,
	allItems,
}) => {
	const gridRef = React.useRef();

	const columnDefs = React.useMemo(
		() => [
			{
				field: 'worksheetReference',
				checkboxSelection: true,
				headerCheckboxSelection: true,
			},
			{
				field: 'reference',
			},
			{
				field: 'itemsAvailable',
				type: 'numericColumn',
			},
			{
				field: 'valueAvailable',
				valueFormatter: formatNumberGridTwoDecimals,
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

	const onSelectionChanged = React.useCallback(() => {
		const selectedRow = gridRef.current.api.getSelectedRows();
		setItemData(
			allItems.filter((f) =>
				selectedRow.some((item) => item.id === f.sitelocationId),
			),
		);
	}, []);

	const createPinnedRowData = () => {
		return [
			{
				worksheetReference: 'TOTALS',
				itemsAvailable: rowData
					.map((item) => Number(item.itemsAvailable))
					.reduce((tot, val) => tot + val),
				valueAvailable: rowData
					.map((item) => Number(item.valueAvailable))
					.reduce((tot, val) => tot + val),
			},
		];
	};

	const onGridReady = (params) => {
		params.api.setPinnedBottomRowData(createPinnedRowData());
	};

	return (
		<AgGridReact
			className='ag-theme-alpine'
			animateRows='true'
			columnDefs={columnDefs}
			defaultColDef={defaultColDef}
			rowData={rowData}
			domLayout='autoHeight'
			suppressRowClickSelection={true}
			rowSelection={'multiple'}
			onSelectionChanged={onSelectionChanged}
			ref={gridRef}
			onGridReady={onGridReady}
			pinnedBottomRowData={[]}
			getRowStyle={(params) => {
				if (params.node.rowPinned) {
					return { fontWeight: 'bold' };
				}
			}}
		/>
	);
};

export default ProjectLocationsAvailableForApplicationGrid;
