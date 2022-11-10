import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { fonts } from "../assets/fonts/fonts";

const TextButton = ({ label, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={tw`flex-col justify-center items-center p-2`}
        >
            <Text
                style={[tw`text-blue-500`, { fontFamily: fonts.interMedium }]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default TextButton;
