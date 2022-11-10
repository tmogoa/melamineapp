import React, { useState, useEffect, useRef } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    ImageBackground,
    ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { Camera, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import TapButton from "../components/TapButton";
import { FontAwesome, AntDesign, Feather } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";

const TakePhoto = ({ navigation }) => {
    /**
     * This screen accesses the camera and allows taking photos
     */

    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
        useState();
    const [photo, setPhoto] = useState();
    const [isTakingPhoto, setIsTakingPhoto] = useState(false);

    useEffect(() => {
        (async () => {
            const cameraPermission =
                await Camera.requestCameraPermissionsAsync();
            const mediaLibPermission =
                await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(
                mediaLibPermission.status === "granted"
            );
        })();
    }, []);

    if (hasCameraPermission === undefined)
        return <Text>Requesting permissions...</Text>;
    else if (!hasCameraPermission)
        return <Text>Needs permissions, please change in settings.</Text>;

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: false,
            exif: false,
        };
        setIsTakingPhoto(true);
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
        setIsTakingPhoto(false);
    };

    if (photo) {
        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        return (
            <SafeAreaView style={tw`flex-1`}>
                <ImageBackground
                    source={{ uri: photo.uri }}
                    style={[tw`flex-1 flex-col-reverse`]}
                    resizeMode="cover"
                >
                    <View style={tw`flex-row p-2 mb-4 ml-3`}>
                        <TapButton
                            sizingPadding={6}
                            icon={
                                <AntDesign
                                    name="close"
                                    size={24}
                                    color="black"
                                />
                            }
                            moreStyle="mr-3"
                            onPress={() => setPhoto(undefined)}
                        />
                        <TapButton
                            sizingPadding={6}
                            icon={
                                <Feather name="send" size={24} color="black" />
                            }
                            onPress={savePhoto}
                        />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
    return (
        <Camera ref={cameraRef} style={tw`flex-1 flex-col-reverse`}>
            <View style={tw`flex-col items-center mb-4`}>
                <TapButton
                    onPress={takePic}
                    sizingPadding={6}
                    icon={
                        isTakingPhoto ? (
                            <ActivityIndicator
                                size="small"
                                color={colors.white}
                            />
                        ) : (
                            <FontAwesome
                                name="camera"
                                size={28}
                                color={colors.white}
                            />
                        )
                    }
                />
            </View>
        </Camera>
    );
};

export default TakePhoto;
