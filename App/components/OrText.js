import React from "react";
import { Text, View } from "react-native";
import { fonts } from "../assets/fonts/fonts";
import tw from "twrnc";

const OrText = () => {
    return (
        <View style={tw`my-2 w-full flex-col justify-center items-center`}>
            <Text
                style={[
                    tw`text-sm text-gray-600`,
                    { fontFamily: fonts.interMedium },
                ]}
            >
                OR
            </Text>
        </View>
    );
};

export default OrText;
