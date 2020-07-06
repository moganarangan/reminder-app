import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { default as theme } from '../utilities/theme.json';

export default class More extends React.Component {
    render() {
        return (
            <>
                <Layout style={styles.container1}>
                    <View style={styles.heading}>
                        <Text category='h5'>More</Text>
                    </View>
                </Layout>
                <Layout style={styles.container2}>
                    <View style={[styles.pl, styles.pt]}>
                        <Text category='h5' style={styles.title}>About</Text>
                        <Text category='c1' style={styles.subtitle}>Version 1.0.0</Text>
                    </View>
                </Layout>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: theme['color-basic-200'],
    },
    container2: {
        flex: 3,
        flexDirection: 'column',
        padding: 20
    },
    heading: {
        alignItems: "flex-start",
        fontFamily: 'Roboto-Light',
    },
    pt: {
        paddingTop: 20
    },
    pl: {
        paddingLeft: 30
    },
    title: {
        fontFamily: 'Roboto-Light',
        fontWeight: "900"
    },
    subtitle: {
        color: theme["color-basic-800"],
        fontFamily: 'Roboto-Light'
    }
});
