import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Card, Text, Icon } from '@ui-kitten/components';
import { reminder } from '../model/reminder';
import moment from "moment";
import { default as theme } from '../utilities/theme.json';
import { getConfigReminders } from '../selectors';

interface Props {
    navigation: any,
    reminders: Array<reminder>
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

    render() {
        return (
            <Layout style={styles.container}>

                <View style={styles.title}>
                    <Text category='h3'><Text style={styles.titleR} category='h3'>R</Text>eminders</Text>
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.props.reminders.map((item) =>
                        <Card key={item.reminderId} style={[styles.item, styles.card]} onPress={() => this.openReminder(item)}>

                            <Layout style={styles.innerItem}>
                                <Text category='h5'>{item.reminderName}</Text>
                                <Text category='h6'>{this.reminderTypes[item.reminderType - 1]}</Text>
                            </Layout>

                            <Layout style={styles.row}>
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

                                <Layout style={[styles.row, item.reminderType !== 1 ? styles.pl : {}]}>
                                    <Icon style={styles.icon} name='clock' pack="feather" />
                                    <Text style={styles.pl} category='s1'>{this.getTime(item.reminderTime)}</Text>
                                </Layout>
                            </Layout>
                        </Card>
                    )}
                </ScrollView>
            </Layout >
        );
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state: any) => {
    // Redux Store --> Component
    return {
        reminders: getConfigReminders(state)
    };
};

// Exports
export default connect(mapStateToProps, null)(Configuration);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: theme['color-basic-200']
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
    }
});
