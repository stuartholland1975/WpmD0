/** @format */

import React from 'react';
import { AgChartsReact } from 'ag-charts-react';

const ApplicationValuesChart = ({ rowData }) => {
	const chartRef = React.useRef();

	const barOptions = {
		data: rowData,

		title: {
			text: 'Application Values',
		},

		series: [
			{
				type: 'column',
				xKey: 'application',
				yKey: 'north',
				yName: 'North',
				stacked: true,
			},

			{
				type: 'column',
				xKey: 'application',
				yKey: 'central',
				yName: 'Central',
				stacked: true,
			},
			{
				type: 'column',
				xKey: 'application',
				yKey: 'south',
				yName: 'South',
				stacked: true,
			},
			{
				type: 'column',
				xKey: 'application',
				yKey: 'admin',
				yName: 'Admin',
				stacked: true,
			},
			{
				type: 'column',
				xKey: 'application',
				yKey: 'misc',
				yName: 'Misc',
				stacked: true,
			},
			{
				type: 'column',
				xKey: 'application',
				yKey: 'test',
				yName: 'Test',
				stacked: true,
			},
		],
		axes: [
			{
				type: 'category',
				position: 'bottom',
				title: {
					text: 'Application',
					enabled: true,
				},
			},
			{
				type: 'number',
				position: 'left',
				title: {
					text: 'Value Applied (£)',
					enabled: true,
				},
				label: {
					format: 'n',
				},
			},
		],
		theme: 'ag-pastel',
		legend: {
			position: 'right',
		},
	};

	return <AgChartsReact options={barOptions} ref={chartRef} />;
};

export default ApplicationValuesChart;
