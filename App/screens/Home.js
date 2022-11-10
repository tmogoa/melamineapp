import React from "react";
import { View, Image, SafeAreaView, Text, ScrollView } from "react-native";
import { colors } from "../assets/colors/colors";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import tw from "twrnc";
import logo from "../../assets/icon.png";
import IconButton from "../components/IconButton";
import { fonts } from "../assets/fonts/fonts";
import TapButton from "../components/TapButton";
import Button from "../components/Button";

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={tw`flex-1`}>
            <ScrollView style={tw`flex-1 flex-col pt-13 px-5`}>
                <View style={tw`flex-row justify-between items-start`}>
                    <IconButton
                        icon={
                            <Ionicons
                                name="ios-menu-outline"
                                size={28}
                                color="black"
                            />
                        }
                    />
                    <Image source={logo} style={tw`w-24 h-24`} />
                    <IconButton
                        icon={
                            <AntDesign name="logout" size={24} color="black" />
                        }
                        onPress={() => navigation.navigate("Login")}
                    />
                </View>
                <View style={tw`flex-col justify-center items-center mt-7`}>
                    <Text
                        style={[
                            {
                                fontFamily: fonts.interRegular,
                            },
                            tw`text-2xl mb-3 text-gray-600`,
                        ]}
                    >
                        Tap to check for,
                    </Text>
                    <Text
                        style={[
                            {
                                fontFamily: fonts.interSemibold,
                            },
                            tw`text-5xl underline`,
                        ]}
                    >
                        Melanoma.
                    </Text>
                    <View style={tw`mt-6 flex-col items-center`}>
                        <TapButton
                            onPress={() => navigation.navigate("TakePhoto")}
                            sizingPadding={8}
                            icon={
                                <FontAwesome
                                    name="camera"
                                    size={36}
                                    color={colors.white}
                                />
                            }
                        />
                        <Text
                            style={[
                                tw`text-sm mt-2 text-gray-600`,
                                { fontFamily: fonts.interMedium },
                            ]}
                        >
                            OR
                        </Text>
                    </View>
                    <View style={tw`w-full p-2`}>
                        <Button label="Select image" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
