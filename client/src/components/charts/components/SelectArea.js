/** @format */

import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ALL_AREAS } from '../../../api-calls/queries/misc';
import { dashboardSelectionsVar } from '../../../cache';

const SelectArea = () => {
	const [areas, setAreas] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const { loading } = useQuery(GET_ALL_AREAS, {
		onCompleted: (data) =>
			setAreas([...data.areas.nodes, { id: 999, description: 'All' }]),
	});

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (data) => {
		dashboardSelectionsVar({ ...dashboardSelectionsVar(), selectedArea: data });
	};

	console.log(dashboardSelectionsVar());

	return (
		<Autocomplete
			options={areas}
			getOptionLabel={(option) => option.description}
			onOpen={handleOpen}
			onClose={handleClose}
			open={open}
			onChange={(_, data) => handleChange(data.id)}
			openOnFocus={true}
			loading={loading}
			renderInput={(props) => (
				<TextField label='Area' variant='filled' {...props} />
			)}
		/>
	);
};

export default SelectArea;
