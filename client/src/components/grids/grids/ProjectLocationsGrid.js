/** @format */

import {useQuery} from '@apollo/client';
import {CircularProgress} from '@mui/material';
import {AgGridReact} from 'ag-grid-react';
import React from 'react';
import {GET_PROJECT_LOCATIONS} from '../../../api-calls/queries/locations';
import {gridSelectionsVar} from '../../../cache';
import {formatNumberGridTwoDecimals} from '../../../functions/formattingFunctions';
import GridQtyFilter from '../components/GridQtyFilter';
import {useParams} from 'react-router-dom';

const ProjectLocationsGrid = () => {
	const {id} = useParams();
	const [value, setValue] = React.useState('All');
	const gridRef = React.useRef();
	const [rowData, setRowData] = React.useState();
	const {loading} = useQuery(GET_PROJECT_LOCATIONS, {
		variables: {id: Number(id)},
		fetchPolicy: 'cache-and-network',
		onCompleted: (data) => setRowData(data.sitelocationWithValues.nodes),
	});
	const columnDefs = React.useMemo(
		() => [
			{field: 'id', hide: true, sort: 'asc'},
			{
				headerName: 'Worksheet Ref',
				field: 'worksheetReference',
				cellStyle: {textAlign: 'left'},
				// checkboxSelection: (params) => !params.data.complete,
				checkboxSelection: true,
			},
			{
				headerName: 'Location',
				field: 'reference',
				cellStyle: {textAlign: 'left'},
				flex: 2,
			},
			{
				headerName: 'Item Count',
				field: 'itemCount',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
			},
			{
				headerName: 'Items Complete',
				field: 'itemsComplete',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
			},
			{
				headerName: 'Items O/S',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueGetter: function (params) {
					return params.data.itemCount - params.data.itemsComplete;
				},
			},
			{
				headerName: 'Image Count',
				field: 'imageCount',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
			},

			{
				headerName: 'Order Value',
				field: 'orderValue',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueGetter: (params) => Number(params.data.orderValue),
				valueFormatter: formatNumberGridTwoDecimals,
			},
			{
				headerName: 'Done Value',
				field: 'valueComplete',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueGetter: (params) => Number(params.data.valueComplete),
				valueFormatter: formatNumberGridTwoDecimals,
			},
			{
				headerName: 'To Do Value',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueGetter: function (params) {
					return params.data['orderValue'] - params.data['valueComplete'];
				},
				valueFormatter: formatNumberGridTwoDecimals,
			},
			{
				headerName: 'Applied Value',
				field: 'valueApplied',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueGetter: (params) => Number(params.data.valueApplied),
				valueFormatter: formatNumberGridTwoDecimals,
			},
			{
				headerName: 'To Apply Value',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueGetter: function (params) {
					return params.data['valueComplete'] - params.data['valueApplied'];
				},
				valueFormatter: formatNumberGridTwoDecimals,
			},
			{
				headerName: 'Ave Item Value',
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				valueGetter: function (params) {
					return params.data['orderValue'] / params.data['itemCount'];
				},
				valueFormatter: formatNumberGridTwoDecimals,
			},
			{
				headerName: 'Complete',
				field: 'complete',
				type: 'rightAligned',
				valueFormatter: function (params) {
					return params.value ? 'Yes' : 'No';
				},
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
		selectedRow.length === 0
			? gridSelectionsVar({...gridSelectionsVar(), selectedLocation: false})
			: gridSelectionsVar({
				...gridSelectionsVar(),
				selectedLocation: selectedRow,
			});
	}, []);
	/*const isRowSelectable = React.useCallback((rowNode) => {
		return rowNode.data ? !rowNode.data.complete : false;
	}, []);*/

	React.useEffect(() => {
		if (typeof gridRef.current !== 'undefined' && gridRef.current.api) {
			gridRef.current.api.onFilterChanged();
		}
	}, [value]);

	const isExternalFilterPresent = React.useCallback(() => {
		return value !== 'All';
	}, [value]);

	const doesExternalFilterPass = React.useCallback(
		(node) => {
			switch (value) {
				case 'Complete Only':
					return node.data.complete === true;
				case 'Outstanding Only':
					return node.data.complete === false;
				default:
					return 'All';
			}
		},
		[value],
	);

	if (loading) return <CircularProgress/>;
	return (
		<>
			<AgGridReact
				className='ag-theme-alpine'
				animateRows='true'
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				rowData={rowData}
				rowSelection='multiple'
				ref={gridRef}
				domLayout='autoHeight'
				enableCellChangeFlash={true}
				pagination={true}
				paginationPageSize={20}
				onSelectionChanged={onSelectionChanged}
				// isRowSelectable={isRowSelectable}
				suppressCellFocus={true}
				isExternalFilterPresent={isExternalFilterPresent}
				doesExternalFilterPass={doesExternalFilterPass}
				suppressRowClickSelection={true}
			/>
			<GridQtyFilter value={value} setValue={setValue}/>
		</>
	);
};
export default ProjectLocationsGrid;
