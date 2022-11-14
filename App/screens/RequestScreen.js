import React, { useContext, useState } from "react";
import {
    SafeAreaView,
    ImageBackground,
    View,
    ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { AppContext } from "../util/AppContext";
import TapButton from "../components/TapButton";
import { AntDesign, Feather } from "@expo/vector-icons";
import { api } from "../util/api";
import * as FileSystem from "expo-file-system";
import { colors } from "../assets/colors/colors";

const RequestScreen = ({ route, navigation }) => {
    /**
     * This screen receives an image from the Home Screen and
     * submits the image for inference to the API
     */
    const { user } = useContext(AppContext);
    const { image } = route.params;

    const [isLoading, setisLoading] = useState(false);
    return (
        <SafeAreaView style={tw`flex-1`}>
            <ImageBackground
                source={{ uri: image.uri }}
                style={[tw`flex-1 flex-col-reverse`]}
                resizeMode="contain"
            >
                <View style={tw`flex-row p-2 mb-4 ml-3`}>
                    {!isLoading && (
                        <TapButton
                            sizingPadding={6}
                            icon={
                                <AntDesign
                                    name="close"
                                    size={24}
                                    color="white"
                                />
                            }
                            moreStyle="mr-3"
                            onPress={() => navigation.goBack()}
                        />
                    )}
                    <TapButton
                        sizingPadding={6}
                        icon={
                            isLoading ? (
                                <ActivityIndicator
                                    size="small"
                                    color={colors.white}
                                />
                            ) : (
                                <Feather name="send" size={24} color="white" />
                            )
                        }
                        onPress={() => uploadImage()}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );

    function uploadImage() {
        setisLoading(true);
        let nameParts = image.uri.split(".");
        const fileType = nameParts[nameParts.length - 1];
        let filename = image.uri.split("/");
        filename = filename[filename.length - 1];
        const fileToUpload = {
            name: filename,
            uri: image.uri,
            type: `image/${fileType}`,
        };
        console.log(fileToUpload);

        const params = new FormData();
        params.append("file", fileToUpload);

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "multipart/form-data",
            },
        };
        api.post(`lesions/${user.user_id}`, params, config)
            .then((resp) => {
                console.log(resp.data);
                const { lesion_malignancy, lesion_pred_conf } = resp.data;
                navigation.navigate("ResultScreen", {
                    uri: image.uri,
                    predClass: lesion_malignancy,
                    predConf: (lesion_pred_conf * 100).toFixed(2),
                    backIsHome: true,
                });
                setisLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setisLoading(false);
            });
    }
};

export default RequestScreen;
