/** @format */

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_PROJECT_ITEMS_AVAILABLE_FOR_APPLICATION } from '../../../api-calls/queries/applications';
import { useParams } from 'react-router-dom';
import { formatNumberGridTwoDecimals } from '../../../functions/formattingFunctions';
import { gridSelectionsVar } from '../../../cache';

const ProjectLocationsAvailableForApplicationGrid = ({ setItemData }) => {
	const { id } = useParams();
	const gridRef = React.useRef();
	const { selectedLocation } = useReactiveVar(gridSelectionsVar);
	const [rowData, setRowData] = React.useState([]);
	const { data: itemData, loading } = useQuery(
		GET_PROJECT_ITEMS_AVAILABLE_FOR_APPLICATION,
		{
			variables: { orderId: Number(id) },
			onCompleted: (data) =>
				setRowData(data.wpmGraphqlGetLocationsAvailableForApplication.nodes),
		},
	);

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
				field: 'itemsComplete',
				headerName: 'items Available',
				type: 'numericColumn',
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

		setItemData(
			itemData.wpmGraphqlGetItemsAvailableForApplication.nodes.filter((f) =>
				selectedRow.some((item) => item.id === f.sitelocationId),
			),
		);
	}, []);

	if (loading) return null;
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
		/>
	);
};

export default ProjectLocationsAvailableForApplicationGrid;
