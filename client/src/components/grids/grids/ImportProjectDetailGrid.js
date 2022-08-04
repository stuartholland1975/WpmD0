/** @format */

import React from 'react';
import { AgGridReact } from 'ag-grid-react';

const ImportProjectDetailGrid = ({ importData }) => {
	const columnDefs = React.useMemo(() => [
		{
			field: 'reference',
		},
		{
			field: 'itemNumber',
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},
		{
			field: 'qtyOrdered',
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},
		{
			field: 'itemTypeId',
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},
		{
			field: 'ratesetId',
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},
		{
			field: 'packNumber',
		},
		{
			field: 'valueBaseMaterials',
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},
		{
			field: 'code',
		},
	]);

	const defaultColDef = React.useMemo(
		() => ({
			filter: true,
			sortable: true,
			resizable: true,
			flex: 1,
			editable: true,
		}),
		[],
	);

	if (!importData) return null;
	return (
		<AgGridReact
			className='ag-theme-alpine'
			animateRows='true'
			columnDefs={columnDefs}
			defaultColDef={defaultColDef}
			rowData={importData}
			domLayout='autoHeight'
			pagination={true}
			paginationPageSize={20}
			singleClickEdit={true}
			editType='fullRow'
		/>
	);
};

export default ImportProjectDetailGrid;
