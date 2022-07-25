/** @format */
import React from 'react';
import TestChart from '../charts/TestChart';
import TestChart2 from '../charts/TestChart2';
import { Grid } from '@mui/material';
import SelectArea from '../charts/components/SelectArea';

const Dashboard = () => {
	return (
		<React.Fragment>
			<Grid container spacing={3} columns={3}>
				<Grid item xs={1}>
					<SelectArea />
				</Grid>
			</Grid>
			<Grid container spacing={3} columns={2}>
				{/* <Grid item>
					<TestChart />
				</Grid>*/}
				<Grid item xs={'auto'}>
					<TestChart2 />
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default Dashboard;
