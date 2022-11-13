import React, { useState, useContext } from "react";
import {
    View,
    SafeAreaView,
    ScrollView,
    Image,
    Text,
    Alert,
} from "react-native";
import tw from "twrnc";
import { AppContext } from "../util/AppContext";
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import logo from "../../assets/adaptive-icon.png";
import Button from "../components/Button";
import { fonts } from "../assets/fonts/fonts";
import OrText from "../components/OrText";
import { api } from "../util/api";

const Register = ({ navigation }) => {
    const { storeUser } = useContext(AppContext);
    const [email, setEmail] = useState("mogoa.tonny@gmail.com");
    const [password, setPassword] = useState("1oooOOOO");
    const [confirmation, setConfirmation] = useState("1oooOOOO");
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
                        value={confirmation}
                        onChangeText={setConfirmation}
                    />
                    <Button
                        label="Register"
                        onPress={() => register()}
                        isLoading={isLoading}
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

    function register() {
        if (!emailIsOk()) {
            Alert.alert("Incorrect email address!", "Please correct it.");
            return;
        }

        if (!passwordIsOk()) {
            return;
        }

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

        api.post(`users/signup`, body, config)
            .then((resp) => {
                storeUser(resp.data, () => {
                    setIsLoading(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Home" }],
                    });
                });
            })
            .catch((err) => {
                const { message } = err.response.data;
                if (message === "EMAIL_TAKEN")
                    Alert.alert(
                        "Registration Failed",
                        "The email address entered is already taken."
                    );
                setIsLoading(false);
            });
    }

    function emailIsOk() {
        const pattern =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    }

    function passwordIsOk() {
        const lowerCaseCheck = /(?=.*[a-z])/;
        const upperCaseCheck = /(?=.*[A-Z])/;
        const numericCheck = /(?=.*[0-9])/;
        const lengthCheck = /(?=.{8,})/;

        if (!passwordsMatch()) {
            Alert.alert(
                "Passwords not matching",
                "Repeated password should match the first password."
            );
            return false;
        }
        if (!lowerCaseCheck.test(password)) {
            Alert.alert(
                "Oops!",
                "Password must contain at least one lowercase letter."
            );

            return false;
        }
        if (!upperCaseCheck.test(password)) {
            Alert.alert(
                "Oops!",
                "Password must contain at least one uppercase letter."
            );

            return false;
        }
        if (!numericCheck.test(password)) {
            Alert.alert("Oops!", "Password must contain at least one number.");

            return false;
        }
        if (!lengthCheck.test(password)) {
            Alert.alert("Oops!", "Password must be at least 8 characters.");

            return false;
        }
        return true;
    }

    function passwordsMatch() {
        return password === confirmation;
    }
};

export default Register;
