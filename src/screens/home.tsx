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
import { styles } from '../utilities/stylesheet';

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
        if (this.props.rCount < 8) {
            this.props.navigation.navigate('NewReminder', null);
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
            <Layout style={[styles.container, styles.colorT, (this.props.rCount === 0 && this.props.today.length === 0
                && this.props.upcoming.length === 0 && this.props.overdue.length === 0) ? styles.centre : null]}>

                <View style={styles.title}>
                    <Text category='h3' style={{ fontWeight: '900' }}><Text style={styles.titleR} category='h2'>R</Text>eminders</Text>
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.pb}>

                        {(this.props && this.props.today.length > 0) && <Text category='h5'>Today</Text>}

                        {(this.props && this.props.today.length > 0) && this.props.today.map((item) =>
                            <Card key={item.reminderActivityId} style={[styles.item, styles.card]} onPress={() => this.openReminderActivity(item)}>

                                <Layout style={[styles.innerItem, styles.colorT]}>
                                    <Text category='h5'>{item.reminderName}</Text>
                                    <Text category='h6'>{this.reminderTypes[item.reminderType - 1]}</Text>
                                </Layout>

                                <Layout style={[styles.row, styles.colorT]}>
                                    <Icon style={[styles.icon, styles.pr, item.completionDate ? styles.success : null]} name='calendar' pack="feather" />
                                    <Text category='s1'>{this.getSpecificDate(item.dueDate)}</Text>


                                    <Icon style={[styles.icon, styles.pl, styles.pr, item.completionDate ? styles.success : null]} name='clock' pack="feather" />
                                    <Text category='s1'>{this.getTime(item.reminderTime)}</Text>
                                </Layout>
                            </Card>
                        )}
                    </View>

                    <View style={styles.pb}>
                        {(this.props && this.props.overdue.length > 0) && <Text category='h5'>Overdue</Text>}
                        {this.props && this.props.overdue.map((item) =>
                            <Card key={item.reminderActivityId} style={[styles.item, styles.card]} onPress={() => this.openReminderActivity(item)}>

                                <Layout style={[styles.innerItem, styles.colorT]}>
                                    <Text category='h5'>{item.reminderName}</Text>
                                    <Text category='h6'>{this.reminderTypes[item.reminderType - 1]}</Text>
                                </Layout>

                                <Layout style={[styles.row, styles.colorT]}>
                                    <Icon style={[styles.icon, styles.pr, styles.danger]} name='calendar' pack="feather" />
                                    <Text category='s1'>{this.getSpecificDate(item.dueDate)}</Text>


                                    <Icon style={[styles.icon, styles.pl, styles.pr, styles.danger]} name='clock' pack="feather" />
                                    <Text category='s1'>{this.getTime(item.reminderTime)}</Text>
                                </Layout>
                            </Card>
                        )}
                    </View>

                    <View>
                        {(this.props && this.props.upcoming.length > 0) && <Text category='h5'>Upcoming</Text>}
                        {this.props && this.props.upcoming.map((item) =>
                            <Card key={item.reminderActivityId} style={[styles.item, styles.card]} onPress={() => this.openReminderActivity(item)}>

                                <Layout style={[styles.innerItem, styles.colorT]}>
                                    <Text category='h5'>{item.reminderName}</Text>
                                    <Text category='h6'>{this.reminderTypes[item.reminderType - 1]}</Text>
                                </Layout>

                                <Layout style={[styles.row, styles.colorT]}>
                                    <Icon style={[styles.icon, styles.pr, styles.warning,
                                    item.completionDate ? styles.success : null]} name='calendar' pack="feather" />
                                    <Text category='s1'>{this.getSpecificDate(item.dueDate)}</Text>


                                    <Icon style={[styles.icon, styles.pl, styles.pr, styles.warning,
                                    item.completionDate ? styles.success : null]} name='clock' pack="feather" />
                                    <Text category='s1'>{this.getTime(item.reminderTime)}</Text>
                                </Layout>
                            </Card>
                        )}
                    </View>
                </ScrollView>

                {(this.props.rCount === 0 && this.props.today.length === 0
                    && this.props.upcoming.length === 0 && this.props.overdue.length === 0) &&
                    <Text style={{ flex: 2, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                        category='h5' appearance='hint'>
                        Add new reminders by pressing + icon below.
                    </Text>}

                {this.props.rCount < 8 &&
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

