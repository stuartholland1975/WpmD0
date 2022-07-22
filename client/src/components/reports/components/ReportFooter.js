/** @format */

import {StyleSheet, Text, View} from '@react-pdf/renderer';
import React from 'react';
import {DateTime} from 'luxon';

const styles = StyleSheet.create({
	footer: {
		flexDirection: 'row',
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		marginTop: 2,
		padding: 5,
		justifyContent: 'space-between',
		fontSize: 8,
		borderTop: 1,
		borderStyle: 'solid',
	},
});

const today = DateTime.now().toLocaleString();

const ReportFooter = ({footer}) => {
	return (
		<View style={styles.footer} fixed>
			<Text>{today.toLocaleString()}</Text>

			<Text>{footer}</Text>
			<Text
				render={({pageNumber, totalPages}) =>
					`Page:${pageNumber} / ${totalPages}`
				}
			/>
		</View>
	);
};

export default ReportFooter;
