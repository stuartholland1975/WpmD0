/** @format */
import UploadIcon from '@mui/icons-material/Upload';
import { Button, Grid } from '@mui/material';
import CreateProjectHeader from './CreateProjectHeader';
import DeleteProjectHeader from './DeleteProjectHeader';
import EditProjectHeader from './EditProjectHeader';
import React from 'react';
import ImportProjectDetails from './ImportProjectDetails';
import { useReactiveVar } from '@apollo/client';
import { gridSelectionsVar } from '../../../cache';
import { useNavigate } from 'react-router-dom';

const ProjectAdminButtons = () => {
	const navigate = useNavigate();
	const selectedProject = useReactiveVar(gridSelectionsVar).selectedOrder;
	return (
		<Grid container spacing={2} mb={2}>
			<Grid item xs={3}>
				<CreateProjectHeader />
			</Grid>
			<Grid item xs={3}>
				<EditProjectHeader />
			</Grid>
			<Grid item xs={3}>
				<DeleteProjectHeader />
			</Grid>
			<Grid item xs={3}>
				<Button
					disabled={selectedProject === false}
					startIcon={<UploadIcon />}
					onClick={() => navigate('import')}
				>
					import project detail
				</Button>
			</Grid>
		</Grid>
	);
};

export default ProjectAdminButtons;
