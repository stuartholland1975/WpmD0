/** @format */

import {useReactiveVar} from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {Box, Button, Dialog, DialogContent, DialogTitle, IconButton,} from '@mui/material';
import {useModal} from 'react-modal-hook';
import {gridSelectionsVar} from '../../../cache';
import EditProjectHeaderForm from '../../forms/projects/EditProjectHeaderForm';

const EditProjectHeader = () => {
	const selectedProject = useReactiveVar(gridSelectionsVar).selectedOrder;
	const [showModal, hideModal] = useModal(() => {
		return (
			<Dialog open onClose={hideModal} maxWidth='lg'>
				<DialogTitle id='id'>
					<Box display='flex' alignItems='center'>
						<Box flexGrow={1}>EDIT PROJECT HEADER</Box>
						<Box>
							<IconButton onClick={hideModal}>
								<CloseIcon/>
							</IconButton>
						</Box>
					</Box>
				</DialogTitle>
				<DialogContent>
					<EditProjectHeaderForm
						hideModal={hideModal}
						selectedProject={selectedProject}
					/>
				</DialogContent>
			</Dialog>
		);
	}, [selectedProject]);

	return (
		<Button
			color={'update'}
			onClick={showModal}
			disabled={selectedProject === false}
			startIcon={<EditIcon/>}>
			{'edit project header'}
		</Button>
	);
};

export default EditProjectHeader;
