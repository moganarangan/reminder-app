import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { newReminderSave } from '../store/actions/reminderAction';

interface Props {
    state: any,
    reduxNewReminder: Function
}

class NewItem extends Component<Props> {
    state = {
        reminderName: '',
        reminderType: '',
        reminderMonth: '',
        reminderDay: '',
        reminderTime: '',
        notes: '',
        active: ''
    }

    saveReminder = () => {
        console.log(this.state);
        this.props.reduxNewReminder(this.state);
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

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch: any) => {
    // Action
    return {
        // Save New Reminder Counter
        reduxNewReminder: (newReminder: any) => dispatch(newReminderSave(newReminder)),
    };
};

// Exports
export default connect(null, mapDispatchToProps)(NewItem);

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
