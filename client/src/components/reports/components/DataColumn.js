/** @format */

import React from 'react';
import {StyleSheet, View} from '@react-pdf/renderer';
import {camelCaseToText} from '../../../functions/formattingFunctions';
import DataItem from './DataItem';

const styles = StyleSheet.create({
	container: {
		borderStyle: 'solid',
		borderWidth: 1,
		margin: 10,
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
