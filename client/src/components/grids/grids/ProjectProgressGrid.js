/** @format */

import {useMutation, useQuery, useReactiveVar} from '@apollo/client';
import {Button, Grid} from '@mui/material';
import {AgGridReact} from 'ag-grid-react';
import {useConfirm} from 'material-ui-confirm';
import React from 'react';
import {useAlert} from 'react-alert';
import {useNavigate, useParams} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {CREATE_BULK_WORKSHEETS} from '../../../api-calls/mutations/project-mutations';
import {GET_INCOMPLETE_LOCATION_ITEMS} from '../../../api-calls/queries/locations';
import {GET_ALL_SUPERVISORS, GET_CURRENT_PERIOD,} from '../../../api-calls/queries/misc';
import {gridSelectionsVar} from '../../../cache';
import {formatNumberGridTwoDecimals, formatNumberTwoDecimals,} from '../../../functions/formattingFunctions';
import DateEditor from '../components/DateEditor';
import QtyCompleteEditor from '../components/QtyCompleteEditor';
import SelectSupervisor from '../components/SelectSupervisor';

const KEY_UP = 'ArrowUp';
const KEY_DOWN = 'ArrowDown';
const KEY_ENTER = 'Enter';

const ProjectProgressGrid = () => {
	const {id} = useParams();
	const gridRef = React.useRef();
	const batchRef = React.useRef(uuidv4());
	const alert = useAlert();
	const navigate = useNavigate();
	const confirm = useConfirm();
	const selectedLocation = useReactiveVar(gridSelectionsVar).selectedLocation;
	const {data: supervisorData} = useQuery(GET_ALL_SUPERVISORS);
	const [rowData, setRowData] = React.useState();
	const {data: currentPeriod} = useQuery(GET_CURRENT_PERIOD);
	const columnDefs = React.useMemo(
		() => [
			{headerName: 'Item Ref', field: 'itemNumber'},
			{headerName: 'Item Type', field: 'typeShort'},
			{
				headerName: 'Activity Code',
				field: 'activityCode',
			},
			{
				headerName: 'Activity Description',
				field: 'activityDescription',
			},
			{
				headerName: 'Qty Ordered',
				field: 'qtyOrdered',
				type: 'numericColumn',
				valueFormatter: formatNumberGridTwoDecimals,
			},
			{
				headerName: 'Qty Os',
				field: 'qtyOs',
				valueFormatter: formatNumberGridTwoDecimals,
				type: 'numericColumn',
			},
			{
				headerName: 'Value Os',
				field: 'valueOs',
				valueFormatter: formatNumberGridTwoDecimals,
				type: 'numericColumn',
			},
			{
				headerName: 'Qty Done',
				field: 'qtyDone',
				type: 'numericColumn',
				editable: true,
				cellEditor: QtyCompleteEditor,
				valueFormatter: formatNumberGridTwoDecimals,
				valueParser: (params) => Number(params.newValue),
			},

			{
				headerName: 'Supervisor',
				colId: 'supervisor',
				field: 'supervisor',
				editable: true,
				suppressKeyboardEvent: (params) => {
					const key = params.event.key;
					return (params.editing && key === KEY_UP) ||
						key === KEY_DOWN ||
						key === KEY_ENTER;
				},
				cellEditor: SelectSupervisor,
				cellEditorParams: (params) => ({
					options: supervisorData.supervisors.nodes,
					lastRowSupervisor: params.api.getRowNode(params.rowIndex - 1),
				}),
			},
			{
				headerName: 'Date Complete',
				field: 'date',
				editable: true,
				cellEditor: DateEditor,
				cellEditorParams: (params) => ({
					lastRowDate: params.api.getRowNode(params.rowIndex - 1),
					currentPeriod: currentPeriod.periods.nodes[0],
				}),
				valueFormatter: (params) =>
					params.value && params.value.split('-').reverse().join('/'),
			},
			{
				headerName: 'Value Complete',
				field: 'valueComplete',
				valueGetter: (params) =>
					(params.data.qtyDone * params.data.valueOs) / params.data.qtyOs,
				valueFormatter: formatNumberGridTwoDecimals,
				type: 'numericColumn',
			},
		],
		[supervisorData, currentPeriod],
	);

	const {data} = useQuery(GET_INCOMPLETE_LOCATION_ITEMS, {
		variables: {id: selectedLocation[0].id},
		onCompleted: (data) =>
			setRowData(
				data.orderdetailWithValues.nodes.map((x) => ({...x, qtyDone: 0})),
			),
	});

	const [submitWorksheets] = useMutation(CREATE_BULK_WORKSHEETS, {
		onCompleted: () => {
			navigate(`/projects/processing/locations`);
		},
	});

	const defaultColDef = {
		flex: 1,
	};
	const onDataRendered = (params) => {
		params.api.startEditingCell({
			rowIndex: 0,
			colKey: 'qtyDone',
		});
	};

	const undoEdits = () => {
		gridRef.current.api.stopEditing();
		gridRef.current.api.setRowData(
			data.orderdetailWithValues.nodes.map((x) => ({...x, qtyDone: 0})),
		);
	};

	const prepareData = (data) => {
		return {
			dateComplete: data.date,
			qtyComplete: data.qtyDone,
			supervisorId: supervisorData.supervisors.nodes.find(
				(x) => x.displayName === data.supervisor,
			).id,
			orderdetailId: data.id,
			periodNumberId: currentPeriod.periods.nodes[0].id,
			sitelocationId: data.sitelocationId,
			orderheaderId: data.orderheaderId,
			batchId: batchRef.current,
			valueComplete: data.qtyDone * Number(data.unitPayableTotal),
		};
	};

	const dataCheck = (updatedItem) => {
		const supervisorExists = updatedItem.hasOwnProperty('supervisor');
		const dateExists = updatedItem.hasOwnProperty('date');
		return supervisorExists && dateExists;
	};

	const handleSubmitData = (data) => {
		console.log('submitting');
		const itemCount = data.length;
		const submissionValue = data
			.map((x) => Number(x.valueComplete))
			.reduce((total, amount) => total + amount);
		console.log(itemCount, submissionValue);
		confirm({
			title: 'Confirm Data Update Submission',
			titleProps: {color: 'red', fontWeight: 'bold'},
			description: `This will update ${itemCount} item(s) with a value of ${formatNumberTwoDecimals(
				submissionValue,
			)}`,
			confirmationText: 'Submit',
			cancellationButtonProps: {color: 'secondary'},
			confirmationButtonProps: {autoFocus: true},
			allowClose: false,
		})
			.then(() =>
				submitWorksheets({
					variables: {
						input: {worksheets: data},
						orderId: Number(id),
						locationId: selectedLocation[0].id,
					},
				}),
			)
			.catch(() => console.log('submission cancelled'));
	};

	const handleSaveData = async (_) => {
		const updatedItems = rowData.filter((x) => x.qtyDone > 0);
		const checkPromises = await updatedItems.map(async (item) => {
			return await dataCheck(item);
		});
		const checkedData = await Promise.all(checkPromises);
		const isDataComplete = checkedData.includes(false);
		const cleansedData = updatedItems.map((item) => {
			return prepareData(item);
		});

		console.log(isDataComplete, cleansedData);
		if (isDataComplete) {
			alert.error(`One or More Items Has Missing Data`);
		} else {
			handleSubmitData(cleansedData);
		}
	};

	return (
		<>
			<Grid container columns={2} spacing={2} mb={2}>
				<Grid item xs={true}>
					<Button onClick={undoEdits} color='cancel'>
						undo changes
					</Button>
				</Grid>
				<Grid item xs={true}>
					<Button color='action' onClick={handleSaveData}>
						save changes
					</Button>
				</Grid>
			</Grid>
			<div className='grid-title'>UPDATE PROJECT LOCATION PROGRESS</div>
			<AgGridReact
				rowData={rowData}
				defaultColDef={defaultColDef}
				columnDefs={columnDefs}
				className='ag-theme-alpine'
				animateRows='true'
				ref={gridRef}
				domLayout='autoHeight'
				singleClickEdit={true}
				enableCellChangeFlash={true}
				onFirstDataRendered={onDataRendered}
			/>
		</>
	);
};

export default ProjectProgressGrid;
