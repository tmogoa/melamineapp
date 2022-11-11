import React from "react";
import { SafeAreaView, ImageBackground, View } from "react-native";
import tw from "twrnc";
import TapButton from "../components/TapButton";
import { FontAwesome, AntDesign, Feather } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";

const RequestScreen = ({ route, navigation }) => {
    /**
     * This screen receives an image from the Home Screen and
     * submits the image for inference to the API
     */
    const { image } = route.params;
    return (
        <SafeAreaView style={tw`flex-1`}>
            <ImageBackground
                source={{ uri: image.uri }}
                style={[tw`flex-1 flex-col-reverse`]}
                resizeMode="contain"
            >
                <View style={tw`flex-row p-2 mb-4 ml-3`}>
                    <TapButton
                        sizingPadding={6}
                        icon={
                            <AntDesign name="close" size={24} color="white" />
                        }
                        moreStyle="mr-3"
                        onPress={() => navigation.goBack()}
                    />
                    <TapButton
                        sizingPadding={6}
                        icon={<Feather name="send" size={24} color="white" />}
                        onPress={() =>
                            navigation.navigate("ResultScreen", {
                                uri: image.uri,
                                predClass: 0,
                                predConf: 80,
                                backIsHome: true,
                            })
                        }
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

function uploadImage(image) {
    let nameParts = image.uri.split("/").pop();
    let fileType = nameParts[nameParts.length - 1];
    var fileToUpload = {
        name: "image",
        uri: uri,
        type: "image/" + fileType,
    };
}

export default RequestScreen;
