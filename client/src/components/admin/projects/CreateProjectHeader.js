/** @format */

import {useReactiveVar} from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {Box, Button, Dialog, DialogContent, DialogTitle, IconButton,} from '@mui/material';
import {useModal} from 'react-modal-hook';
import {gridSelectionsVar} from '../../../cache';
import CreateProjectHeaderForm from '../../forms/projects/CreateProjectHeaderForm';

const CreateProjectHeader = () => {
	const [showModal, hideModal] = useModal(() => (
		<Dialog onClose={hideModal} maxWidth='xl' fullWidth={true} open={true}>
			<DialogTitle id='id'>
				<Box display='flex' alignItems='center'>
					<Box flexGrow={1}>CREATE PROJECT HEADER</Box>
					<Box>
						<IconButton onClick={hideModal}>
							<CloseIcon/>
						</IconButton>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<CreateProjectHeaderForm hideModal={hideModal}/>
			</DialogContent>
		</Dialog>
	));

	const selectedProject =
		useReactiveVar(gridSelectionsVar).selectedOrder === false;

	return (
		<Button
			color={'create'}
			onClick={showModal}
			disabled={!selectedProject}
			startIcon={<AddIcon/>}>
			{'create project header'}
		</Button>
	);
};

export default CreateProjectHeader;
