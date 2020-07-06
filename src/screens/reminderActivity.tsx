import React, { Component } from 'react';
import { StyleSheet, Keyboard, View } from 'react-native';
import ReminderHandler from "../handlers/reminderHandler";
import {
    Input, Text, Datepicker, Icon,
    Button, Layout, Divider, TopNavigation, TopNavigationAction
} from '@ui-kitten/components';
import Timepicker from '../utilities/time-picker.component';
import { ScrollView } from 'react-native-gesture-handler';
import { Spinner } from '@ui-kitten/components';
import moment from "moment";
import { reminderActivity } from '../model/reminderActivity';
import { default as theme } from '../utilities/theme.json';

interface Props {
    navigation: any,
    route: any
}

interface State {
    reminderA: reminderActivity,
    completionDateCaption: string,
    completionDateStatus: string,
}

const BackIcon = (props: any) => (
    <Icon {...props} name='arrow-back' pack="material" />
);

export default class ReminderActivity extends Component<Props, State> {
    reminderTypes = ['Daily', 'Monthly', 'Yearly', 'Specific Date'];
    _isMounted = false;
    title: string = 'Reminder Activity';
    edit: boolean = false;

    constructor(props: Props) {
        super(props);

        const { item } = this.props.route.params;
        this.loadReminderActivity(item);
    }

    loadReminderActivity = (item: reminderActivity) => {
        if (item.completionDate === undefined || item.completionDate == null) {
            this.edit = true;
            item.completionDate = undefined;
        } else {
            const d = moment(item.completionDate);
            item.completionDate = d.toDate();
        }

        this.state = {
            reminderA: item,
            completionDateCaption: '',
            completionDateStatus: 'basic'
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    saveReminderActivity = async () => {
        if (this.validate(this.state.reminderA.completionDate)) {
            ReminderHandler.saveReminderActivity(this.state.reminderA);
            this.goBack();
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    dismissKeyboard = () => {
        Keyboard.dismiss();
    }

    onCompletionDateChange = (date: Date) => {
        this.setState(prevState => ({
            reminderA: {
                ...prevState.reminderA,
                completionDate: date
            }
        }), () => this.validate(this.state.reminderA.completionDate));
    }

    setNotes = (notes: string) => {
        this.setState(prevState => ({
            reminderA: {
                ...prevState.reminderA,
                notes
            }
        }));
    }

    validate = (date: Date | undefined) => {
        if (!date || date === null || date === undefined) {
            this.setState({
                completionDateStatus: 'danger',
                completionDateCaption: 'Completion date is required'
            });

            return false;
        } else {
            this.setState({
                completionDateStatus: 'basic',
                completionDateCaption: ''
            });

            return true;
        }
    }

    getTime = (date: Date) => {
        return moment(date).format('LT');
    }

    getSpecificDate = (date: Date) => {
        return moment(date).format('dddd, MMMM Do yyyy');
    }

    backAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={this.goBack} />
    );

    render() {
        return (
            <React.Fragment>
                <TopNavigation
                    title={evaProps => <Text {...evaProps} style={styles.headerTitle}> {this.title} </Text>}
                    accessoryLeft={this.backAction}
                    style={styles.header}
                />
                <Divider />

                <Layout style={styles.reminderContainer}>
                    <ScrollView>

                        <View style={styles.title}>
                            <Text style={[styles.name]} category='h4'>{this.state.reminderA.reminderName}</Text>
                        </View>

                        <Layout style={[styles.row, styles.item]}>
                            <Icon style={[styles.icon, styles.pr]} name='refresh-ccw' pack="feather" />
                            <Text category='s1'>{this.reminderTypes[this.state.reminderA.reminderType - 1]}</Text>
                        </Layout>

                        <Layout style={[styles.row, styles.item, styles.pb]}>
                            <Icon style={[styles.icon, styles.pr]} name='calendar' pack="feather" />
                            <Text category='s1'>{this.getSpecificDate(this.state.reminderA.dueDate)}</Text>

                            <Icon style={[styles.icon, styles.pl, styles.pr]} name='clock' pack="feather" />
                            <Text category='s1'>{this.getTime(this.state.reminderA.dueDate)}</Text>
                        </Layout>

                        <Datepicker
                            label={evaProps => <Text {...evaProps}>Completion Date</Text>}
                            date={this.state.reminderA.completionDate}
                            onSelect={this.onCompletionDateChange}
                            onFocus={this.dismissKeyboard}
                            disabled={!this.edit}
                            style={styles.item}
                            status={this.state.completionDateStatus}
                            caption={this.state.completionDateCaption}
                            accessoryRight={(props) => <Icon {...props} name='calendar' pack="feather" />}
                        />

                        <Input
                            multiline={true}
                            disabled={!this.edit}
                            textStyle={{ minHeight: 64 }}
                            label={evaProps => <Text {...evaProps}>Notes</Text>}
                            onChangeText={this.setNotes}
                            value={this.state.reminderA.notes}
                            style={styles.item} />

                        {(this.edit) &&
                            <Button onPress={() => this.saveReminderActivity()}>
                                {evaProps => <Text {...evaProps}>Mark Completed</Text>}
                            </Button>
                        }
                    </ScrollView>
                </Layout>

            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    reminderContainer: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30
    },
    name: {
        paddingBottom: 15,
    },
    item: {
        paddingBottom: 15,
    },
    row: {
        flexDirection: 'row'
    },
    icon: {
        fontSize: 18,
        tintColor: theme["color-primary-500"]
    },
    pr: {
        paddingRight: 10
    },
    pl: {
        paddingLeft: 10
    },
    pb: {
        paddingBottom: 30
    },
    title: {
        alignItems: "center"
    },
    header: {
        backgroundColor: theme["color-primary-500"]
    },
    headerTitle: {
        fontSize: 18
    }
});
