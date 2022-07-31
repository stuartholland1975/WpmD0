/** @format */

import React from 'react';
import ProjectApplicationsGrid from '../../../grids/grids/ProjectApplicationsGrid';
import ProjectLocationsAvailableForApplicationGrid from '../../../grids/grids/ProjectLocationsAvailableForApplicationGrid';
import { Box, Button, Grid } from '@mui/material';
import ProjectItemsAvailableForApplicationGrid from '../../../grids/grids/ProjectItemsAvailableForApplicationGrid';

const ProjectApplications = () => {
	const [itemData, setItemData] = React.useState([]);
	return (
		<Grid container columnSpacing={3} rowSpacing={3} columns={2}>
			<Grid item xs={1}>
				<div className='grid-title'>Project Applications List</div>
				<ProjectApplicationsGrid />
			</Grid>
			<Grid item xs={1}>
				<div className='grid-title'>
					Project Locations Available For Application
				</div>
				<ProjectLocationsAvailableForApplicationGrid
					setItemData={setItemData}
				/>
				{/* <div className='grid-title'>Add Items To Application</div> */}
			</Grid>
			{/* <Grid item xs={1}>
				<Box display={'flex'} flexDirection={'row'} justifyContent='flex-end'>
					<Button fullWidth={false}>jnjnjin</Button>
				</Box>
			</Grid> */}
			<Grid item xs={1}>
				<div className='grid-title'>
					Location Items Available For Application
				</div>
				<ProjectItemsAvailableForApplicationGrid rowData={itemData} />
			</Grid>
		</Grid>
	);
};

export default ProjectApplications;
