/** @format */
import {useQuery} from '@apollo/client';
import {CircularProgress} from '@mui/material';
import {AgGridReact} from 'ag-grid-react';
import React from 'react';
import {GET_PROJECT_ITEMS} from '../../../api-calls/queries/items';
import {gridSelectionsVar} from '../../../cache';
import {formatNumberGridTwoDecimals} from '../../../functions/formattingFunctions';
import GridQtyFilter from '../components/GridQtyFilter';
import {useParams} from 'react-router-dom';

const ProjectItemsGrid = () => {
	const {id} = useParams();
	const [value, setValue] = React.useState('All');
	const gridRef = React.useRef(false);
	const [rowData, setRowData] = React.useState();
	const {loading} = useQuery(GET_PROJECT_ITEMS, {
		variables: {id: Number(id)},
		fetchPolicy: 'cache-and-network',
		onCompleted: (data) => setRowData(data.orderdetailWithValues.nodes),
	});

	const columnDefs = React.useMemo(
		() => [
			{
				headerName: 'Item No',
				field: 'itemNumber',
				sort: 'desc',
				maxWidth: 120,
				cellStyle: {textAlign: 'left'},
			},
			{
				headerName: 'Item Type',
				field: 'typeShort',
				maxWidth: 120,
				cellStyle: {textAlign: 'left'},
			},
			{
				headerName: 'Worksheet',
				field: 'worksheetReference',
				cellStyle: {textAlign: 'left'},
			},
			{
				headerName: 'Activity Code',
				field: 'activityCode',
				cellStyle: {textAlign: 'left'},
			},
			{
				headerName: 'Activity Description',
				field: 'activityDescription',
				cellStyle: {textAlign: 'left'},
				flex: 2,
			},
			{
				headerName: 'Qty Ordered',
				field: 'qtyOrdered',
				type: 'numericColumn',
				valueFormatter: formatNumberGridTwoDecimals,
			},
			{
				headerName: 'Unit Value',
				field: 'unitPayableTotal',
				valueFormatter: formatNumberGridTwoDecimals,
				type: 'numericColumn',
			},
			{
				headerName: 'Order Value',
				field: 'valuePayableTotal',
				valueFormatter: formatNumberGridTwoDecimals,
				type: 'numericColumn',
			},
			{
				headerName: 'Qty Done',
				field: 'qtyComplete',
				type: 'numericColumn',
				valueFormatter: formatNumberGridTwoDecimals,
			},
			{
				headerName: 'Done Value',
				field: 'valueComplete',
				valueFormatter: formatNumberGridTwoDecimals,
				type: 'numericColumn',
			},
			{
				headerName: 'Qty Applied',
				field: 'qtyApplied',
				type: 'numericColumn',
				valueFormatter: formatNumberGridTwoDecimals,
			},
			{
				headerName: 'Applied Value',
				field: 'valueApplied',
				type: 'rightAligned',
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
			? gridSelectionsVar({...gridSelectionsVar(), selectedItem: false})
			: gridSelectionsVar({
				...gridSelectionsVar(),
				selectedItem: selectedRow,
			});
	}, []);

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
					return '';
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
				rowSelection='single'
				ref={gridRef}
				domLayout='autoHeight'
				enableCellChangeFlash={true}
				pagination={true}
				paginationPageSize={20}
				onSelectionChanged={onSelectionChanged}
				isExternalFilterPresent={isExternalFilterPresent}
				doesExternalFilterPass={doesExternalFilterPass}
			/>
			<GridQtyFilter value={value} setValue={setValue}/>
		</>
	);
};

export default ProjectItemsGrid;
