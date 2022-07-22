/** @format */

import {useMutation, useReactiveVar} from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material';
import {useConfirm} from 'material-ui-confirm';
import {DELETE_PROJECT_HEADER} from '../../../api-calls/mutations/project-mutations';
import {gridSelectionsVar} from '../../../cache';
import {GET_ALL_PROJECT_SUMMARIES} from "../../../api-calls/queries/projects";

const DeleteProjectHeader = () => {
	const confirm = useConfirm();
	const selectedProject = useReactiveVar(gridSelectionsVar).selectedOrder;
	const [deleteProject] = useMutation(DELETE_PROJECT_HEADER, {
		variables: {id: selectedProject[0]?.id},
		refetchQueries: [{
			query: GET_ALL_PROJECT_SUMMARIES
		}],
		awaitRefetchQueries: true
	});

	const handleDeleteProjectHeader = () => {
		confirm({
			description: `Delete Project Number ${selectedProject[0].orderNumber} ?`,
		})
			.then(() => {
				deleteProject().then((data) => console.log(data));
			})
			.catch(() => console.log('Deletion cancelled.'));
	};
	return (
		<Button
			fullWidth
			onClick={handleDeleteProjectHeader}
			color='delete'
			disabled={selectedProject === false}
			startIcon={<DeleteIcon/>}>
			delete project header
		</Button>
	);
};

export default DeleteProjectHeader;
