import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { Layout, Text, Card, Icon } from '@ui-kitten/components';
import { reminderActivity } from '../model/reminderActivity';
import { default as theme } from '../utilities/theme.json';
import moment from "moment";

import {
    getTodayDashboardActivities, getUpcomingDashboardActivities,
    getOverdueDashboardActivities, getRemindersCount
} from '../selectors';

interface Props {
    navigation: any,
    today: Array<reminderActivity>;
    upcoming: Array<reminderActivity>;
    overdue: Array<reminderActivity>;
    rCount: number;
}

class Home extends Component<Props> {
    reminderTypes = ['Daily', 'Monthly', 'Yearly', 'Specific Date'];

    openNewReminder = () => {
        if (this.props.rCount && this.props.rCount < 8) {
            this.props.navigation.navigate('NewReminder', {});
        }
    }

    openReminderActivity = (ra: reminderActivity) => {
        this.props.navigation.navigate('ReminderActivity', { item: ra });
    }

    getTime = (date: Date) => {
        return moment(date).format('LT');
    }

    getSpecificDate = (date: Date) => {
        return moment(date).format('dddd, MMMM Do yyyy');
    }

    render() {
        return (
            <Layout style={styles.container}>

                <View style={styles.title}>
                    <Text category='h3'><Text style={styles.titleR} category='h3'>R</Text>eminders</Text>
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.pb}>

                        {(this.props && this.props.today.length > 0) && <Text>Today</Text>}

                        {this.props && this.props.today.map((item) =>
                            <Card key={item.reminderActivityId} style={styles.item} onPress={() => this.openReminderActivity(item)}>

                                <Layout style={styles.innerItem}>
                                    <Text category='h5'>{item.reminderName}</Text>
                                    <Text category='h6'>{this.reminderTypes[item.reminderType - 1]}</Text>
                                </Layout>

                                <Layout style={styles.row}>
                                    <Icon style={[styles.icon, styles.pr]} name='calendar' pack="feather" />
                                    <Text category='s1'>{this.getSpecificDate(item.dueDate)}</Text>


                                    <Icon style={[styles.icon, styles.pl, styles.pr]} name='clock' pack="feather" />
                                    <Text category='s1'>{this.getTime(item.reminderTime)}</Text>
                                </Layout>
                            </Card>
                        )}
                    </View>

                    <View style={styles.pb}>
                        {(this.props && this.props.overdue.length > 0) && <Text>Overdue</Text>}
                        {this.props && this.props.overdue.map((item) =>
                            <Card key={item.reminderActivityId} style={styles.item} onPress={() => this.openReminderActivity(item)}>

                                <Layout style={styles.innerItem}>
                                    <Text category='h5'>{item.reminderName}</Text>
                                    <Text category='h6'>{this.reminderTypes[item.reminderType - 1]}</Text>
                                </Layout>

                                <Layout style={styles.row}>
                                    <Icon style={[styles.icon, styles.pr]} name='calendar' pack="feather" />
                                    <Text category='s1'>{this.getSpecificDate(item.dueDate)}</Text>


                                    <Icon style={[styles.icon, styles.pl, styles.pr]} name='clock' pack="feather" />
                                    <Text category='s1'>{this.getTime(item.reminderTime)}</Text>
                                </Layout>
                            </Card>
                        )}
                    </View>

                    <View>
                        {(this.props && this.props.upcoming.length > 0) && <Text>Upcoming</Text>}
                        {this.props && this.props.upcoming.map((item) =>
                            <Card key={item.reminderActivityId} style={styles.item} onPress={() => this.openReminderActivity(item)}>

                                <Layout style={styles.innerItem}>
                                    <Text category='h5'>{item.reminderName}</Text>
                                    <Text category='h6'>{this.reminderTypes[item.reminderType - 1]}</Text>
                                </Layout>

                                <Layout style={styles.row}>
                                    <Icon style={[styles.icon, styles.pr]} name='calendar' pack="feather" />
                                    <Text category='s1'>{this.getSpecificDate(item.dueDate)}</Text>


                                    <Icon style={[styles.icon, styles.pl, styles.pr]} name='clock' pack="feather" />
                                    <Text category='s1'>{this.getTime(item.reminderTime)}</Text>
                                </Layout>
                            </Card>
                        )}
                    </View>
                </ScrollView>

                {this.props.rCount && this.props.rCount < 8 &&
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
        today: getTodayDashboardActivities(state),
        upcoming: getUpcomingDashboardActivities(state),
        overdue: getOverdueDashboardActivities(state),
        rCount: getRemindersCount(state)
    };
};

// Exports
export default connect(mapStateToProps, null)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: theme['background-color']
    },
    fab: {
        position: 'absolute',
        margin: 15,
        right: 5,
        bottom: 5,
        backgroundColor: theme["color-primary-500"]
    },
    item: {
        marginTop: 10
    },
    innerItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    row: {
        flexDirection: 'row'
    },
    pr: {
        paddingRight: 10
    },
    pl: {
        paddingLeft: 10
    },
    pls: {
        paddingLeft: 5
    },
    icon: {
        height: 18,
        tintColor: theme["color-primary-500"]
    },
    title: {
        alignItems: "center"
    },
    titleR: {
        color: theme["color-primary-500"],
        fontWeight: 'bold'
    },
    pb: {
        paddingBottom: 20
    }
});
