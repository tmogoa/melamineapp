import React from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { fonts } from "../assets/fonts/fonts";
import { Feather, AntDesign } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";
import Button from "../components/Button";

const ResultScreen = ({ route, navigation }) => {
    /**
     * This screen receives the inference results and displays them
     */
    const { uri, predClass, predConf, backIsHome } = route.params;
    return (
        <SafeAreaView style={tw`flex-1`}>
            <ScrollView style={tw`flex-1 pt-13 px-5`}>
                <View style={tw`flex-col flex-1 pb-15`}>
                    <TouchableOpacity
                        style={tw`mb-5`}
                        onPress={() => {
                            if (backIsHome) navigation.navigate("Home");
                            else navigation.goBack();
                        }}
                    >
                        <AntDesign
                            name="arrowleft"
                            size={24}
                            style={tw`text-gray-600`}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            tw`text-3xl text-gray-600 mb-4`,
                            { fontFamily: fonts.interSemibold },
                        ]}
                    >
                        Prediction
                    </Text>
                    {predClass === 0 ? (
                        <View style={tw`p-2 rounded flex-row items-center`}>
                            <AntDesign
                                name="warning"
                                size={24}
                                color={colors.danger}
                            />
                            <Text
                                style={[
                                    {
                                        fontFamily: fonts.interMedium,
                                        color: colors.danger,
                                    },
                                    tw`ml-4`,
                                ]}
                            >
                                {predConf}% likely to be Melanoma
                            </Text>
                        </View>
                    ) : (
                        <View style={tw`p-2 rounded flex-row items-center`}>
                            <Feather
                                name="check"
                                size={24}
                                color={colors.success}
                            />
                            <Text
                                style={[
                                    {
                                        fontFamily: fonts.interMedium,
                                        color: colors.success,
                                    },
                                    tw`ml-4`,
                                ]}
                            >
                                {predConf}% unlikely to be Melanoma
                            </Text>
                        </View>
                    )}
                    <View style={tw`w-full h-68 mt-2 rounded p-2`}>
                        <Image
                            source={{
                                uri: uri,
                            }}
                            style={tw`flex-1`}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={tw`w-full p-2`}>
                        <Button
                            label="Done"
                            onPress={() => {
                                if (backIsHome) navigation.navigate("Home");
                                else navigation.goBack();
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ResultScreen;
