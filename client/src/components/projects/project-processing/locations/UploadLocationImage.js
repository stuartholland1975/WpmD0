/** @format */

import React from 'react';
import {Box, Button, Dialog, DialogTitle, Divider, IconButton,} from '@mui/material';
import {useReactiveVar} from '@apollo/client';
import {gridSelectionsVar} from '../../../../cache';
import {useModal} from 'react-modal-hook';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadLocationImageForm from '../../../forms/images/UploadLocationImageForm';

const UploadLocationImage = () => {
	const selectedLocation = useReactiveVar(gridSelectionsVar).selectedLocation;
	const selectedProject = useReactiveVar(gridSelectionsVar).selectedOrder;
	const multipleSelections = selectedLocation.length > 1;

	const [showModal, hideModal] = useModal(
		() => (
			<Dialog
				onClose={() => {
					hideModal();
				}}
				fullScreen={true}
				maxWidth={'xl'}
				open={true}>
				<DialogTitle>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='space-between'>
						<Box
							flexGrow={1}
							sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
							UPLOAD IMAGES FOR PROJECT : {selectedProject.projectTitle}
						</Box>
						<Box
							flexGrow={1}
							sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
							WORKSHEET REFERENCE : {selectedLocation[0]?.worksheetReference}
						</Box>
						<Box
							flexGrow={1}
							sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
							LOCATION REFERENCE : {selectedLocation[0]?.reference}
						</Box>
						<Box>
							<IconButton onClick={hideModal}>
								<CloseIcon/>
							</IconButton>
						</Box>
					</Box>
				</DialogTitle>
				<Divider/>
				<UploadLocationImageForm hideModal={hideModal}/>
			</Dialog>
		),
		[selectedLocation, selectedProject],
	);

	return (
		<div>
			<Button
				startIcon={<PhotoCamera/>}
				onClick={showModal}
				disabled={selectedLocation === false || multipleSelections}>
				upload image
			</Button>
		</div>
	);
};

export default UploadLocationImage;
