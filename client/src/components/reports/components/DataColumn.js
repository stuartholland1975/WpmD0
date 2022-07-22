/** @format */

import React from 'react';
import {StyleSheet, View} from '@react-pdf/renderer';
import {camelCaseToText} from '../../../functions/formattingFunctions';
import DataItem from './DataItem';

const styles = StyleSheet.create({
	container: {
		borderStyle: 'solid',
		borderWidth: 1,
		// marginLeft: 10,
		// marginRight: 10,
		// marginTop: 2.5,
		// marginBottom: 2.5,
		padding: 10,
		backgroundColor: '#f2f2f2',
	},
});

const DataColumn = ({data}) => {
	return (
		<View style={styles.container} wrap={false}>
			{Object.entries(data).map(([key, value]) => (
				<DataItem title={camelCaseToText(key)} value={value} key={key}/>
			))}
		</View>
	);
};

export default DataColumn;
