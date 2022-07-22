/** @format */

import {StyleSheet, Text, View} from '@react-pdf/renderer';
import React from 'react';
import {camelCaseToText,} from '../../../functions/formattingFunctions';

const BORDER_COLOR = '#bfbfbf';
const BORDER_BOTTOM_COLOR = '#22415e';
const BORDER_STYLE = 'solid';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    tableColHeader: {
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: BORDER_BOTTOM_COLOR,
        borderWidth: 1,
        backgroundColor: '#e6e6e6',
        fontSize: 8,
        padding: 5,
    },

    tableCell: {
        fontSize: 8,
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: BORDER_BOTTOM_COLOR,
        borderWidth: 1,
        padding: 5,
        paddingBottom: 10,
        paddingTop: 10,
        flexGrow: 1,
    },

    tableColumn: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'stretch',
    },
});

const TableColumn = ({data}) => {
    const header = Object.keys(data)[0];
    return (
        <React.Fragment>
            <View style={styles.tableColumn}>
                <Text wrap={false} fixed style={styles.tableColHeader}>{camelCaseToText(header.toString())}</Text>
                {data[header].map((item, idx) => (
                    <Text wrap={false} style={styles.tableCell} key={idx}>{item}</Text>
                ))}
            </View>
        </React.Fragment>
    );
};

const DataTable = ({data}) => {
    const headers = Object.keys(data[0])
    const itemData = headers.map((item) => ({
        [item]: data.map((row) => row[item]),
    }));
    return (
        <View style={styles.container}>
            {itemData.map((item, idx) => (
                <TableColumn data={item} key={idx}/>
            ))}
        </View>
    );
};

export default DataTable;
