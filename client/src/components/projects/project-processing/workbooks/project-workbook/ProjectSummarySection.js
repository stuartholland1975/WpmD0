/** @format */

import React from 'react';
import {formatNumberTwoDecimals,} from '../../../../../functions/formattingFunctions';
import DataColumn from '../../../../reports/components/DataColumn';

function ProjectSummarySection(props) {
	const {
		projectData: {orderheaderWithValueById},
	} = props;
	const {
		projectTitle,
		orderNumber,
		statusDescription,
		area,
		workType,
		locationCount,
		itemCount,
		orderValueTotal,
		orderValueTotalVarn,
		averageItemValue,
		averageLocationValue,
	} = orderheaderWithValueById;
	const descriptiveData = {
		projectTitle,
		projectNumber: orderNumber,
		projectStatus: statusDescription,
		area,
		workType,
		projectOrderValue: formatNumberTwoDecimals(orderValueTotal),
		projectVariationsValue: formatNumberTwoDecimals(orderValueTotalVarn),
		locationCount,
		averageLocationValue: formatNumberTwoDecimals(averageLocationValue),
		itemCount,
		averageItemValue: formatNumberTwoDecimals(averageItemValue),
	};
	return <DataColumn data={descriptiveData}/>;
}

export default ProjectSummarySection;
