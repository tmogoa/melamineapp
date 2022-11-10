import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, Image, Text } from "react-native";
import tw from "twrnc";
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import logo from "../../assets/adaptive-icon.png";
import Button from "../components/Button";
import { fonts } from "../assets/fonts/fonts";
import OrText from "../components/OrText";

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("mogoa.tonny@gmail.com");
    const [password, setPassword] = useState("1234");
    return (
        <SafeAreaView style={tw`flex-1`}>
            <ScrollView style={tw`flex-1`}>
                <View style={tw`p-4 flex-col flex-1 bg-white`}>
                    <View style={tw`flex-col justify-center items-center p-2`}>
                        <Image source={logo} style={tw`w-24 h-24`} />
                    </View>
                    <Input
                        label="Email"
                        placeholder="Enter email address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input
                        label="New password"
                        placeholder="Choose a password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Input
                        label="Confirm password"
                        placeholder="Repeat the password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button
                        label="Register"
                        onPress={() => navigation.navigate("Home")}
                    />
                    <OrText />
                    <TextButton
                        label="Login"
                        onPress={() => navigation.navigate("Login")}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Register;
