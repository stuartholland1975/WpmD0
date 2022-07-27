/** @format */

import React from 'react';
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';

const AreaValuesChart = ({ rowData }) => {
	const [pieOptions, setOptions] = React.useState({
		data: rowData.map((item) => ({
			area: item.description,
			orderValue: Number(item.orderValue),
		})),
		series: [
			{
				type: 'pie',
				angleKey: 'orderValue',
				labelKey: 'area',
				title: {
					text: 'Area Values Chart',
					enabled: true,
					fontSize: 20,
					showInLegend: false,
				},
			},
		],
		theme: 'ag-pastel',
	});
	const [barOptions, setBarOptions] = React.useState({
		data: rowData.map((item) => ({
			area: item.description,
			orderValue: Number(item.orderValue),
			valueComplete: Number(item.valueComplete),
		})),
		title: {
			text: "Apple's revenue by product category",
		},
		subtitle: {
			text: 'in billion U.S. dollars',
		},
		series: [
			{
				type: 'column',
				xKey: 'area',
				yKey: 'valueComplete',
				yName: 'valueComplete',
				stacked: true,
			},

			{
				type: 'column',
				xKey: 'area',
				yKey: 'orderValue',
				yName: 'orderValue',
				stacked: true,
			},
		],
		theme: 'ag-pastel',
	});

	return <AgChartsReact options={barOptions} />;
	{
		/* <AgChartsReact options={barOptions} />; */
	}
};

export default AreaValuesChart;
