import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import ReminderHandler from "../handlers/reminderHandler";
import { reminder } from '../model/reminderMasterModel';

interface Props {
    navigation: any,
    state: reminder
}

export default class NewReminder extends Component<Props> {
    navigation = this.props.navigation;

    state: reminder = {
        reminderId: '',
        reminderName: '',
        reminderType: '',
        reminderMonth: -1,
        reminderDay: -1,
        dueDate: undefined,
        reminderTime: '',
        notes: '',
        active: true,
        isSync: false
    }

    saveReminder = () => {
        ReminderHandler.addReminder(this.state);
        this.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.newremindercontainer}>
                <TextInput
                    style={styles.item}
                    label='Reminder name'
                    mode='outlined'
                    value={this.state.reminderName}
                    onChangeText={text => this.setState({ reminderName: text })}
                />
                <Button
                    style={styles.item}
                    mode="contained"
                    onPress={() => this.saveReminder()} >
                    Save
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    newremindercontainer: {
        padding: 20,
        flex: 1,
        flexDirection: "column"
    },
    item: {
        padding: 10
    },
});
