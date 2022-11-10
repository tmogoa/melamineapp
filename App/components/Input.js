import React from "react";
import { Text, TextInput, View } from "react-native";
import tw from "twrnc";
import { fonts } from "../assets/fonts/fonts";

const Input = ({ label, ...props }) => {
    return (
        <View style={tw`p-2 flex-col`}>
            <Text
                style={[
                    { fontFamily: fonts.interRegular },
                    tw`text-sm text-gray-600 mb-2`,
                ]}
            >
                {label}
            </Text>
            <TextInput
                style={[
                    tw`bg-gray-200 rounded px-4 py-3`,
                    { fontFamily: fonts.interMedium },
                ]}
                {...props}
            />
        </View>
    );
};

export default Input;
