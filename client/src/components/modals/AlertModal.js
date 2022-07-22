/** @format */

import CloseIcon from '@mui/icons-material/Close';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,} from '@mui/material';
import {useModal} from 'react-modal-hook';

const AlertModal = ({title, message}) => {
	const [showModal, hideModal] = useModal(
		() => (
			<Dialog open onClose={hideModal} maxWidth='lg'>
				<DialogTitle id='id'>
					<Box display='flex' alignItems='center'>
						<Box flexGrow={1}>{title}</Box>
						<Box>
							<IconButton onClick={hideModal}>
								<CloseIcon/>
							</IconButton>
						</Box>
					</Box>
				</DialogTitle>
				<DialogContent>{message}</DialogContent>
				<DialogActions>
					<Button color='secondary' onClick={hideModal} autoFocus>
						close
					</Button>
				</DialogActions>
			</Dialog>
		),
		[title, message],
	);
	return showModal();
};

export default AlertModal;
