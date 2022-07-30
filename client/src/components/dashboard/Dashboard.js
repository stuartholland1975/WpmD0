/** @format */
import React from 'react';
import { Box, Grid } from '@mui/material';
import SelectArea from '../charts/components/SelectArea';
import SelectPeriod from '../charts/components/SelectPeriod';
import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_DATA } from '../../api-calls/queries/dashboard';
import AreaValuesGrid from '../grids/grids/AreaValuesGrid';
import AreaValuesChart from '../charts/AreaValuesChart';
import WorkCompleteByPeriodArea from '../charts/WorkCompleteByPeriodArea';
import PeriodValuesGrid from '../grids/grids/PeriodValuesGrid';
import ApplicationValuesGrid from '../grids/grids/ApplicationValuesGrid';
import ApplicationValuesChart from '../charts/ApplicationValuesChart';

function useDashboardFilters() {
	const [filters, setFilter] = React.useState({
		area: null,
		period: null,
	});

	const updateFilter = (filterType, value) => {
		setFilter((prevState) => ({
			...prevState,
			[filterType]: value,
		}));
	};

	return {
		models: { filters },
		operations: { updateFilter },
	};
}

const Dashboard = () => {
	const [rowData, setRowData] = React.useState({});
	const { loading, error, refetch } = useQuery(GET_DASHBOARD_DATA, {
		fetchPolicy: 'cache-and-network',
		onCompleted: (data) => {
			setRowData({
				areas: data.areaWithValues.nodes,
				periodAreas: data.workCompleteByAreaPeriodTables.nodes.map((obj) =>
					Object.fromEntries(
						Object.entries(obj).map(([key, value]) => [key, Number(value)]),
					),
				),
				applicationAreas: data.workAppliedByAreaAndApplications.nodes.map(
					(obj) =>
						Object.fromEntries(
							Object.entries(obj).map(([key, value]) => [key, Number(value)]),
						),
				),
			});
		},
	});
	const { operations, models } = useDashboardFilters();

	if (loading) return null;
	if (error) console.log(error);

	return (
		<Grid container columns={2} spacing={3} height={1500}>
			<Grid item xs={2}>
				<div className={'grid-title'}>area values</div>
			</Grid>
			<Grid item xs={1}>
				<div style={{ backgroundColor: 'white' }}>
					<div className={'small-grid-title'}>Area Values Grid</div>
					<AreaValuesGrid rowData={rowData.areas} />
				</div>
			</Grid>
			<Grid item xs={1}>
				<AreaValuesChart rowData={rowData.areas} />
			</Grid>
			<Grid item xs={2}>
				<div className={'grid-title'}>period values</div>
			</Grid>
			<Grid item xs={1}>
				<div style={{ backgroundColor: 'white' }}>
					<div className={'small-grid-title'}>Period Values Grid</div>
					<PeriodValuesGrid rowData={rowData.periodAreas} />
				</div>
			</Grid>
			<Grid item xs={1}>
				<WorkCompleteByPeriodArea rowData={rowData.periodAreas} />
			</Grid>
			<Grid item xs={2}>
				<div className={'grid-title'}>application values</div>
			</Grid>
			<Grid item xs={1}>
				<div style={{ backgroundColor: 'white' }}>
					<div className={'small-grid-title'}>Application Values Grid</div>
					<ApplicationValuesGrid rowData={rowData.applicationAreas} />
				</div>
			</Grid>
			<Grid item xs={1}>
				<ApplicationValuesChart rowData={rowData.applicationAreas} />
			</Grid>
		</Grid>
	);
};

export default Dashboard;
