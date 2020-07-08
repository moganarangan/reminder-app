import React, { Component } from 'react';
import { StyleSheet, Keyboard, View, Alert } from 'react-native';
import ReminderHandler from "../handlers/reminderHandler";
import {
    Input, Text, Select, SelectItem, Datepicker, Icon,
    Button, Layout, Divider, TopNavigation, TopNavigationAction, Toggle
} from '@ui-kitten/components';
import Timepicker from '../utilities/time-picker.component';
import { ScrollView } from 'react-native-gesture-handler';
import getRandom from '../utilities/random';
import { reminder } from '../model/reminder';
import moment from "moment";
import { default as theme } from '../utilities/theme.json';
import { getReminders } from '../selectors';

import { YellowBox } from 'react-native';
import { connect } from 'react-redux';

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
]);

interface Props {
    navigation: any;
    route: any;
    allReminders: Array<reminder>;
}

interface State {
    reminderV: reminder;
    reminderTypes: Array<any>;
    months: Array<any>;
    days: Array<number>;
    nameCaption: string;
    nameStatus: string;
    timeCaption: string;
    timeStatus: string;
    monthlyDays: Array<number>;
    insertMode: boolean;
}

const BackIcon = (props: any) => (
    <Icon {...props} name='arrow-back' pack="material" />
);

const EditIcon = (props: any) => (
    <Icon {...props} style={[styles.icon]} name='edit' pack="material" />
);

const CancelIcon = (props: any) => (
    <Icon {...props} style={[styles.icon]} name='cancel' pack="material" />
);

const DeleteIcon = (props: any) => (
    <Icon {...props} style={[styles.icon, styles.danger]} name='delete-outline' pack="materialCommunity" />
);

class NewReminder extends Component<Props, State> {
    _isMounted = false;
    title: string = '';

    constructor(props: Props) {
        super(props);

        let item = null;
        if (this.props.route.params && this.props.route.params.item) {
            item = this.props.route.params.item;
        }

        if (item) {
            this.title = 'Edit Reminder';
            this.loadReminder(item);
        }
        else {
            this.title = 'Add Reminder';
            this.generateReminder();
        }
    }

    loadReminder = (item: reminder) => {
        const d = moment(item.dueDate);
        const count = d.daysInMonth();
        const days = Array.from(Array(count).keys(), (_, i) => i + 1);

        item.dueDate = d.toDate();
        item.reminderTime = moment(item.reminderTime).toDate();

        this.state = {
            reminderV: item,
            reminderTypes: [{ store: 1, value: 'Daily' }, { store: 2, value: 'Monthly' }, { store: 3, value: 'Yearly' }, { store: 4, value: 'Specific Date' }],
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
            monthlyDays: Array.from(Array(20).keys(), (_, i) => i + 1),
            nameCaption: '',
            nameStatus: 'basic',
            timeCaption: '',
            timeStatus: 'basic',
            insertMode: false
        }
    }

    generateReminder = () => {
        const d = moment().startOf('day');
        d.set({
            hour: 6,
            minute: 0,
            second: 0,
            millisecond: 0
        });
        const count = d.daysInMonth();
        const days = Array.from(Array(count).keys(), (_, i) => i + 1);

        this.state = {
            reminderV: {
                reminderId: '',
                reminderName: '',
                reminderType: 1,
                reminderMonth: 1,
                reminderDay: 1,
                dueDate: d.toDate(),
                reminderTime: d.toDate(),
                notes: '',
                active: true,
                color: '',
                last_updated: d.toDate()
            },
            reminderTypes: [{ store: 1, value: 'Daily' }, { store: 2, value: 'Monthly' }, { store: 3, value: 'Yearly' }, { store: 4, value: 'Specific Date' }],
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
            monthlyDays: Array.from(Array(20).keys(), (_, i) => i + 1),
            nameCaption: '',
            nameStatus: 'basic',
            timeCaption: '',
            timeStatus: 'basic',
            insertMode: true
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    populateDays = (month: number) => {
        const d = moment();
        const count = d.daysInMonth();
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

        this.validate(name);
    }

    setNotes = (notes: string) => {
        this.setState(prevState => ({
            reminderV: {
                ...prevState.reminderV,
                notes
            }
        }));
    }

    setTime = (value: Date) => {
        value.setSeconds(0, 0);
        this.setState(prevState => ({
            reminderV: {
                ...prevState.reminderV,
                reminderTime: value
            }
        }), () => {
            this.isValidTimeSpecific();
        });
    }

    setReminderDay = (item: any) => {
        this.setState(prevState => ({
            reminderV: {
                ...prevState.reminderV,
                reminderDay: this.state.days[item.row]
            }
        }));
    }

    setMonthlyReminderDay = (item: any) => {
        this.setState(prevState => ({
            reminderV: {
                ...prevState.reminderV,
                reminderDay: this.state.days[item.row]
            }
        }));
    }

    onActiveChange = (active: boolean) => {
        this.setState(prevState => ({
            reminderV: {
                ...prevState.reminderV,
                active: active
            }
        }));
    }

    saveReminder = async () => {
        if (this.validate(this.state.reminderV.reminderName)) {
            if (this.isDuplicate(this.state.reminderV.reminderName, this.state.reminderV.reminderId) ||
                !this.isValidTimeSpecific()) {
                return;
            }
            else {
                if (this.state.insertMode && !this.state.reminderV.reminderId) {
                    this.state.reminderV.reminderId = getRandom();
                    this.state.reminderV.last_updated = moment().toDate();
                    ReminderHandler.addReminder(this.state.reminderV);
                } else {
                    this.state.reminderV.last_updated = moment().toDate();
                    ReminderHandler.saveReminder(this.state.reminderV);
                }
            }
            this.goBack();
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    validate = (name: string) => {
        if (!name) {
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

    isDuplicate = (name: string, id: string): boolean => {
        const isExist = this.props.allReminders.filter(i => (
            i.reminderName.toLowerCase() === name.toLowerCase()
            && i.reminderId.toLowerCase() !== id.toLowerCase()));

        if (isExist && isExist.length > 0) {
            this.setState({
                nameStatus: 'danger',
                nameCaption: 'Reminder name already exist'
            });

            return true;
        }

        this.setState({
            nameStatus: 'basic',
            nameCaption: ''
        });
        return false;
    }

    isValidTimeSpecific = (): boolean => {
        if (this.state.reminderV.reminderType === 4) {
            const now = moment();
            const dueDate = moment(this.state.reminderV.dueDate);
            const d = moment(this.state.reminderV.reminderTime);
            const h = d.hour();
            const m = d.minute();
            dueDate.set({
                hour: h,
                minute: m,
                second: 0,
                millisecond: 0
            });
            const diffMins = dueDate.diff(now, 'minutes');

            if (diffMins <= 0) {
                this.setState({
                    timeStatus: 'danger',
                    timeCaption: 'Set future time'
                });
                return false;
            } else {
                this.setState({
                    timeStatus: 'basic',
                    timeCaption: ''
                });
                return true;
            }
        }

        return true;
    }

    dismissKeyboard = () => {
        Keyboard.dismiss();
    }

    edit = () => {
        this.setState(prevState => ({
            ...prevState,
            insertMode: !prevState.insertMode
        }));
    }

    backAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={this.goBack} />
    );

    confirmDelete = () => Alert.alert(
        "",
        "Are you sure want to delete reminder.",
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            { text: "OK", onPress: () => this.delete() }
        ],
        { cancelable: false }
    );

    delete = () => {
        ReminderHandler.deleteReminder(this.state.reminderV);
        this.goBack();
    }

    editAction = () => (
        <React.Fragment>
            < TopNavigationAction icon={DeleteIcon} onPress={this.confirmDelete} style={styles.pr} />

            {this.state.insertMode ?
                < TopNavigationAction icon={CancelIcon} onPress={this.edit} style={styles.pr} />
                :
                <TopNavigationAction icon={EditIcon} onPress={this.edit} style={styles.pr} />
            }
        </React.Fragment>
    );

    empty = () => (
        <></>
    );

    render() {
        return (
            <React.Fragment>
                <TopNavigation
                    title={evaProps => <Text {...evaProps} style={styles.headerTitle}> {this.title} </Text>}
                    accessoryLeft={this.backAction}
                    accessoryRight={this.state.reminderV.reminderId ? this.editAction : this.empty}
                    style={styles.header} />
                <Divider />

                <Layout style={styles.reminderContainer}>
                    <ScrollView>

                        {(this.state.reminderV.reminderId !== '' && this.state.reminderV.reminderId !== null) &&
                            <View style={[styles.row, styles.item]}>
                                <Text appearance='hint' category='label'
                                    style={[styles.pt, styles.label, !this.state.insertMode ? styles.labelDisabled : null]}>
                                    {this.state.reminderV.active ? 'Active' : 'In-Active'}
                                </Text>
                                <Toggle
                                    checked={this.state.reminderV.active}
                                    disabled={!this.state.insertMode}
                                    onChange={this.onActiveChange} />
                            </View>}

                        <Input
                            label={evaProps => <Text {...evaProps}
                                style={[styles.pb, styles.label, !this.state.insertMode ? styles.labelDisabled : null]}>Reminder Name</Text>}
                            onChangeText={this.setName}
                            style={styles.item}
                            value={this.state.reminderV.reminderName}
                            status={this.state.nameStatus}
                            caption={this.state.nameCaption}
                            disabled={!this.state.insertMode}
                            maxLength={20}
                        />

                        <Select
                            label={evaProps => <Text {...evaProps}
                                style={[styles.pb, styles.label, !this.state.insertMode ? styles.labelDisabled : null]}>Reminder Type</Text>}
                            value={this.state.reminderTypes[this.state.reminderTypes.findIndex(i => i.store === this.state.reminderV.reminderType)].value}
                            onSelect={this.setReminderType}
                            onFocus={this.dismissKeyboard}
                            disabled={!this.state.insertMode}
                            style={styles.item}>
                            {this.state.reminderTypes.map((item) => <SelectItem key={item.store} title={evaProps => <Text {...evaProps}>{item.value}</Text>} />)}
                        </Select>

                        {(this.state.reminderV.reminderType === 3) &&
                            <Select
                                label={evaProps => <Text {...evaProps}
                                    style={[styles.pb, styles.label, !this.state.insertMode ? styles.labelDisabled : null]}>Reminder Month</Text>}
                                value={this.state.months[this.state.months.findIndex(i => i.store === this.state.reminderV.reminderMonth)].value}
                                onSelect={this.setReminderMonth}
                                onFocus={this.dismissKeyboard}
                                disabled={!this.state.insertMode}
                                style={styles.item}>
                                {this.state.months.map((item) => <SelectItem key={item.store} title={evaProps => <Text {...evaProps}>{item.value}</Text>} />)}
                            </Select>
                        }

                        {(this.state.reminderV.reminderType === 3) &&
                            <Select
                                label={evaProps => <Text {...evaProps}
                                    style={[styles.pb, styles.label, !this.state.insertMode ? styles.labelDisabled : null]}>Reminder Day</Text>}
                                value={this.state.reminderV.reminderDay}
                                onSelect={this.setReminderDay}
                                onFocus={this.dismissKeyboard}
                                disabled={!this.state.insertMode}
                                style={styles.item}>
                                {this.state.days.map((item) => <SelectItem key={item} title={evaProps => <Text {...evaProps}>{item}</Text>} />)}
                            </Select>
                        }

                        {(this.state.reminderV.reminderType === 2) &&
                            <Select
                                label={evaProps => <Text {...evaProps}
                                    style={[styles.pb, styles.label, !this.state.insertMode ? styles.labelDisabled : null]}>Reminder Day</Text>}
                                value={this.state.reminderV.reminderDay}
                                onSelect={this.setMonthlyReminderDay}
                                onFocus={this.dismissKeyboard}
                                disabled={!this.state.insertMode}
                                style={styles.item}>
                                {this.state.monthlyDays.map((item) => <SelectItem key={item} title={evaProps => <Text {...evaProps}>{item}</Text>} />)}
                            </Select>
                        }

                        {(this.state.reminderV.reminderType === 4) &&
                            <Datepicker
                                label={evaProps => <Text {...evaProps}
                                    style={[styles.pb, styles.label, !this.state.insertMode ? styles.labelDisabled : null]}>Due Date</Text>}
                                date={this.state.reminderV.dueDate}
                                onSelect={this.onReminderDateChange}
                                onFocus={this.dismissKeyboard}
                                disabled={!this.state.insertMode}
                                style={styles.item}
                                min={moment().toDate()}
                                accessoryRight={(props) => <Icon {...props} name='calendar' pack="feather" />}
                            />
                        }

                        <Timepicker
                            label={evaProps => <Text {...evaProps}
                                style={[styles.pb, styles.label, !this.state.insertMode ? styles.labelDisabled : null]}>Reminder Time</Text>}
                            date={this.state.reminderV.reminderTime}
                            onFocus={this.dismissKeyboard}
                            style={styles.item}
                            disabled={!this.state.insertMode}
                            status={this.state.timeStatus}
                            caption={this.state.timeCaption}
                            accessoryRight={(props) => <Icon {...props} name='clock' pack="feather" />}
                            onSelect={this.setTime} />

                        <Input
                            multiline={true}
                            disabled={!this.state.insertMode}
                            textStyle={{ minHeight: 90 }}
                            label={evaProps => <Text {...evaProps}
                                style={[styles.pb, styles.label, !this.state.insertMode ? styles.labelDisabled : null]}>Notes</Text>}
                            onChangeText={this.setNotes}
                            value={this.state.reminderV.notes}
                            style={styles.item}
                            maxLength={150}
                        />

                        {(this.state.insertMode) &&
                            <Button onPress={() => this.saveReminder()}>
                                {evaProps => <Text {...evaProps}>Save</Text>}
                            </Button>
                        }
                    </ScrollView>
                </Layout>

            </React.Fragment>
        )
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state: any) => {
    console.log('Home map state', state);
    // Redux Store --> Component
    return {
        allReminders: getReminders(state)
    };
};

// Exports
export default connect(mapStateToProps, null)(NewReminder);

const styles = StyleSheet.create({
    reminderContainer: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30
    },
    item: {
        paddingBottom: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pt: {
        paddingTop: 8
    },
    label: {
        fontSize: theme['text-label-font-size'],
        fontWeight: theme["text-label-font-weight"],
        color: theme['color-basic-600'],
    },
    labelDisabled: {
        color: theme["color-basic-transparent-600"]
    },
    pr: {
        paddingRight: 10
    },
    pb: {
        paddingBottom: 4
    },
    icon: {
        fontSize: 25
    },
    danger: {
        tintColor: theme["color-danger-500"]
    },
    warning: {
        tintColor: theme["color-warning-500"]
    },
    header: {
        backgroundColor: theme["color-primary-500"]
    },
    headerTitle: {
        fontSize: 18
    }
});
