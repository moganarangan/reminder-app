import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Props {
    navigation: any
}

class Home extends Component<Props> {
    navigation = this.props.navigation;

    openNewItem = () => {
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

// Wrap and export
export default function (props: any) {
    const navigation = useNavigation();

    return <Home {...props} navigation={navigation} />;
}

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
