/** @format */

import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import {useQuery} from '@apollo/client';
import {GET_PROJECT_DOCUMENTS} from '../../../api-calls/queries/misc';
import {formatDate} from '../../../functions/formattingFunctions';
import HyperLink from '../components/Hyperlink';
import {useParams} from 'react-router-dom';

const ProjectDocumentsGrid = () => {
	const {id} = useParams();
	const [rowData, setRowData] = React.useState();

	const {loading} = useQuery(GET_PROJECT_DOCUMENTS, {
		variables: {orderId: Number(id)},
		onCompleted: (data) =>
			setRowData(data.orderheaderDocuments.nodes.map((item) => item.document)),
	});

	const columnDefs = React.useMemo(
		() => [
			{
				field: 'title',
			},
			{
				field: 'createdAt',
				filter: 'agDateColumnFilter',
				valueFormatter: (params) => formatDate(params.value),
			},

			{
				colId: 'hyperLink',
				headerName: 'Open Document',
				cellRenderer: HyperLink,
				cellStyle: {fontWeight: 'bold'},
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
		/>
	);
};

export default ProjectDocumentsGrid;
