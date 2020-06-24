import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';

interface Props {
    navigation: any,
    remindersActivity: Array<any>
}

class Home extends Component<Props> {

    openNewReminder = () => {
        this.props.navigation.navigate('NewReminder', {});
    }

    render() {
        return (
            <Layout style={styles.container}>

                <Text category='h5'>This is Home.</Text>

                <FAB style={styles.fab}
                    icon="plus"
                    onPress={() => this.openNewReminder()}
                />
            </Layout>
        );
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state: any) => {
    console.log('Home map state', state);
    // Redux Store --> Component
    return {
        remindersActivity: state.reminderMaster.remindersActivity
    };
};

// Exports
export default connect(mapStateToProps, null)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 5,
        bottom: 5,
    }
});
