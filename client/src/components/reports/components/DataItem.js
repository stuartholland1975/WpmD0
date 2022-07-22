/** @format */

import React from 'react';
import {StyleSheet, Text, View} from '@react-pdf/renderer';

const styles = StyleSheet.create({
	dataRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		textTransform: 'uppercase',
		fontSize: 15,
	},
});

const DataItem = ({title, value}) => {
	return (
		<View style={styles.dataRow}>
			<Text>{title}:</Text>
			<Text>{value}</Text>
		</View>
	);
};

export default DataItem;
