import React from 'react';
import {StyleSheet, Text, View} from "@react-pdf/renderer";

const BORDER_COLOR = '#bfbfbf';
const BORDER_BOTTOM_COLOR = '#22415e';
const BORDER_STYLE = 'solid';

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flexGrow: 1,
        marginTop: 25,
        position: "absolute",
        bottom: 10,
        right: 10,
        left: 10,
    },
    tableColHeader: {
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: BORDER_BOTTOM_COLOR,
        borderWidth: 1,
        backgroundColor: '#e6e6e6',
        fontSize: 8,
        padding: 5,
        flexGrow: 1
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
        flexGrow: 2,
    },
})

const SignatureBar = () => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.tableColHeader}>COMPLETED BY</Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableColHeader}>DATE COMPLETE</Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableColHeader}>NO OF PHOTOGRAPHS</Text>
                <Text style={styles.tableCell}></Text>
            </View>
        </View>
    );
};

export default SignatureBar;