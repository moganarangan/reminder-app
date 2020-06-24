import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';

interface Props {
    navigation: any,
    reminders: Array<any>
}

class Configuration extends React.Component<Props> {
    render() {
        return (
            <Layout style={styles.container}>
                <Text category='h5'>This is Configuration.</Text>
            </Layout>
        );
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state: any) => {
    console.log('Configuration map state', state);

    // Redux Store --> Component
    return {
        reminders: state.reminderMaster.reminders
    };
};

// Exports
export default connect(mapStateToProps, null)(Configuration);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
