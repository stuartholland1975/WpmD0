/** @format */

import React from 'react';
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';

const AreaValuesChart = ({ rowData }) => {
	const barOptions = {
		data: rowData.map((item) => ({
			area: item.description,
			valueOs: Number(item.orderValue) - Number(item.valueComplete),
			valueComplete: Number(item.valueComplete),
		})),
		title: {
			text: "Order Values By Area",
		},
		series: [
			{
				type: 'column',
				xKey: 'area',
				yKey: 'valueComplete',
				yName: 'Value Complete',
				stacked: true,
			},

			{
				type: 'column',
				xKey: 'area',
				yKey: 'valueOs',
				yName: 'Value Remaining',
				stacked: true,
			},
		],
		axes: [
			{
				type: 'category',
				position: 'bottom',
				title: {
					text: 'Areas',
					enabled: true,
				},
			},
			{
				type: 'number',
				position: 'left',
				title: {
					text: 'Project Value (£)',
					enabled: true,
				},
				label: {
					format: 'n'
				}
			},
		],
		theme: 'ag-pastel',
	}

	return <AgChartsReact options={barOptions} />;
	{
		/* <AgChartsReact options={barOptions} />; */
	}
};

export default AreaValuesChart;
