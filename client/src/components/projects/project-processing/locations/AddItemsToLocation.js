/** @format */

import React from 'react';
import {useModal} from 'react-modal-hook';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {Box, Button, Dialog, DialogTitle, Divider, IconButton,} from '@mui/material';

import {useReactiveVar} from '@apollo/client';
import {gridSelectionsVar} from '../../../../cache';
import AddItemsToLocationForm from '../../../forms/items/AddItemsToLocationForm';

const AddItemsToLocation = () => {
	const selectedLocation = useReactiveVar(gridSelectionsVar).selectedLocation;
	const selectedProject = useReactiveVar(gridSelectionsVar).selectedOrder;
	const multipleSelections = selectedLocation.length > 1;

	const [showModal, hideModal] = useModal(
		() => (
			<Dialog
				onClose={() => {
					hideModal();
				}}
				fullScreen
				open={true}>
				<DialogTitle id='id'>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='space-between'>
						<Box
							flexGrow={1}
							sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
							CREATE ITEMS FOR PROJECT : {selectedProject.projectTitle}
						</Box>
						<Box
							flexGrow={1}
							sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
							WORKSHEET REFERENCE : {selectedLocation[0].worksheetReference}
						</Box>
						<Box
							flexGrow={1}
							sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
							LOCATION REFERENCE : {selectedLocation[0].reference}
						</Box>
						<Box>
							<IconButton onClick={hideModal}>
								<CloseIcon/>
							</IconButton>
						</Box>
					</Box>
				</DialogTitle>
				<Divider/>

				<AddItemsToLocationForm hideModal={hideModal}/>
			</Dialog>
		),
		[selectedLocation, selectedProject],
	);
	return (
		<Button
			onClick={showModal}
			color='create'
			startIcon={<AddIcon/>}
			disabled={selectedLocation === false || multipleSelections}>
			add items to location
		</Button>
	);
};

export default AddItemsToLocation;
