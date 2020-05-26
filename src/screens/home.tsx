import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { connect } from 'react-redux';

interface Props {
    navigation: any,
    remindersActivity: Array<any>
}

class Home extends Component<Props> {
    navigation = this.props.navigation;

    openNewItem = () => {
        console.log(this.props);
        this.navigation.navigate('NewItemModal');
    }

    render() {
        return (
            <View style={styles.container}>

                <Text>This is Home.</Text>

                <FAB style={styles.fab}
                    icon="plus"
                    onPress={() => this.openNewItem()}
                />
            </View>
        );
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state: any) => {
    console.log(state);
    // Redux Store --> Component
    return {
        remindersActivity: state.reminderMaster.remindersActivity
    };
};

// Exports
export default connect(mapStateToProps, null)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 5,
        bottom: 5,
    }
});
