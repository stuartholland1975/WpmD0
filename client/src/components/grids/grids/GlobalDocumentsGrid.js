/** @format */

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useQuery } from '@apollo/client';
import { GET_GLOBAL_DOCUMENTS } from '../../../api-calls/queries/misc';
import { formatDate } from '../../../functions/formattingFunctions';
import HyperLink from '../components/Hyperlink';
import { gridSelectionsVar } from '../../../cache';
import {DefaultColDef} from "../components/defaultColDef";



const GlobalDocumentsGrid = () => {
	const [rowData, setRowData] = React.useState();
	const gridRef = React.useRef();

	const { loading } = useQuery(GET_GLOBAL_DOCUMENTS, {
		fetchPolicy: 'cache-and-network',
		onCompleted: (data) => setRowData(data.documents.nodes),
	});

	const columnDefs = React.useMemo(
		() => [
			{
				field: 'title',
				checkboxSelection: (params) =>
					params.data.orderheaderDocuments.aggregates.distinctCount
						.orderheaderId === '0',
			},
			{
				field: 'createdAt',
				filter: 'agDateColumnFilter',
				valueFormatter: (params) => formatDate(params.value),
			},
			{
				field: 'orderheaderDocuments.aggregates.distinctCount.orderheaderId',
				headerName: 'Projects Included',
			},
			{
				colId: 'hyperLink',
				headerName: 'Open Document',
				cellRenderer: HyperLink,
				cellStyle: { fontWeight: 'bold' },
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
			? gridSelectionsVar({ ...gridSelectionsVar(), selectedDocument: false })
			: gridSelectionsVar({
					...gridSelectionsVar(),
					selectedDocument: selectedRow,
			  });
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
			onSelectionChanged={onSelectionChanged}
			ref={gridRef}
			rowSelection='multiple'
		/>
	);
};

export default GlobalDocumentsGrid;
