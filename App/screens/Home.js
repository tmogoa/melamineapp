import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Image,
    SafeAreaView,
    Text,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { colors } from "../assets/colors/colors";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import tw from "twrnc";
import logo from "../../assets/icon.png";
import IconButton from "../components/IconButton";
import { fonts } from "../assets/fonts/fonts";
import TapButton from "../components/TapButton";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "../util/AppContext";
import { api } from "../util/api";

const Home = ({ navigation }) => {
    const { destroyUser, user } = useContext(AppContext);
    const [image, setImage] = useState();
    const [isGettingImage, setIsGettingImage] = useState(false);
    const [isFromCamera, setIsFromCamera] = useState(true);
    const options = {
        allowsEditing: true,
        aspect: [4, 3],
        exif: false,
        quality: 1,
    };

    useEffect(() => {
        if (image) {
            navigation.navigate("RequestScreen", { image: image });
        }
    }, [image]);

    let launchCameraAsync = async () => {
        setIsGettingImage(true);
        setIsFromCamera(true);
        let result = await ImagePicker.launchCameraAsync(options);
        if (result.cancelled) {
            setIsGettingImage(false);
            setImage(null);
            return;
        }
        setImage(result);
        setIsGettingImage(false);
    };

    let launchImagePickerAsync = async () => {
        setIsGettingImage(true);
        setIsFromCamera(false);
        let result = await ImagePicker.launchImageLibraryAsync(options);
        if (result.cancelled) {
            setIsGettingImage(false);
            setImage(null);
            return;
        }
        setImage(result);
        setIsGettingImage(false);
    };

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
                        onPress={() =>
                            navigation.navigate("PastPredictionsScreen")
                        }
                    />
                    <Image source={logo} style={tw`w-24 h-24`} />
                    <IconButton
                        icon={
                            <AntDesign name="logout" size={24} color="black" />
                        }
                        onPress={() => logout()}
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
                            onPress={launchCameraAsync}
                            sizingPadding={8}
                            icon={
                                isFromCamera && isGettingImage ? (
                                    <ActivityIndicator
                                        size="large"
                                        color={colors.white}
                                    />
                                ) : (
                                    <FontAwesome
                                        name="camera"
                                        size={36}
                                        color={colors.white}
                                    />
                                )
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
                        <Button
                            label="Select image"
                            onPress={launchImagePickerAsync}
                            isLoading={isGettingImage && !isFromCamera}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

    function logout() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        api.delete(`users/logout`, config)
            .then((resp) => {
                console.log(resp.data);
                if (resp.data.message === "JWT_REVOKED") {
                    destroyUser(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Login" }],
                        });
                    });
                }
            })
            .catch((err) => {
                if (err?.response?.status === 401) {
                    destroyUser(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Login" }],
                        });
                    });
                }
            });
    }
};

export default Home;
