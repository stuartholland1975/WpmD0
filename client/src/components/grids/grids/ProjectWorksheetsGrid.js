/** @format */

import {useQuery} from '@apollo/client';
import {CircularProgress} from '@mui/material';
import {AgGridReact} from 'ag-grid-react';
import React from 'react';
import {GET_PROJECT_WORKSHEETS} from '../../../api-calls/queries/misc';
import {formatNumberGridTwoDecimals} from '../../../functions/formattingFunctions';
import {useParams} from 'react-router-dom';

const ProjectWorksheetsGrid = () => {
	const {id} = useParams();
	const gridRef = React.useRef();
	const [rowData, setRowData] = React.useState();
	const {loading} = useQuery(GET_PROJECT_WORKSHEETS, {
		variables: {id: Number(id)},
		onCompleted: (data) => setRowData(data.worksheetWithValues.nodes),
	});

	const columnDefs = React.useMemo(
		() => [
			{
				headerName: 'Worksheet Ref',
				field: 'worksheetReference',
			},
			{
				headerName: 'Batch Ref',
				field: 'batchId',
			},
			{
				headerName: 'Location',
				field: 'locationReference',

				flex: 2,
			},
			{
				headerName: 'Item Number',
				field: 'itemNumber',

				sort: 'asc',
			},
			{
				headerName: 'Activity Code',
				field: 'activityCode',
			},
			{
				headerName: 'Activity Description',
				field: 'activityDescription',
				flex: 2,
			},
			{
				headerName: 'Work Done Date',
				field: 'dateComplete',
				valueFormatter: (params) =>
					new Date(params.value).toLocaleDateString('en-GB'),
			},
			{
				headerName: 'Year',
				field: 'year',
			},
			{
				headerName: 'Week Number',
				field: 'week',
			},
			{
				headerName: 'Supervisor Name',
				field: 'supervisorName',
			},
			{
				headerName: 'Qty Complete',
				field: 'qtyComplete',
				type: 'numericColumn',
				valueFormatter: formatNumberGridTwoDecimals,
			},
			{
				headerName: 'Value Complete',
				field: 'valueComplete',
				type: 'numericColumn',
				valueFormatter: formatNumberGridTwoDecimals,
			},
			{
				headerName: 'Applied',
				field: 'applied',
				type: 'rightAligned',
				valueFormatter: function (params) {
					return params.value ? 'Yes' : 'No';
				},
			},
			{
				headerName: 'App Number',
				field: 'applicationNumber',
				type: 'numericColumn',
			},
			{
				headerName: 'Reporting Period',
				field: 'periodNumber',
				type: 'numericColumn',
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
	if (loading) return <CircularProgress/>;
	return (
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
		/>
	);
};

export default ProjectWorksheetsGrid;
