/** @format */

import React from 'react';
import ProjectApplicationsGrid from '../../../grids/grids/ProjectApplicationsGrid';
import ProjectLocationsAvailableForApplicationGrid from '../../../grids/grids/ProjectLocationsAvailableForApplicationGrid';
import { Box, Button, Grid } from '@mui/material';
import ProjectItemsAvailableForApplicationGrid from '../../../grids/grids/ProjectItemsAvailableForApplicationGrid';
import ProjectWorksheetsAvailableForApplicationGrid from '../../../grids/grids/ProjectWorksheetsAvailableForApplicationGrid';
import { useParams } from 'react-router-dom';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_PROJECT_ITEMS_AVAILABLE_FOR_APPLICATION } from '../../../../api-calls/queries/applications';

const styles = {
	container: { display: 'flex' },
	rowContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexGrow: 1,
	},
	columnContainer: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
	},
};

const ProjectApplications = () => {
	const { id } = useParams();
	const [locationData, setLocationData] = React.useState([]);
	const [itemData, setItemData] = React.useState([]);
	const [worksheetData, setWorksheetData] = React.useState([]);
	const [allItems, setAllItems] = React.useState([]);
	const [allWorksheets, setAllWorksheets] = React.useState([]);
	const { loading } = useQuery(GET_PROJECT_ITEMS_AVAILABLE_FOR_APPLICATION, {
		variables: { orderId: Number(id) },
		onCompleted: (data) => {
			setLocationData(
				data.wpmGraphqlGetLocationsAvailableForApplication.nodes.map(
					(item) => ({
						...item,
						itemsAvailable:
							data.wpmGraphqlGetItemsAvailableForApplication.nodes.filter(
								(obj) => obj.sitelocationId === item.id,
							).length,
						valueAvailable: item.valueComplete - item.valueApplied,
					}),
				),
			);
			setAllItems(
				data.wpmGraphqlGetItemsAvailableForApplication.nodes.map((item) => ({
					...item,
					worksheetsAvaliable:
						data.wpmGraphqlGetWorksheetsAvailableForApplication.nodes.filter(
							(obj) => obj.orderdetailId === item.id,
						).length,
				})),
			);
			setAllWorksheets(
				data.wpmGraphqlGetWorksheetsAvailableForApplication.nodes,
			);
		},
	});

	if (loading) return null;
	return (
		<Box sx={styles.container}>
			<Box sx={styles.columnContainer}>
				<Box p={2}>
					<div className='grid-title'>Project Applications List</div>
					<ProjectApplicationsGrid />
				</Box>
				<Box p={2}>
					<div className='grid-title'>
						Project Locations Available For Application
					</div>
					<ProjectLocationsAvailableForApplicationGrid
						setItemData={setItemData}
						rowData={locationData}
						allItems={allItems}
					/>
				</Box>
			</Box>
			<Box sx={styles.columnContainer}>
				<Box p={2}>
					<div className='grid-title'>
						Location Items Available For Application
					</div>
					<ProjectItemsAvailableForApplicationGrid
						rowData={itemData}
						setWorksheetData={setWorksheetData}
						allWorksheets={allWorksheets}
					/>
				</Box>
				<Box p={2}>
					<div className='grid-title'>
						Item Worksheets Available For Application
					</div>
					<ProjectWorksheetsAvailableForApplicationGrid
						rowData={worksheetData}
						itemData={itemData}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default ProjectApplications;

{
	/* <Grid container columnSpacing={3} rowSpacing={3} columns={2}>
			<Grid item xs={1}>
				
				
			</Grid>
			<Grid item xs={1}>
				
				{/* <div className='grid-title'>Add Items To Application</div> */
}
{
	/*	</Grid>
			
			<Grid item xs={1}>
				
			</Grid>
		</Grid> */
}
