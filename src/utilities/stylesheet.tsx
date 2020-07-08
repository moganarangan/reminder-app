import { StyleSheet } from 'react-native';
import { default as theme } from '../utilities/theme.json';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: theme['color-basic-200']
    },
    centre: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    fab: {
        position: 'absolute',
        margin: 15,
        right: 5,
        bottom: 5,
        backgroundColor: theme["color-primary-500"]
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
    colorT: {
        backgroundColor: 'transparent'
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
    pb: {
        paddingBottom: 20
    },
    card: {
        borderColor: theme['color-basic-300'],
        borderRadius: 10
    },
    warning: {
        tintColor: theme["color-warning-500"]
    },
    success: {
        tintColor: theme["color-success-500"]
    },
    danger: {
        tintColor: theme["color-danger-500"]
    }
});