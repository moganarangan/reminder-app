import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const NewItem = (props: any) => {

    return (
        <View style={styles.newremindercontainer}>
            <TextInput
                label='Reminder name'
                mode='outlined'
            />
        </View>
    )
}

export default NewItem;

const styles = StyleSheet.create({
    newremindercontainer: {
        padding: 20
    }
});
