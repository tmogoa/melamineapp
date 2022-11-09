import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../assets/colors/colors";
const Home = () => {
    return (
        <View style={styles.container}>
            <Text>Sup</Text>
            <StatusBar style="light" backgroundColor={colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Home;
