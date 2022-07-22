/** @format */

import {useReactiveVar} from '@apollo/client';
import ConstructionIcon from '@mui/icons-material/Construction';
import EditIcon from '@mui/icons-material/Edit';
import {Button, Grid} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {gridSelectionsVar} from '../../../../cache';
import CreateProjectLocation from './CreateProjectLocation';
import DeleteProjectLocation from './DeleteProjectLocation';
import AddItemsToLocation from './AddItemsToLocation';
import UploadLocationImage from './UploadLocationImage';

const ProjectLocationsButtons = () => {
	const selectedLocation = useReactiveVar(gridSelectionsVar).selectedLocation;
	const multipleSelections = selectedLocation.length > 1;
	const navigate = useNavigate();

	return (
		<Grid container columnSpacing={2} mb={2} mt={2} columns={6}>
			<Grid item xs={true}>
				<CreateProjectLocation/>
			</Grid>
			<Grid item xs={true}>
				<AddItemsToLocation/>
			</Grid>
			<Grid item xs={true}>
				<Button
					disabled={selectedLocation === false || multipleSelections}
					startIcon={<EditIcon/>}
					color='update'>
					edit location
				</Button>
			</Grid>

			<Grid item xs={true}>
				<DeleteProjectLocation/>
			</Grid>
			<Grid item xs={true}>
				<UploadLocationImage/>
			</Grid>
			<Grid item xs={true}>
				<Button
					onClick={() => navigate('/projects/processing/locations/progress')}
					color='action'
					startIcon={<ConstructionIcon/>}
					disabled={
						selectedLocation === false ||
						multipleSelections ||
						parseFloat(selectedLocation[0]?.itemCount) === 0
					}>
					update site progress
				</Button>
			</Grid>
		</Grid>
	);
};

export default ProjectLocationsButtons;
