import React from "react";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "./assets/colors/colors";
import {
    useFonts,
    Inter_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import tw from "twrnc";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";

const Stack = createNativeStackNavigator();
export default function App() {
    let [fontLoaded] = useFonts({
        Inter_500Medium,
        Inter_400Regular,
        Inter_600SemiBold,
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <StatusBar style="light" backgroundColor={colors.primary} />
            <Stack.Navigator
                initialRouteName="Login"
                // screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerTitle: (props) => (
                            <>
                                <Text
                                    style={[
                                        {
                                            fontFamily: "Inter_400Regular",
                                        },
                                        tw`text-base`,
                                    ]}
                                >
                                    Home
                                </Text>
                            </>
                        ),
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerTitle: (props) => (
                            <>
                                <Text
                                    style={[
                                        {
                                            fontFamily: "Inter_400Regular",
                                        },
                                        tw`text-base`,
                                    ]}
                                >
                                    Login
                                </Text>
                            </>
                        ),
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerTitle: (props) => (
                            <>
                                <Text
                                    style={[
                                        {
                                            fontFamily: "Inter_400Regular",
                                        },
                                        tw`text-base`,
                                    ]}
                                >
                                    Register
                                </Text>
                            </>
                        ),
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
