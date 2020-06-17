import React, { Component } from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import ReminderHandler from "../handlers/reminderHandler";
import { reminder } from '../model/reminderMasterModel';
import { Input, Text, Select, SelectItem, Datepicker, Icon, Button, Layout } from '@ui-kitten/components';
import Timepicker from '../utilities/time-picker.component';
import { ScrollView } from 'react-native-gesture-handler';
import { Spinner } from '@ui-kitten/components';

interface Props {
    navigation: any,
    route: any
}

interface State {
    reminderV: reminder,
    loading: boolean,
    reminderTypes: Array<any>,
    months: Array<any>,
    days: Array<number>,
    nameCaption: string,
    nameStatus: string
}

export default class NewReminder extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const { itemId } = this.props.route.params;
        if (itemId) {
            this.props.navigation.setOptions({ title: 'Edit Reminder' });
        }
        else {
            this.props.navigation.setOptions({ title: 'Add Reminder' });
        }

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var date = new Date();
        var year = date.getFullYear();
        const count = new Date(year, 1, 0).getDate();
        const days = Array.from(Array(count).keys(), (_, i) => i + 1);

        this.state = {
            reminderV: {
                reminderId: '',
                reminderName: '',
                reminderType: 1,
                reminderMonth: 1,
                reminderDay: 1,
                dueDate: tomorrow,
                reminderTime: tomorrow,
                notes: '',
                active: true,
                isSync: false
            },
            loading: true,
            reminderTypes: [{ store: 1, value: 'Daily' }, { store: 2, value: 'Monthly' }, { store: 3, value: 'Specific Date' }],
            months: [{ store: 1, value: 'January' }
                , { store: 2, value: 'February' }
                , { store: 3, value: 'March' }
                , { store: 4, value: 'April' }
                , { store: 5, value: 'May' }
                , { store: 6, value: 'June' }
                , { store: 7, value: 'July' }
                , { store: 8, value: 'August' }
                , { store: 9, value: 'September' }
                , { store: 10, value: 'October' }
                , { store: 11, value: 'November' }
                , { store: 12, value: 'December' }],
            days: days,
            nameCaption: '',
            nameStatus: 'basic'
        }
    }

    populateDays = (month: number) => {
        var date = new Date();
        var year = date.getFullYear();
        const count = new Date(year, month, 0).getDate();
        const days = Array.from(Array(count).keys(), (_, i) => i + 1);

        this.setState({ days });
    }

    onReminderDateChange = (date: Date) => {
        this.setState(prevState => ({
            reminderV: {
                ...prevState.reminderV,
                dueDate: date
            }
        }));
    }

    setReminderType = (item: any) => {
        this.setState(prevState => ({
            reminderV: {
                ...prevState.reminderV,
                reminderType: this.state.reminderTypes[item.row].store
            }
        }));
    }

    setReminderMonth = (item: any) => {
        this.setState(prevState => ({
            reminderV: {
                ...prevState.reminderV,
                reminderMonth: this.state.months[item.row].store
            }
        }));

        this.populateDays(this.state.months[item.row].store);
    }

    setName = (name: string) => {
        this.setState(prevState => ({
            reminderV: {
                ...prevState.reminderV,
                reminderName: name
            }
        }));

        this.validate();
    }

    setTime = (value: Date) => {
        value.setSeconds(0, 0);
        this.setState(prevState => ({
            reminderV: {
                ...prevState.reminderV,
                reminderTime: value
            }
        }));
    }

    setReminderDay = (item: any) => {
        this.setState(prevState => ({
            reminderV: {
                ...prevState.reminderV,
                reminderDay: this.state.days[item.row]
            }
        }));
    }

    saveReminder = () => {
        if (this.validate()) {
            ReminderHandler.addReminder(this.state.reminderV);
            this.props.navigation.goBack();
        }
    }

    validate = () => {
        if (!this.state.reminderV.reminderName) {
            this.setState({
                nameStatus: 'danger',
                nameCaption: 'Reminder name is required'
            });
            return false;
        } else {
            this.setState({
                nameStatus: 'basic',
                nameCaption: ''
            });
            return true;
        }
    }

    dismissKeyboard = () => {
        Keyboard.dismiss();
    }

    render() {

        // if (this.state.loading) {
        //     return (
        //         <Layout style={styles.loading} level='1'>
        //             <Spinner size='giant' status='info' />
        //         </Layout>
        //     )
        // } else {
        return (
            <ScrollView>
                <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
                    <Layout style={styles.reminderContainer}>
                        <Input
                            label={evaProps => <Text {...evaProps}>Reminder name</Text>}
                            onChangeText={this.setName}
                            style={styles.item}
                            {...this.state.reminderV.reminderName}
                            status={this.state.nameStatus}
                            caption={this.state.nameCaption}
                        />

                        <Select
                            label={evaProps => <Text {...evaProps}>Reminder Type</Text>}
                            value={this.state.reminderTypes[this.state.reminderTypes.findIndex(i => i.store === this.state.reminderV.reminderType)].value}
                            onSelect={this.setReminderType}
                            onFocus={this.dismissKeyboard}
                            style={styles.item}>
                            {this.state.reminderTypes.map((item) => <SelectItem key={item.store} title={evaProps => <Text {...evaProps}>{item.value}</Text>} />)}
                        </Select>

                        {(this.state.reminderV.reminderType === 2) &&
                            <Select
                                label={evaProps => <Text {...evaProps}>Reminder Month</Text>}
                                value={this.state.months[this.state.months.findIndex(i => i.store === this.state.reminderV.reminderMonth)].value}
                                onSelect={this.setReminderMonth}
                                onFocus={this.dismissKeyboard}
                                style={styles.item}>
                                {this.state.months.map((item) => <SelectItem key={item.store} title={evaProps => <Text {...evaProps}>{item.value}</Text>} />)}
                            </Select>
                        }

                        {(this.state.reminderV.reminderType === 2) &&
                            <Select
                                label={evaProps => <Text {...evaProps}>Reminder Day</Text>}
                                value={this.state.reminderV.reminderDay}
                                onSelect={this.setReminderDay}
                                onFocus={this.dismissKeyboard}
                                style={styles.item}>
                                {this.state.days.map((item) => <SelectItem key={item} title={evaProps => <Text {...evaProps}>{item}</Text>} />)}
                            </Select>
                        }

                        {(this.state.reminderV.reminderType === 3) &&
                            <Datepicker
                                label={evaProps => <Text {...evaProps}>Due Date</Text>}
                                date={this.state.reminderV.dueDate}
                                onSelect={this.onReminderDateChange}
                                onFocus={this.dismissKeyboard}
                                style={styles.item}
                                accessoryRight={(props) => <Icon {...props} name='calendar' />}
                            />
                        }

                        <Timepicker
                            label={evaProps => <Text {...evaProps}>Reminder Time</Text>}
                            date={this.state.reminderV.reminderTime}
                            onFocus={this.dismissKeyboard}
                            style={styles.item}
                            accessoryRight={(props) => <Icon {...props} name='clock' />}
                            onSelect={this.setTime} />

                        <Input
                            multiline={true}
                            textStyle={{ minHeight: 64 }}
                            label={evaProps => <Text {...evaProps}>Notes</Text>}
                            onChangeText={this.setName}
                            {...this.state.reminderV.reminderName}
                            style={styles.item} />

                        <Button onPress={() => this.saveReminder()}>
                            {evaProps => <Text {...evaProps}>Save</Text>}
                        </Button>
                    </Layout>
                </TouchableWithoutFeedback>
            </ScrollView>
        )
        // }
    }
}

const styles = StyleSheet.create({
    reminderContainer: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        flexDirection: "column"
    },
    item: {
        paddingBottom: 15
    },
    loading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});
