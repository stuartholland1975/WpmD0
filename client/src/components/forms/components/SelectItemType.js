/** @format */

import React from 'react';
import {useQuery} from '@apollo/client';
import {Autocomplete, TextField} from '@mui/material';
import {GET_ITEM_TYPES} from '../../../api-calls/queries/misc';
import {Controller} from 'react-hook-form';

const SelectItemType = ({control, index}) => {
	const [open, setOpen] = React.useState(false);
	const [itemTypes, setItemTypes] = React.useState();
	const {loading} = useQuery(GET_ITEM_TYPES, {
		onCompleted: (data) => setItemTypes(data.itemTypes.nodes),
	});

	return (
		<Controller
			control={control}
			name={`item.${index}.itemTypeId`}
			render={({field: {ref, onChange, ...field}}) => (
				<Autocomplete
					openOnFocus
					autoSelect
					autoHighlight
					size='small'
					options={itemTypes}
					loading={loading}
					disableClearable
					fullWidth
					getOptionLabel={(option) => option.typeShort}
					onChange={(_, data) => onChange(data.id)}
					open={open}
					onOpen={() => {
						setOpen(true);
					}}
					onClose={() => {
						setOpen(false);
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							{...field}
							variant='filled'
							label='Item Type'
						/>
					)}
				/>
			)}
		/>
	);
};

export default SelectItemType;
