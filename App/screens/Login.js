import React, { useState } from "react";
import { Text, View } from "react-native";
import Input from "../components/Input";
import tw from "twrnc";

const Login = () => {
    const [email, setEmail] = useState("mogoa.tonny@gmail.com");
    const [password, setPassword] = useState("1234");
    return (
        <View style={tw`p-4 flex-col flex-1 bg-white`}>
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
        </View>
    );
};

export default Login;
