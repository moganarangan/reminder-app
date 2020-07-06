import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Card, Text, Icon } from '@ui-kitten/components';
import { reminderActivity } from '../model/reminderActivity';
import moment from "moment";
import { default as theme } from '../utilities/theme.json';
import { getHistoryReminders, getUpcomingDashboardActivities, getOverdueDashboardActivities } from '../selectors';

interface Props {
    navigation: any,
    ra: Array<reminderActivity>,
    overdue: Array<reminderActivity>,
    upcoming: Array<reminderActivity>
}

class History extends React.Component<Props> {
    reminderTypes = ['Daily', 'Monthly', 'Yearly', 'Specific Date'];

    getTime = (date: Date) => {
        return moment(date).format('LT');
    }

    getSpecificDate = (date: Date) => {
        return moment(date).format('dddd, MMMM Do yyyy');
    }

    openReminderActivity = (ra: reminderActivity) => {
        this.props.navigation.navigate('ReminderActivity', { item: ra });
    }

    render() {
        return (
            <Layout style={[styles.container, this.props.ra.length === 0 ? styles.centre : null]}>

                <View style={styles.title}>
                    <Text category='h3'><Text style={styles.titleR} category='h3'>R</Text>eminders</Text>
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.props.ra.map((item) =>
                        <Card key={item.reminderActivityId} style={[styles.item, styles.card]} onPress={() => this.openReminderActivity(item)}>

                            <Layout style={styles.innerItem}>
                                <Text category='h5'>{item.reminderName}</Text>
                                <Text category='h6'>{this.reminderTypes[item.reminderType - 1]}</Text>
                            </Layout>

                            <Layout style={styles.row}>
                                <Icon style={[styles.icon, styles.pr,
                                this.props.overdue.findIndex(i => i.reminderActivityId === item.reminderActivityId) > -1 ? styles.danger : null,
                                this.props.upcoming.findIndex(i => i.reminderActivityId === item.reminderActivityId) > -1 ? styles.warning : null,
                                item.completionDate ? styles.success : null
                                ]} name='calendar' pack="feather" />
                                <Text category='s1'>{this.getSpecificDate(item.dueDate)}</Text>


                                <Icon style={[styles.icon, styles.pl, styles.pr,
                                this.props.overdue.findIndex(i => i.reminderActivityId === item.reminderActivityId) > -1 ? styles.danger : null,
                                this.props.upcoming.findIndex(i => i.reminderActivityId === item.reminderActivityId) > -1 ? styles.warning : null,
                                item.completionDate ? styles.success : null]} name='clock' pack="feather" />
                                <Text category='s1'>{this.getTime(item.reminderTime)}</Text>
                            </Layout>
                        </Card>
                    )}
                </ScrollView>

                {this.props.ra.length === 0 &&
                    <Text style={{ flex: 2, alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingLeft: 15, paddingTop: 40, paddingRight: 15 }}
                        category='h5' appearance='hint'>
                        Add new reminders by pressing + icon in Home.
                    </Text>}
            </Layout>
        );
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state: any) => {
    // Redux Store --> Component
    return {
        ra: getHistoryReminders(state),
        upcoming: getUpcomingDashboardActivities(state),
        overdue: getOverdueDashboardActivities(state),
    };
};

// Exports
export default connect(mapStateToProps, null)(History);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: theme['color-basic-200']
    },
    centre: {
        justifyContent: 'center',
        alignItems: 'center'
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
    card: {
        borderColor: theme['color-basic-300'],
        borderRadius: 10
    },
    warning: {
        tintColor: theme["color-warning-500"]
    },
    success: {
        tintColor: theme["color-success-500"]
    },
    danger: {
        tintColor: theme["color-danger-500"]
    }
});
