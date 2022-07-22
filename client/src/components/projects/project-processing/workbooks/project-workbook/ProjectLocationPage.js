/** @format */

import React from 'react';
import {Page, StyleSheet, Text} from '@react-pdf/renderer';
import ReportHeader from '../../../../reports/components/ReportHeader';
import DataColumn from '../../../../reports/components/DataColumn';
import {DateTime} from 'luxon';
import PageContent from '../../../../reports/components/PageContent';
import PageTitle from '../../../../reports/components/PageTitle';
import {formatNumberTwoDecimals} from '../../../../../functions/formattingFunctions';
import DataTable from '../../../../reports/components/TableComponents';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
	},
});

const ProjectLocationPage = ({projectData}) => {
	const {orderheaderWithValueById} = projectData;
	const {projectTitle, orderNumber} = orderheaderWithValueById;
	const {sitelocationWithValues} = projectData;

	const locationData = sitelocationWithValues.nodes.map((item) => {
		const {reference, worksheetReference, orderValue, itemCount, id} = item;

		return {
			locationData: {
				worksheetReference,
				locationReference: reference,
				locationValue: formatNumberTwoDecimals(orderValue),
				itemCount,
			},
			id,
			itemData: item.sitelocationById.orderdetailWithValues.nodes.map(item => ({
				itemNumber: item.itemNumber,
				activityDescription: item.activityDescription,
				activityCode: item.activityCode,
				qtyOrdered: formatNumberTwoDecimals(item.qtyOrdered),
				locationValue: formatNumberTwoDecimals(item.valuePayableTotal),
				qtyOs: formatNumberTwoDecimals(item.qtyOs),
				qtyComplete: '',
				comments: '',

			}))
		};
	});
	const today = DateTime.now().toLocaleString();

	return locationData.map((item) => (
		<Page size={'a4'} orientation={'landscape'} style={styles.container} key={item.id}>
			<ReportHeader>
				<Text>Printed: {today.toLocaleString()}</Text>

				<Text>{'Project Workbook Report'}</Text>
				<Text
					render={({pageNumber, totalPages}) =>
						`Page:${pageNumber} / ${totalPages}`
					}
				/>
			</ReportHeader>
			<PageContent>
				<PageTitle title='LOCATION SUMMARY INFO'/>
				<DataColumn key={item.id} data={item.locationData}/>
				<PageTitle title='LOCATION DETAIL INFO'/>
				<DataTable data={item.itemData}/>
			</PageContent>
		</Page>
	));
};

export default ProjectLocationPage;
