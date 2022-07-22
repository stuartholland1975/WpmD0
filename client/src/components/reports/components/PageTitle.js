/** @format */

import React from 'react';
import {Font, StyleSheet, Text, View} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        textTransform: 'uppercase',
        justifyContent: 'center',
        textDecoration: 'underline',
        fontSize: 12,
        padding: 10,
        fontFamily: 'Lato Bold',
    },
});

Font.register({
    family: 'Open Sans',
    src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
    family: 'Lato',
    src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
    family: 'Lato Italic',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
    family: 'Lato Bold',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

const PageTitle = ({title}) => {
    return (
        <View style={styles.container}>
            <Text>{title}</Text>
        </View>
    );
};

export default PageTitle;
