/** @format */

import {useReactiveVar} from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {Box, Button, Dialog, DialogTitle, IconButton} from '@mui/material';
import {useModal} from 'react-modal-hook';
import {gridSelectionsVar} from '../../../../cache';
import CreateProjectLocationForm from '../../../forms/locations/CreateProjectLocationForm';

const CreateProjectLocation = () => {
	const selectedLocation = useReactiveVar(gridSelectionsVar).selectedLocation;
	const [showModal, hideModal] = useModal(() => (
		<Dialog onClose={hideModal} maxWidth='xl' fullWidth open={true}>
			<DialogTitle id='id'>
				<Box display='flex' alignItems='center'>
					<Box flexGrow={1}>CREATE PROJECT LOCATION</Box>
					<Box>
						<IconButton onClick={hideModal}>
							<CloseIcon/>
						</IconButton>
					</Box>
				</Box>
			</DialogTitle>

			<CreateProjectLocationForm hideModal={hideModal}/>
		</Dialog>
	));

	return (
		<Button
			color='create'
			onClick={showModal}
			disabled={selectedLocation !== false}
			startIcon={<AddIcon/>}>
			create project location
		</Button>
	);
};

export default CreateProjectLocation;
