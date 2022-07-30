/** @format */

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { gridSelectionsVar } from '../../../cache';
import { usePrevious } from 'react-use';
import { formatNumberGridTwoDecimals } from '../../../functions/formattingFunctions';

const ProjectItemsAvailableForApplicationGrid = ({ rowData }) => {
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
			},
			{
				field: 'activityCode',
			},
			{
				field: 'activityDescription',
			},
			{
				field: 'qtyComplete',
				valueFormatter: formatNumberGridTwoDecimals,
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
			},
			{
				field: 'unitPayableTotal',
				valueFormatter: formatNumberGridTwoDecimals,
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
			},
			{
				field: 'valueComplete',
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

	console.log(rowData, prevRowData);

	const onSelectionChanged = React.useCallback(() => {
		const selectedRow = gridRef.current.api.getSelectedRows();
		selectedRow.length === 0
			? gridSelectionsVar({ ...gridSelectionsVar(), selectedItem: false })
			: gridSelectionsVar({
					...gridSelectionsVar(),
					selectedItem: selectedRow,
			  });
	}, []);

	React.useEffect(() => {
		if (gridRef.current.api) {
			let selectedNodes = gridRef.current.api
				.getSelectedNodes()
				.map((item) => item.data.id);
			console.log(selectedNodes);
			const newRows = rowData
				.filter((md) => prevRowData.every((fd) => fd.id !== md.id))
				.map((item) => item.id);
			const allSelected = [...selectedNodes, ...newRows];
			gridRef.current.api.forEachNode((node) => {
				node.setSelected(allSelected.includes(node.data.id));
			});
			selectedNodes = gridRef.current.api.getSelectedNodes();
		}
	}, [rowData]);

	return (
		<AgGridReact
			className='ag-theme-alpine'
			animateRows='true'
			columnDefs={columnDefs}
			defaultColDef={defaultColDef}
			rowData={rowData}
			getRowId={(params) => params.data.id}
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
