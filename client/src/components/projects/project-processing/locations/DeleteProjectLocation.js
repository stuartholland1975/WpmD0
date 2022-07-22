/** @format */

import {useMutation, useReactiveVar} from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material';
import {useConfirm} from 'material-ui-confirm';
import {useNavigate} from 'react-router-dom';
import {DELETE_MANY_LOCATIONS} from '../../../../api-calls/mutations/project-mutations';
import {GET_PROJECT_LOCATIONS} from '../../../../api-calls/queries/locations';
import {gridSelectionsVar} from '../../../../cache';

const DeleteProjectLocation = () => {
	const selectedLocation = useReactiveVar(gridSelectionsVar).selectedLocation;
	const selectedProject = useReactiveVar(gridSelectionsVar).selectedOrder;

	const confirm = useConfirm();
	const navigate = useNavigate();

	const [deleteProjectLocations] = useMutation(DELETE_MANY_LOCATIONS, {
		refetchQueries: [
			{
				query: GET_PROJECT_LOCATIONS,
				variables: {id: selectedProject.id},
			},
		],
		awaitRefetchQueries: true,
		onCompleted: () => navigate('/projects/processing/locations'),
	});

	const handleDeleteProjectLocations = () => {
		const locations = selectedLocation.map((item) => ({id: item.id}));
		confirm({
			title: 'Confirm Delete Location',
			titleProps: {color: 'red', fontWeight: 'bold'},
			description: `This Will Permanently Delete The ${
				selectedLocation.length
			} Locations(s) Selected and ${selectedLocation
				.map((item) => Number(item.itemCount))
				.reduce((total, num) => total + num)} Associated Item(s)`,
			confirmationText: 'Delete',
			cancellationButtonProps: {color: 'secondary'},
			confirmationButtonProps: {autoFocus: true, color: 'delete'},
			allowClose: false,
		})
			.then(() =>
				deleteProjectLocations({
					variables: {
						input: locations,
						id: selectedProject.id,
					},
				}).then(() =>
					gridSelectionsVar({
						...gridSelectionsVar(),
						selectedLocation: false,
					}),
				),
			)
			.catch(() => console.log('submission cancelled'));
	};

	return (
		<Button
			disabled={
				selectedLocation === false ||
				selectedLocation
					.map((item) => Number(item.valueComplete))
					.reduce((total, num) => total + num) > 0
			}
			onClick={handleDeleteProjectLocations}
			startIcon={<DeleteIcon/>}
			color='delete'>
			delete location
		</Button>
	);
};

export default DeleteProjectLocation;
