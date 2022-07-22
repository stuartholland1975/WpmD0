/** @format */

import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_IMAGE_TYPES} from '../../../api-calls/queries/misc';
import {Controller} from 'react-hook-form';
import {Autocomplete, TextField} from '@mui/material';

const SelectImageType = ({control, index}) => {
	const [open, setOpen] = React.useState(false);
	const {data, loading} = useQuery(GET_IMAGE_TYPES);
	const fieldName = `image.${index}.imageTypeId`;
	if (loading) return null;
	return (
		<Controller
			control={control}
			name={fieldName}
			render={({field: {ref, onChange, ...field}}) => (
				<Autocomplete
					renderInput={(params) => (
						<TextField
							{...params}
							{...field}
							variant='filled'
							label='Image Type'
						/>
					)}
					isOptionEqualToValue={(option, value) => option.id === value.id}
					options={data.imageTypes.nodes}
					openOnFocus
					autoSelect
					autoHighlight
					size='small'
					loading={loading}
					disableClearable
					fullWidth
					getOptionLabel={(option) => ` ${option.longName}`}
					onChange={(_, data) => onChange(data)}
					open={open}
					onOpen={() => {
						setOpen(true);
					}}
					onClose={() => {
						setOpen(false);
					}}
				/>
			)}
		/>
	);
};

export default SelectImageType;
