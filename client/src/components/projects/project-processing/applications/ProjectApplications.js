/** @format */

import React from 'react';
import ProjectApplicationsGrid from '../../../grids/grids/ProjectApplicationsGrid';
import ProjectLocationsAvailableForApplicationGrid from '../../../grids/grids/ProjectLocationsAvailableForApplicationGrid';
import { Box, Button, Grid } from '@mui/material';
import ProjectItemsAvailableForApplicationGrid from '../../../grids/grids/ProjectItemsAvailableForApplicationGrid';
import ProjectWorksheetsAvailableForApplicationGrid from '../../../grids/grids/ProjectWorksheetsAvailableForApplicationGrid';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
	GET_PROJECT_ITEMS_AVAILABLE_FOR_APPLICATION,
	GET_PROJECT_APPLICATION_DETAILS,
} from '../../../../api-calls/queries/applications';
import { ADD_ITEMS_TO_APPLICATION } from '../../../../api-calls/mutations/project-mutations';
import { useConfirm } from 'material-ui-confirm';

const styles = {
	container: { display: 'flex' },
	columnContainer: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
	},
};

const ProjectApplications = () => {
	const { id } = useParams();
	const confirm = useConfirm();
	const [locationData, setLocationData] = React.useState([]);
	const [itemData, setItemData] = React.useState([]);
	const [worksheetData, setWorksheetData] = React.useState([]);
	const [allItems, setAllItems] = React.useState([]);
	const [allWorksheets, setAllWorksheets] = React.useState([]);
	const { loading, refetch } = useQuery(
		GET_PROJECT_ITEMS_AVAILABLE_FOR_APPLICATION,
		{
			variables: { orderId: Number(id) },
			fetchPolicy: 'cache-and-network',
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
						worksheetsAvailable:
							data.wpmGraphqlGetWorksheetsAvailableForApplication.nodes.filter(
								(obj) => obj.orderdetailId === item.id,
							).length,
					})),
				);
				setAllWorksheets(
					data.wpmGraphqlGetWorksheetsAvailableForApplication.nodes,
				);
			},
		},
	);

	const [updateApplication] = useMutation(ADD_ITEMS_TO_APPLICATION, {
		refetchQueries: [
			{
				query: GET_PROJECT_APPLICATION_DETAILS,
				variables: { orderId: Number(id) },
			},
		],
		awaitRefetchQueries: true,
		onCompleted: () => refetch(),
	});

	const handleSubmit = () => {
		const apiData = worksheetData.map((item) => item.id);
		const locationCount = [
			...new Set(worksheetData.map((item) => item.sitelocationId)),
		].length;
		const itemCount = [
			...new Set(worksheetData.map((item) => item.orderdetailId)),
		].length;
		confirm({
			title: 'Confirm Data Submission',
			titleProps: { color: 'red', fontWeight: 'bold' },
			content: `Submission Contains ${locationCount} locations(s)
				 ${itemCount} item(s) With A Value of ${worksheetData
				.map((item) => Number(item.valueComplete))
				.reduce((tot, num) => tot + num)
				.toLocaleString()}`,
			confirmationText: 'Submit',
			cancellationButtonProps: { color: 'secondary' },
			allowClose: false,
			contentProps: { fontWeight: 'bold' },
		})
			.then(() =>
				updateApplication({
					variables: { input: apiData, orderId: Number(id) },
				}),
			)
			.then(() => {
				setItemData([]);
				setWorksheetData([]);
			});
	};

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
				<Box p={2}>
					<Button
						color='submit'
						disabled={worksheetData.length === 0}
						onClick={handleSubmit}
					>
						add items to application
					</Button>
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
