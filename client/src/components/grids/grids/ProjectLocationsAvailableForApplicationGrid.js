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
				setRowData(data.wpmGraphqlGetLocationsAvailableForApplication.nodes.map(item => ({
					...item,
					itemsAvailable: data.wpmGraphqlGetItemsAvailableForApplication.nodes.filter(obj => obj.sitelocationId === item.id).length,
					valueAvailable: item.valueComplete - item.valueApplied
				}))),
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
			itemData.wpmGraphqlGetItemsAvailableForApplication.nodes.filter((f) =>
				selectedRow.some((item) => item.id === f.sitelocationId),
			),
		);
	}, []);

	const createPinnedRowData = () => {
		return [
			{
				worksheetReference: 'TOTALS',
				valueAvailable: rowData
					.map((item) => Number(item.valueAvailable))
					.reduce((tot, val) => tot + val),
			},
		];
	};

	const onGridReady = (params) => {
		params.api.setPinnedBottomRowData(createPinnedRowData());
	}

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
