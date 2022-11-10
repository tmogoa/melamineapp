import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "twrnc";
import { colors } from "../assets/colors/colors";

const TapButton = () => {
    return (
        <TouchableOpacity
            style={[
                tw`rounded-full p-8 shadow-lg`,
                { backgroundColor: colors.primary },
            ]}
        >
            <FontAwesome name="camera" size={36} color={colors.white} />
        </TouchableOpacity>
    );
};

export default TapButton;
