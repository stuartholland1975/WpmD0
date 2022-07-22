/** @format */

import React from 'react';
import {useQuery} from '@apollo/client';
import {Autocomplete, Grid, TextField} from '@mui/material';
import {GET_RATESET_HEADERS} from '../../../api-calls/queries/misc';
import {Controller} from 'react-hook-form';

const SelectRateset = ({
						   control,
						   index,
						   getActivities,
						   activitiesLoading,
						   activityCodes,
					   }) => {
	const [ratesetOpen, setRatesetOpen] = React.useState(false);
	const [rateset, setRateset] = React.useState([
		{
			description: 'Contract Tendered Rates',
			id: 1,
			__typename: 'RatesetHeader',
		},
	]);
	const [activityCodeOpen, setActivityCodeOpen] = React.useState(false);

	const {loading: ratesetLoading} = useQuery(GET_RATESET_HEADERS, {
		onCompleted: (data) => setRateset(data.ratesetHeaders.nodes),
	});

	const handleRatesetChange = (data) => {
		console.log(data, rateset);
		getActivities({
			variables: {id: data.id},
		});
	};

	return (
		<>
			<Grid item xs={2}>
				<Autocomplete
					autoHighlight
					openOnFocus
					size='small'
					options={rateset}
					loading={ratesetLoading}
					disableClearable
					fullWidth
					getOptionLabel={(option) => option.description}
					onChange={(_, data) => {
						handleRatesetChange(data);
					}}
					open={ratesetOpen}
					//openOnFocus
					onOpen={() => {
						setRatesetOpen(true);
					}}
					onClose={() => {
						setRatesetOpen(false);
					}}
					defaultValue={{
						description: 'Contract Tendered Rates',
						id: 1,
						__typename: 'RatesetHeader',
					}}
					isOptionEqualToValue={(option, value) => option.id === value.id}
					renderInput={(params) => (
						<TextField {...params} variant='filled' label='Rateset'/>
					)}
				/>
			</Grid>
			<Grid item xs={4}>
				<Controller
					control={control}
					name={`item.${index}.ratesetPriceId`}
					render={({field: {ref, onChange, ...field}}) => (
						<Autocomplete
							openOnFocus
							size='small'
							disabled={activityCodes.length === 0}
							options={activityCodes}
							loading={activitiesLoading}
							disableClearable
							fullWidth
							getOptionLabel={(option) =>
								option.activitycode.activityCode +
								':  ' +
								option.activitycode.activityDescription
							}
							onChange={(_, data) => onChange(data.id)}
							open={activityCodeOpen}
							onOpen={() => {
								setActivityCodeOpen(true);
							}}
							onClose={() => {
								setActivityCodeOpen(false);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									{...field}
									variant='filled'
									label='Activity Code'
								/>
							)}
						/>
					)}
				/>
			</Grid>
		</>
	);
};

export default SelectRateset;
