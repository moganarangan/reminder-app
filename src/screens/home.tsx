import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { Layout, Text, Card, Icon } from '@ui-kitten/components';
import { reminder } from '../model/reminder';
import { reminderActivity } from '../model/reminderActivity';
import { default as theme } from '../utilities/theme.json';
import moment from "moment";

interface Props {
    navigation: any,
    reminders: Array<reminder>,
    remindersActivity: Array<reminderActivity>
}

interface State {
    today: Array<reminderActivity>;
    upcoming: Array<reminderActivity>;
    overdue: Array<reminderActivity>;
}

class Home extends Component<Props, State> {
    reminderTypes = ['Daily', 'Monthly', 'Yearly', 'Specific Date'];

    componentDidMount() {
        this.splitReminders();
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.remindersActivity.length !== this.props.remindersActivity.length) {
            this.splitReminders();
        }
    }

    openNewReminder = () => {
        if (this.props.reminders && this.props.reminders.length < 8) {
            this.props.navigation.navigate('NewReminder', {});
        }
    }

    splitReminders = () => {
        const t = moment().startOf('day');
        const d = t.day();
        const m = t.month();
        const y = t.year();

        const today = this.props.remindersActivity.filter(i =>
            moment(i.dueDate).month() === m && moment(i.dueDate).day() === d && moment(i.dueDate).year() === y);
        this.setState({ today });

        const upcoming = this.props.remindersActivity.filter(i =>
            moment(i.dueDate).diff(t, 'days') >= 1);
        this.setState({ upcoming });

        const overdue = this.props.remindersActivity.filter(i => i.completionDate === null &&
            moment(i.dueDate).diff(t, 'days') < 0);
        this.setState({ overdue });
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
                    <View>

                        {(this.state && this.state.today.length > 0) && <Text>Today</Text>}

                        {this.state && this.state.today.map((item) =>
                            <Card key={item.reminderActivityId} style={styles.item}>

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
                        {(this.state && this.state.overdue.length > 0) && <Text>Overdue</Text>}
                        {this.state && this.state.overdue.map((item) =>
                            <Card key={item.reminderActivityId} style={styles.item}>

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
                        {(this.state && this.state.upcoming.length > 0) && <Text>Upcoming</Text>}
                        {this.state && this.state.upcoming.map((item) =>
                            <Card key={item.reminderActivityId} style={styles.item}>

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
    }
});
