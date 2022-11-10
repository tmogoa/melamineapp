import React, { useState } from "react";
import { Image, View, SafeAreaView, ScrollView } from "react-native";
import Input from "../components/Input";
import tw from "twrnc";
import Button from "../components/Button";
import logo from "../../assets/adaptive-icon.png";
import TextButton from "../components/TextButton";
import OrText from "../components/OrText";

const Login = ({ navigation }) => {
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
                        label="Password"
                        placeholder="Enter password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button
                        label="Login"
                        onPress={() => navigation.navigate("Home")}
                    />
                    <OrText />
                    <TextButton
                        label="Register"
                        onPress={() => navigation.navigate("Register")}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;
