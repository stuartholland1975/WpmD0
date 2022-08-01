/** @format */

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { gridSelectionsVar } from '../../../cache';
import { usePrevious } from 'react-use';
import { formatNumberGridTwoDecimals } from '../../../functions/formattingFunctions';

const ProjectItemsAvailableForApplicationGrid = ({
	rowData,
	setWorksheetData,
	allWorksheets,
}) => {
	const prevRowData = usePrevious(rowData);
	const gridRef = React.useRef();
	const columnDefs = React.useMemo(
		() => [
			{
				field: 'worksheetReference',
				checkboxSelection: true,
				headerCheckboxSelection: true,
			},
			{
				field: 'itemNumber',
				sort: 'asc',
			},
			{
				field: 'activityCode',
			},
			{
				field: 'activityDescription',
			},
			{
				field: 'worksheetsAvailable',
				type: 'numericColumn',
			},
			{
				field: 'qtyComplete',
				valueFormatter: (params) =>
					params.value ? formatNumberGridTwoDecimals(params) : null,
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
			},
			{
				field: 'unitPayableTotal',
				valueFormatter: (params) =>
					params.value ? formatNumberGridTwoDecimals(params) : null,
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
			},
			{
				field: 'valueComplete',
				headerName: 'Value Available',
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
		setWorksheetData(
			allWorksheets.filter((f) =>
				selectedRow.some((item) => item.id === f.orderdetailId),
			),
		);
	}, []);

	React.useEffect(() => {
		if (gridRef.current.api) {
			let selectedNodes = gridRef.current.api
				.getSelectedNodes()
				.map((item) => item.data.id);
			const newRows = rowData
				.filter((md) => prevRowData.every((fd) => fd.id !== md.id))
				.map((item) => item.id);
			const allSelected = [...selectedNodes, ...newRows];
			gridRef.current.api.forEachNode((node) => {
				node.setSelected(allSelected.includes(node.data.id));
			});
			selectedNodes = gridRef.current.api.getSelectedNodes();
			if (selectedNodes.length) {
				gridRef.current.api.setPinnedBottomRowData(createPinnedRowData());
			} else {
				gridRef.current.api.setPinnedBottomRowData([]);
			}
		}
	}, [rowData]);

	const createPinnedRowData = () => {
		return [
			{
				worksheetReference: 'TOTALS',
				valueComplete: rowData
					.map((item) => Number(item.valueComplete))
					.reduce((tot, val) => tot + val),
			},
		];
	};

	return (
		<div style={{ height: '40vh' }}>
			<AgGridReact
				className='ag-theme-alpine'
				animateRows='true'
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				rowData={rowData}
				getRowId={(params) => params.data.id}
				//	domLayout='autoHeight'
				suppressRowClickSelection={true}
				rowSelection={'multiple'}
				onSelectionChanged={onSelectionChanged}
				ref={gridRef}
				overlayNoRowsTemplate={
					'<span style="padding: 10px; border: 2px solid #444; font-size: 20px; font-weight: bold; background: #fff">No Location Selected</span>'
				}
				pinnedBottomRowData={[]}
				getRowStyle={(params) => {
					if (params.node.rowPinned) {
						return { fontWeight: 'bold' };
					}
				}}
			/>
		</div>
	);
};

export default ProjectItemsAvailableForApplicationGrid;
