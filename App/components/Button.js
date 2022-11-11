import React from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { colors } from "../assets/colors/colors";
import { fonts } from "../assets/fonts/fonts";

const Button = ({ label, onPress, isLoading }) => {
    return (
        <TouchableOpacity style={tw`p-2`} onPress={onPress}>
            <View
                style={[
                    {
                        backgroundColor: colors.primary,
                    },
                    tw`px-4 py-4 rounded flex justify-center items-center shadow`,
                ]}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color={colors.white} />
                ) : (
                    <Text
                        style={[
                            { fontFamily: fonts.interMedium },
                            tw`text-white text-base`,
                        ]}
                    >
                        {label}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default Button;
