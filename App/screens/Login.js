import React, { useState, useContext } from "react";
import { Image, View, SafeAreaView, ScrollView, Alert } from "react-native";
import { AppContext } from "../util/AppContext";
import Input from "../components/Input";
import tw from "twrnc";
import Button from "../components/Button";
import logo from "../../assets/adaptive-icon.png";
import TextButton from "../components/TextButton";
import OrText from "../components/OrText";
import { api } from "../util/api";

const Login = ({ navigation }) => {
    /**
     * This class handles Login
     */
    const { storeUser } = useContext(AppContext);
    const [email, setEmail] = useState("mogoa.tonny@gmail.com");
    const [password, setPassword] = useState("1oooOOOO");
    const [isLoading, setIsLoading] = useState(false);
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
                        onPress={() => login()}
                        isLoading={isLoading}
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

    function login() {
        setIsLoading(true);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = {
            user_email: email,
            user_password: password,
        };

        api.post(`users/login`, body, config)
            .then((resp) => {
                console.log(resp.data);
                storeUser(resp.data, () => {
                    setIsLoading(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Home" }],
                    });
                });
            })
            .catch((err) => {
                console.log(err.response);
                setIsLoading(false);
            });
    }
};

export default Login;
