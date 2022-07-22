/** @format */

import {Font, StyleSheet, View} from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',

        marginBottom: 5,
        paddingBottom: 2.5,
        justifyContent: 'space-between',
        fontSize: 6,
        borderBottom: 1,
        borderStyle: 'solid',
        textTransform: 'uppercase',
        fontFamily: 'Open Sans',
    },
});

Font.register({
    family: 'Open Sans',
    src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

const ReportHeader = ({children}) => {
    return (
        <View style={styles.header} fixed>
            {children}
        </View>
    );
};

export default ReportHeader;
