import { StyleSheet, Platform, StatusBar } from "react-native";
import { default as theme } from './theme.json';

export default StyleSheet.create({
    SafeArea: {
        flex: 1,
        backgroundColor: theme["color-primary-500"],
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});