/** @format */

import {useLazyQuery, useMutation} from '@apollo/client';
import {Autocomplete, Button, Grid, TextField} from '@mui/material';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {EDIT_PROJECT_HEADER} from '../../../api-calls/mutations/project-mutations';
import {GET_ALL_AREAS, GET_ALL_ORDERHEADER_STATUSES, GET_ALL_WORKTYPES,} from '../../../api-calls/queries/misc';
import {GET_ALL_PROJECT_SUMMARIES} from '../../../api-calls/queries/projects';
import {useYupValidationResolver} from "../components/validation";

const EditProjectHeaderForm = (props) => {
	const [areaOptions, setAreaOptions] = React.useState([
		{
			id: props.selectedProject[0].areaId,
			description: props.selectedProject[0].area,
		},
	]);
	const [areasOpen, setAreasOpen] = React.useState(false);
	const [worktypeOptions, setWorktypeOptions] = React.useState([
		{
			id: props.selectedProject[0]?.worktypeId,
			description: props.selectedProject[0]?.workType,
		},
	]);
	const [worktypesOpen, setWorktypesOpen] = React.useState(false);
	const [orderStatusOpen, setOrderStatusOpen] = React.useState(false);
	const [orderStatusOptions, setOrderStatusOptions] = React.useState([
		{
			id: props.selectedProject[0]?.orderStatusId,
			statusDescription: props.selectedProject[0]?.statusDescription,
		},
	]);

	const projectHeaderSchema = yup.object().shape({
		projectTitle: yup.string().required('Project Must Have a Title'),
		areaId: yup.number().required('Area is Required'),
		worktypeId: yup.number().required('Work Type is Required'),
		orderStatusId: yup.number().required('Status is Required'),
	});

	const [getAreaOptions, {loading: areasLoading}] = useLazyQuery(
		GET_ALL_AREAS,
		{
			onCompleted: (data) => setAreaOptions(data.areas.nodes),
			fetchPolicy: 'cache-and-network',
		},
	);

	const [getWorktypeOptions, {loading: worktypesLoading}] = useLazyQuery(
		GET_ALL_WORKTYPES,
		{
			onCompleted: (data) => setWorktypeOptions(data.worktypes.nodes),
			fetchPolicy: 'cache-and-network',
		},
	);

	const [getOrderheaderStatuses, {loading: orderStatusLoading}] =
		useLazyQuery(GET_ALL_ORDERHEADER_STATUSES, {
			onCompleted: (data) =>
				setOrderStatusOptions(data.orderheaderStatuses.nodes),
			fetchPolicy: 'cache-and-network',
		});

	const [editProjectHeader] = useMutation(EDIT_PROJECT_HEADER, {
		refetchQueries: [
			{
				query: GET_ALL_PROJECT_SUMMARIES,
			},
		],
		awaitRefetchQueries: true,
		onCompleted: () => props.hideModal(),
	});

	const resolver = useYupValidationResolver(projectHeaderSchema);

	const {
		handleSubmit,
		control,
		register,
		reset,
		formState: {errors},
	} = useForm({
		mode: 'onSubmit',
		resolver: resolver,
		defaultValues: {
			orderNumber: props.selectedProject[0].orderNumber,
			projectTitle: props.selectedProject[0].projectTitle,
			notes: props.selectedProject[0].notes,
			startDate: props.selectedProject[0].startDate,
			endDate: props.selectedProject[0].endDate,
			issuedDate: props.selectedProject[0].issuedDate,
			areaId: props.selectedProject[0].areaId,
			worktypeId: props.selectedProject[0].worktypeId,
			orderStatusId: props.selectedProject[0].orderStatusId,
		},
	});

	const onSubmit = (data) => {
		console.log(data);
		editProjectHeader({
			variables: {patch: data, id: props.selectedProject[0].id},
		});
	};

	React.useEffect(() => {
		if (areasOpen && areaOptions.length === 1) {
			getAreaOptions().then((data) => console.log(data));
		}
	}, [areasOpen, areaOptions.length, getAreaOptions]);

	React.useEffect(() => {
		if (worktypesOpen && worktypeOptions.length === 1) {
			getWorktypeOptions();
		}
	}, [getWorktypeOptions, worktypeOptions.length, worktypesOpen]);

	React.useEffect(() => {
		if (orderStatusOpen && orderStatusOptions.length === 1) {
			getOrderheaderStatuses();
		}
	}, [getOrderheaderStatuses, orderStatusOpen, orderStatusOptions.length]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						{...register('orderNumber')}
						label={'Project Number'}
						variant='filled'
						fullWidth
						disabled
					/>
					<p style={{color: 'red', fontWeight: 'bold'}}>
						{errors.orderNumber?.message}
					</p>
				</Grid>
				<Grid item xs={6}>
					<TextField
						{...register('projectTitle')}
						label={'Project Title'}
						variant='filled'
						fullWidth
					/>
					<p style={{color: 'red', fontWeight: 'bold'}}>
						{errors.projectTitle?.message}
					</p>
				</Grid>
				<Grid item xs={4}>
					<Controller
						control={control}
						name='areaId'
						render={({field: {ref, onChange, ...field}}) => (
							<Autocomplete
								options={areaOptions}
								loading={areasLoading}
								fullWidth
								getOptionLabel={(option) => option.description}
								onChange={(_, data) => onChange(data.id)}
								isOptionEqualToValue={(option, value) =>
									option.description === value.description
								}
								open={areasOpen}
								onOpen={() => {
									setAreasOpen(true);
								}}
								onClose={() => {
									setAreasOpen(false);
								}}
								defaultValue={{
									id: props.selectedProject[0]?.areaId,
									description: props.selectedProject[0]?.area,
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										{...field}
										fullWidth
										inputRef={ref}
										variant='filled'
										label='Area'
									/>
								)}
							/>
						)}
					/>
					<p style={{color: 'red', fontWeight: 'bold'}}>
						{errors.areaId?.message}
					</p>
				</Grid>
				<Grid item xs={4}>
					<Controller
						control={control}
						name='worktypeId'
						render={({field: {ref, onChange, ...field}}) => (
							<Autocomplete
								options={worktypeOptions}
								loading={worktypesLoading}
								openOnFocus
								fullWidth
								getOptionLabel={(option) => option.description}
								onChange={(_, data) => onChange(data.id)}
								open={worktypesOpen}
								onOpen={() => {
									setWorktypesOpen(true);
								}}
								onClose={() => {
									setWorktypesOpen(false);
								}}
								defaultValue={{
									id: props.selectedProject[0]?.worktypeId,
									description: props.selectedProject[0]?.workType,
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										{...field}
										fullWidth
										inputRef={ref}
										variant='filled'
										label='Work Type'
									/>
								)}
							/>
						)}
					/>
					<p style={{color: 'red', fontWeight: 'bold'}}>
						{errors.worktypeId?.message}
					</p>
				</Grid>
				<Grid item xs={4}>
					<Controller
						control={control}
						name='orderStatusId'
						render={({field: {ref, onChange, ...field}}) => (
							<Autocomplete
								options={orderStatusOptions}
								openOnFocus
								loading={orderStatusLoading}
								fullWidth
								getOptionLabel={(option) => option.statusDescription}
								onChange={(_, data) => onChange(data.id)}
								open={orderStatusOpen}
								onOpen={() => {
									setOrderStatusOpen(true);
								}}
								onClose={() => {
									setOrderStatusOpen(false);
								}}
								defaultValue={{
									id: props.selectedProject[0]?.orderStatusId,
									statusDescription:
									props.selectedProject[0]?.statusDescription,
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										{...field}
										fullWidth
										inputRef={ref}
										variant='filled'
										label='Order Status'
									/>
								)}
							/>
						)}
					/>
					<p style={{color: 'red', fontWeight: 'bold'}}>
						{errors.orderStatusId?.message}
					</p>
				</Grid>
				<Grid item xs={4}>
					<TextField
						type={'date'}
						{...register('startDate')}
						label={'Start Date'}
						variant='filled'
						fullWidth
						InputLabelProps={{shrink: true}}
					/>
					<p style={{color: 'red', fontWeight: 'bold'}}>
						{errors.startDate?.message}
					</p>
				</Grid>
				<Grid item xs={4}>
					<TextField
						type={'date'}
						{...register('endDate')}
						label={'End Date'}
						variant='filled'
						fullWidth
						InputLabelProps={{shrink: true}}
					/>
					<p style={{color: 'red', fontWeight: 'bold'}}>
						{errors.endDate?.message}
					</p>
				</Grid>
				<Grid item xs={4}>
					<TextField
						type={'date'}
						{...register('issuedDate')}
						label={'Issued Date'}
						variant='filled'
						fullWidth
						InputLabelProps={{shrink: true}}
					/>
					<p style={{color: 'red', fontWeight: 'bold'}}>
						{errors.issuedDate?.message}
					</p>
				</Grid>
				<Grid item xs={12}>
					<TextField
						{...register('notes')}
						label='Notes'
						multiline
						variant='filled'
						fullWidth
						maxRows={5}
						minRows={5}
					/>
				</Grid>
				<Grid item xs={6} mt={2} mb={2}>
					<Button color='cancel' onClick={() => reset()}>
						reset
					</Button>
				</Grid>

				<Grid item xs={6} mt={2} mb={2}>
					<Button color='submit' type='submit'>
						submit
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default EditProjectHeaderForm;
