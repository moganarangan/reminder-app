import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';
import { reminder } from '../model/reminder';
import { reminderActivity } from '../model/reminderActivity';
import { default as theme } from '../utilities/theme.json';

interface Props {
    navigation: any,
    reminders: Array<reminder>,
    remindersActivity: Array<reminderActivity>
}

class Home extends Component<Props> {

    openNewReminder = () => {
        if (this.props.reminders && this.props.reminders.length < 8) {
            this.props.navigation.navigate('NewReminder', {});
        }
    }

    openMore = () => {
        this.props.navigation.navigate('More', {});
    }

    openReminders = () => {
        this.props.navigation.navigate('RemindersMaster', {});
    }

    openActivities = () => {
        this.props.navigation.navigate('RemindersActivityMaster', {});
    }

    render() {
        return (
            <Layout style={styles.container}>

                <Text category='h5'>This is Home.</Text>
                {this.props.reminders.length < 8 &&
                    <FAB style={styles.fab}
                        icon="plus"
                        color="#ffffff"
                        onPress={() => this.openNewReminder()}
                    />}
            </Layout>
        )
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state: any) => {
    console.log('Home map state', state);
    // Redux Store --> Component
    return {
        reminders: state.reminderMaster.reminders,
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
        margin: 15,
        right: 5,
        bottom: 5,
        backgroundColor: theme["color-primary-500"]
    }
});
