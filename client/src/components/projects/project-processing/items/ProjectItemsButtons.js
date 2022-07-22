/** @format */

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import {Button, Grid} from '@mui/material';

const ProjectItemsButtons = () => {
	return (
		<Grid container columnSpacing={2} mb={2} mt={2} columns={4}>
			<Grid item xs={true}>
				<Button color='create' startIcon={<AddIcon/>}>
					create item
				</Button>
			</Grid>{' '}
			<Grid item xs={true}>
				<Button startIcon={<EditIcon/>} color='update'>
					edit item
				</Button>
			</Grid>{' '}
			<Grid item xs={true}>
				<Button startIcon={<DeleteIcon/>} color='delete'>
					delete item
				</Button>
			</Grid>{' '}
			<Grid item xs={true}>
				<Button startIcon={<UploadIcon/>}>item button</Button>
			</Grid>
		</Grid>
	);
};

export default ProjectItemsButtons;
