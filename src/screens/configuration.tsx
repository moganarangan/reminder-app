import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Card, Text, Icon } from '@ui-kitten/components';
import { reminder } from '../model/reminder';
import moment from "moment";
import { default as theme } from '../utilities/theme.json';
import { getConfigReminders, getRemindersCount } from '../selectors';
import { FAB } from 'react-native-paper';
import { styles } from '../utilities/stylesheet';

interface Props {
    navigation: any;
    reminders: Array<reminder>;
    rCount: number;
}

class Configuration extends React.Component<Props> {
    reminderTypes = ['Daily', 'Monthly', 'Yearly', 'Specific Date'];

    openReminder = (r: reminder) => {
        this.props.navigation.navigate('NewReminder', { item: r });
    }

    getTime = (date: Date) => {
        return moment(date).format('LT');
    }

    getSpecificDate = (date: Date) => {
        return moment(date).format('dddd, MMMM Do yyyy');
    }

    getMonthName = (n: number) => {
        return moment(n, 'MM').format('MMMM');
    }

    openNewReminder = () => {
        if (this.props.rCount < 8) {
            this.props.navigation.navigate('NewReminder', null);
        }
    }

    render() {
        return (
            <Layout style={[styles.container, styles.colorT, this.props.reminders.length === 0 ? styles.centre : null]}>

                <View style={styles.title}>
                    <Text category='h3' style={{ fontWeight: '900' }}><Text style={styles.titleR} category='h2'>R</Text>eminders</Text>
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.props.reminders.map((item) =>
                        <Card key={item.reminderId} style={[styles.item, styles.card]}
                            onPress={() => this.openReminder(item)}>

                            <Layout style={[styles.innerItem, styles.colorT]}>
                                <Text category='h5'>{item.reminderName}</Text>
                                <Text category='h6'>{this.reminderTypes[item.reminderType - 1]}</Text>
                            </Layout>

                            <Layout style={[styles.row, styles.colorT]}>
                                {(item.reminderType !== 1) &&
                                    <Icon style={[styles.icon, styles.pr]} name='calendar' pack="feather" />
                                }

                                {(item.reminderType === 2) &&
                                    <>
                                        <Text category='s1'>{item.reminderDay}th</Text>
                                    </>
                                }
                                {(item.reminderType === 3) &&
                                    <>
                                        <Text category='s1'>{this.getMonthName(item.reminderMonth)}</Text>
                                        <Text style={styles.pls} category='s1'>{item.reminderDay}th</Text>
                                    </>
                                }
                                {(item.reminderType === 4) && <Text category='s1'>{this.getSpecificDate(item.dueDate)}</Text>}

                                <Layout style={[styles.row, styles.colorT, item.reminderType !== 1 ? styles.pl : {}]}>
                                    <Icon style={styles.icon} name='clock' pack="feather" />
                                    <Text style={styles.pl} category='s1'>{this.getTime(item.reminderTime)}</Text>
                                </Layout>
                            </Layout>
                        </Card>
                    )}
                </ScrollView>

                {this.props.reminders.length === 0 &&
                    <Text style={{ flex: 2, alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingLeft: 15, paddingTop: 40, paddingRight: 15 }}
                        category='h5' appearance='hint'>
                        Add new reminders by pressing + icon in Home.
                    </Text>}

                {this.props.rCount < 8 &&
                    <FAB style={styles.fab}
                        icon="plus"
                        color="#ffffff"
                        onPress={() => this.openNewReminder()}
                    />}
            </Layout >
        );
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state: any) => {
    // Redux Store --> Component
    return {
        reminders: getConfigReminders(state),
        rCount: getRemindersCount(state)
    };
};

// Exports
export default connect(mapStateToProps, null)(Configuration);
