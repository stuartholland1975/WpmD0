/** @format */

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useQuery } from '@apollo/client';
import { GET_PROJECT_APPLICATION_DETAILS } from '../../../api-calls/queries/applications';
import { formatNumberGridNoDecimals } from '../../../functions/formattingFunctions';
import { useParams } from 'react-router-dom';

const ProjectApplicationsGrid = () => {
	const { id } = useParams();
	const [rowData, setRowData] = React.useState(null);
	const { loading } = useQuery(GET_PROJECT_APPLICATION_DETAILS, {
		variables: { orderId: Number(id) },
		onCompleted: (data) =>
			setRowData(data.applicationSummaryOrderheaderWithCumulativeValues.nodes),
	});

	const columnDefs = React.useMemo(
		() => [
			{
				field: 'applicationNumber',
				sort: 'desc',
			},
			{
				field: 'applicationReference',
			},
			{
				field: 'prevCumulativeApplicationValue',
				valueFormatter: formatNumberGridNoDecimals,
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
			},
			{
				field: 'thisApplicationValue',
				valueFormatter: formatNumberGridNoDecimals,
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
				cellStyle: { fontWeight: 'bold' },
			},
			{
				field: 'cumulativeApplicationValue',
				valueFormatter: formatNumberGridNoDecimals,
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
			},
			{
				field: 'locationCount',
				valueFormatter: formatNumberGridNoDecimals,
				type: 'numericColumn',
				filter: 'agNumberColumnFilter',
			},
			{
				field: 'itemCount',
				valueFormatter: formatNumberGridNoDecimals,
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
	const rowClassRules = React.useMemo(() => {
		return {
			'application-current': (params) => {
				return params.data.applicationCurrent;
			},
		};
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
			paginationPageSize={5}
			suppressRowClickSelection={true}
			rowClassRules={rowClassRules}
		/>
	);
};

export default ProjectApplicationsGrid;
