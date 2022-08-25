import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function TrophiesButton({ data, text, screen }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
        backgroundColor: "#32a88b",
        borderRadius: 20,
        padding: 5,
      }}
      onPress={() => navigation.navigate(screen, data)}
    >
      <Text style={{ fontWeight: "bold", fontSize: 13, color: "white" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
