/** @format */

import React from 'react';
import ProjectApplicationsGrid from '../../../grids/grids/ProjectApplicationsGrid';
import ProjectLocationsAvailableForApplicationGrid from '../../../grids/grids/ProjectLocationsAvailableForApplicationGrid';
import { Grid } from '@mui/material';

const ProjectApplications = () => {
	return (
		<Grid container spacing={3} columns={2}>
			<Grid item xs={2}>
				<div className='grid-title'>Project Applications List</div>
				<ProjectApplicationsGrid />
			</Grid>

			<Grid item xs={1}>
				<div className='grid-title'>
					Project Locations Available For Application
				</div>
				<ProjectLocationsAvailableForApplicationGrid />
			</Grid>
		</Grid>
	);
};

export default ProjectApplications;
