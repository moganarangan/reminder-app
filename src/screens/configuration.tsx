import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';

interface Props {
    navigation: any,
    reminders: Array<any>
}

class Configuration extends React.Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text>This is Configuration.</Text>
            </View>

        );
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state: any) => {
    // Redux Store --> Component
    return {
        reminders: state.reminders
    };
};

// Exports
export default connect(mapStateToProps, null)(Configuration);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
