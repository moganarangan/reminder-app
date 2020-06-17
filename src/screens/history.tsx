import React from 'react';
import {  StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

export default class History extends React.Component {
    render() {
        return (
            <Layout style={styles.container}>
                <Text category='h5'>This is History.</Text> 
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
