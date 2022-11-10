import React from "react";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";

const IconButton = ({ icon, onPress, ...props }) => {
    return (
        <TouchableOpacity onPress={onPress} style={tw`p-2`} {...props}>
            {icon}
        </TouchableOpacity>
    );
};

export default IconButton;
