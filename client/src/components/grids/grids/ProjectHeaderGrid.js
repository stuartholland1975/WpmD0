/** @format */

import {useQuery} from '@apollo/client';
//import { CircularProgress } from '@mui/material';
import {AgGridReact} from 'ag-grid-react';
import React from 'react';
import {useLocation} from 'react-router-dom';
import {GET_ALL_PROJECT_SUMMARIES} from '../../../api-calls/queries/projects';
import {gridSelectionsVar} from '../../../cache';
import {
	divideIfNotZero,
	formatNumberGridNoDecimals,
	formatNumberGridTwoDecimals,
} from '../../../functions/formattingFunctions';
import {GridButton} from '../components/CellRenderers';

const ProjectHeaderGrid = () => {
	const gridRef = React.useRef();
	const location = useLocation();
	const [rowData, setRowData] = React.useState();

	useQuery(GET_ALL_PROJECT_SUMMARIES, {
		fetchPolicy: 'cache-and-network',
		onCompleted: (data) => setRowData(data.orderheaderWithValues.nodes),
	});
	const [columnDefs, setColumnDefs] = React.useState([
		{
			field: 'orderNumber',
			headerName: 'Project No',
			checkboxSelection: () => location.pathname === '/admin/projects',
		},
		{
			field: 'projectTitle',
			headerName: 'Project Title',
			flex: 2,
		},
		{field: 'area'},
		{
			field: 'workType',
			flex: 1.5,
		},
		{
			headerName: 'Order Val',
			valueGetter: (params) => Number(params.data.orderValueTotal),
			valueFormatter: formatNumberGridNoDecimals,
			type: 'numericColumn',
			cellStyle: {fontWeight: 'bold'},
			filter: 'agNumberColumnFilter',
		},
		{
			headerName: 'Done Val',
			valueGetter: (params) => Number(params.data.orderValueTotalComplete),
			valueFormatter: formatNumberGridNoDecimals,
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
			cellStyle: {fontWeight: 'bold'},
		},
		{
			headerName: 'To Do Val',
			valueGetter: (params) =>
				params.data.orderValueTotal - params.data.orderValueTotalComplete,
			valueFormatter: formatNumberGridNoDecimals,
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},
		{
			headerName: '% Complete',
			valueGetter: (params) =>
				divideIfNotZero(
					params.data.orderValueTotalComplete,
					params.data.orderValueTotal,
				) * 100,
			type: 'numericColumn',
			valueFormatter: formatNumberGridTwoDecimals,
		},
		{
			headerName: 'Applied Val',
			field: 'orderValueTotalApplied',
			valueFormatter: formatNumberGridNoDecimals,
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},
		{
			headerName: 'Locations',
			field: 'locationCount',
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},

		{
			headerName: 'Items',
			field: 'itemCount',
			type: 'numericColumn',
			filter: 'agNumberColumnFilter',
		},

		{
			headerName: 'Images',
			type: 'numericColumn',
			valueFormatter: formatNumberGridNoDecimals,
			field: 'imageCount',
			filter: 'agNumberColumnFilter',
		},

		{
			headerName: 'Docs',
			field: 'documentCount',
			type: 'numericColumn',
			valueFormatter: formatNumberGridNoDecimals,
			filter: 'agNumberColumnFilter',
		},

		{colId: 'selectButton', cellRenderer: GridButton, flex: 1.5},
	]);

	const defaultColDef = React.useMemo(
		() => ({
			filter: true,
			sortable: true,
			resizable: true,
			flex: 1,
		}),
		[],
	);

	React.useEffect(() => {
		if (location.pathname === '/admin/projects') {
			setColumnDefs((prevState) =>
				prevState.filter((obj) => obj.colId !== 'selectButton'),
			);
		}
	}, [location.pathname]);

	const onSelectionChanged = React.useCallback(() => {
		const selectedRow = gridRef.current.api.getSelectedRows();
		selectedRow.length === 0
			? gridSelectionsVar({...gridSelectionsVar(), selectedOrder: false})
			: gridSelectionsVar({
				...gridSelectionsVar(),
				selectedOrder: selectedRow,
			});
	}, []);

	//if (loading) return <CircularProgress />;

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
			onSelectionChanged={onSelectionChanged}
			suppressRowClickSelection={true}
		/>
	);
};

export default ProjectHeaderGrid;
