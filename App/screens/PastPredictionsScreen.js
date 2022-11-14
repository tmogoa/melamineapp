import React, { useEffect, useState, useContext } from "react";
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import tw from "twrnc";
import { AppContext } from "../util/AppContext";
import { fonts } from "../assets/fonts/fonts";
import PredictionItem from "../components/PredictionItem";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";
import { api, url } from "../util/api";
import { parseISO, format } from "date-fns";

const PastPredictionsScreen = ({ navigation }) => {
    /**
     * This screen receives an image from the Home Screen and
     * submits the image for inference to the API
     */
    const [pastPreds, setPastPreds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useContext(AppContext);

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };

    useEffect(() => {
        getPastPreds();
    }, []);

    return (
        <SafeAreaView style={tw`flex-1 pt-13 flex-col`}>
            <View style={tw`flex-col px-5`}>
                <View style={tw`flex-row justify-between items-center`}>
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

                    {isLoading && (
                        <ActivityIndicator
                            size="large"
                            color={colors.primary}
                        />
                    )}
                </View>
                <Text
                    style={[
                        tw`text-3xl text-gray-600 mb-4`,
                        { fontFamily: fonts.interSemibold },
                    ]}
                >
                    Past Predictions
                </Text>
                {pastPreds.length == 0 && (
                    <View style={tw`p-2 rounded`}>
                        <Text
                            style={[
                                { fontFamily: fonts.interRegular },
                                tw`text-gray-600 text-base`,
                            ]}
                        >
                            Nothing yet.
                        </Text>
                    </View>
                )}
            </View>
            <FlatList
                style={tw`px-4`}
                data={pastPreds}
                renderItem={({ item }) => (
                    <PredictionItem
                        pred={{
                            predId: item.lesion_id,
                            predClass: item.lesion_malignancy,
                            dateTime: format(
                                parseISO(item.lesion_timestamp),
                                "MMM d, h:mm aaa"
                            ),
                        }}
                        onPress={() => {
                            navigation.navigate("ResultScreen", {
                                uri: `${url}static/${item.lesion_img_url}`,
                                predClass: item.lesion_malignancy,
                                predConf: (item.lesion_pred_conf * 100).toFixed(
                                    2
                                ),
                                backisHome: false,
                            });
                        }}
                        onDelete={() => deletePred(item.lesion_id)}
                    />
                )}
            />
        </SafeAreaView>
    );

    function getPastPreds() {
        setIsLoading(true);
        setPastPreds([]);
        api.get(`lesions/${user.user_id}`, config)
            .then((resp) => {
                setPastPreds(resp.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    }

    function deletePred(lesionId) {
        console.log(lesionId);
        Alert.alert(
            "Delete?",
            "Are you sure you want to delete this prediction?",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        setIsLoading(true);

                        api.delete(`lesions/${lesionId}`, config)
                            .then((resp) => {
                                console.log(resp.data);
                                if (resp.data.message === "DEL_SUCCESS") {
                                    setIsLoading(false);
                                    getPastPreds();
                                }
                            })
                            .catch((err) => {
                                setIsLoading(false);
                                console.log(err);
                            });
                    },
                    style: "destructive",
                },
            ],
            {
                cancelable: true,
            }
        );
    }
};

export default PastPredictionsScreen;
