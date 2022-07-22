/** @format */

import {useQuery} from '@apollo/client';
import {Box, CircularProgress, Typography} from '@mui/material';
import React from 'react';
import {GET_SINGLE_PROJECT_HEADER} from '../../../api-calls/queries/projects';
import {formatNumberNoDecimals} from '../../../functions/formattingFunctions';
import {useParams} from 'react-router-dom';

function Item(props) {
	const {sx, ...other} = props;
	return (
		<Box
			border={1}
			flexGrow={1}
			bgcolor={'#b4cce4'}
			m={0.5}
			p={0.5}
			textAlign={'center'}
			borderRadius={2}
			{...other}
		/>
	);
}

const ProjectStats = () => {
	const {id} = useParams();

	const {data: projectData, loading} = useQuery(GET_SINGLE_PROJECT_HEADER, {
		variables: {id: Number(id)},
		fetchPolicy: 'cache-and-network',
	});

	if (loading) return <CircularProgress/>;

	return (
		<Box
			display={'flex'}
			flexWrap={'wrap'}
			justifyContent={'space-between'}
			mb={1}
			ml={0.5}
			mr={0.5}>
			<Item>
				<Typography fontWeight={'bold'}>PROJECT NAME</Typography>
				<Typography>
					{projectData.orderheaderWithValue.projectTitle.substring(0, 25) +
						'...'}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>PROJECT NO</Typography>
				<Typography>{projectData.orderheaderWithValue.orderNumber}</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>STATUS</Typography>
				<Typography>
					{projectData.orderheaderWithValue.statusDescription}{' '}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>AREA</Typography>
				<Typography>{projectData.orderheaderWithValue.area}</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>LABOUR</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.orderValueLabour,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>MATERIALS</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.orderValueMaterials,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>OTHER</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.orderValueOther,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>TOTAL</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.orderValueTotal,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>COMPLETE</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.orderValueTotalComplete,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>TO DO</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.orderValueTotal -
						projectData.orderheaderWithValue.orderValueTotalComplete,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>APPLIED</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.orderValueTotalApplied,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>TO APPLY</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.orderValueTotalComplete -
						projectData.orderheaderWithValue.orderValueTotalApplied,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography>BOQ VAL</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.orderValueTotalBoq,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>VARN VAL</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.orderValueTotalVarn,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>LOCATIONS</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.locationCount,
					)}
				</Typography>
			</Item>

			<Item>
				<Typography fontWeight={'bold'}>COMPLETE</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.locationsComplete,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>ITEMS</Typography>
				<Typography>
					{formatNumberNoDecimals(projectData.orderheaderWithValue.itemCount)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>COMPLETE</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.itemsComplete,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>DOCS</Typography>
				<Typography>
					{formatNumberNoDecimals(
						projectData.orderheaderWithValue.documentCount,
					)}
				</Typography>
			</Item>
			<Item>
				<Typography fontWeight={'bold'}>IMAGES</Typography>
				<Typography>
					{formatNumberNoDecimals(projectData.orderheaderWithValue.imageCount)}
				</Typography>
			</Item>
		</Box>
	);
};

export default ProjectStats;
