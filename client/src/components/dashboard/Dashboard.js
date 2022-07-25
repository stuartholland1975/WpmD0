/** @format */
import React from 'react';
import TestChart from '../charts/TestChart';
import TestChart2 from '../charts/TestChart2';
import { Grid } from '@mui/material';

const Dashboard = () => {
	return (
		<Grid container>
			<Grid item>
				<TestChart />
			</Grid>
			<Grid item>
				<TestChart2 />
			</Grid>
		</Grid>
	);
};

export default Dashboard;
