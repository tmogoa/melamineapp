import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "twrnc";
import { colors } from "../assets/colors/colors";

const TapButton = ({ onPress, icon, sizingPadding, moreStyle }) => {
    return (
        <TouchableOpacity
            style={[
                tw`rounded-full p-${sizingPadding} shadow-lg ${moreStyle}`,
                { backgroundColor: colors.primary },
            ]}
            onPress={onPress}
        >
            {icon}
        </TouchableOpacity>
    );
};

export default TapButton;
