import React from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { fonts } from "../assets/fonts/fonts";
import PredictionItem from "../components/PredictionItem";
import { AntDesign } from "@expo/vector-icons";

const PastPredictionsScreen = ({ navigation }) => {
    /**
     * This screen receives an image from the Home Screen and
     * submits the image for inference to the API
     */
    return (
        <SafeAreaView style={tw`flex-1 pt-13 px-5 flex-col`}>
            <View style={tw`flex-col`}>
                <TouchableOpacity
                    style={tw`mb-5`}
                    onPress={() => navigation.goBack()}
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
                    Past Predictions
                </Text>
            </View>
            <FlatList
                data={[
                    {
                        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Melanoma.jpg/300px-Melanoma.jpg",
                        predClass: 0,
                        predConf: 80,
                        dateTime: "Date Here",
                    },
                    {
                        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Melanoma.jpg/300px-Melanoma.jpg",
                        predClass: 1,
                        predConf: 80,
                        dateTime: "Date Here",
                    },
                ]}
                renderItem={({ item }) => (
                    <PredictionItem
                        pred={item}
                        onPress={() => {
                            navigation.navigate("ResultScreen", {
                                uri: item.uri,
                                predClass: item.predClass,
                                predConf: item.predConf,
                                backisHome: false,
                            });
                        }}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default PastPredictionsScreen;
