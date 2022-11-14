import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../assets/colors/colors";
import IconButton from "./IconButton";
import { fonts } from "../assets/fonts/fonts";

const PredictionItem = ({ pred, onPress, onDelete }) => {
    return (
        <TouchableOpacity
            style={tw`flex-row p-4 bg-gray-200 my-2 rounded justify-between`}
            onPress={onPress}
        >
            <View style={tw`flex-row justify-center items-center`}>
                {pred.predClass === 0 ? (
                    <AntDesign name="warning" size={24} color={colors.danger} />
                ) : (
                    <Feather name="check" size={24} color={colors.success} />
                )}
                <Text
                    style={[
                        tw`ml-3 text-base text-gray-600`,
                        { fontFamily: fonts.interMedium },
                    ]}
                >
                    {pred.dateTime}
                </Text>
            </View>
            <View style={tw`flex-row-reverse`}>
                <IconButton
                    icon={
                        <MaterialIcons
                            name="delete-outline"
                            size={24}
                            style={tw`text-gray-600`}
                        />
                    }
                    onPress={onDelete}
                />
            </View>
        </TouchableOpacity>
    );
};

export default PredictionItem;
