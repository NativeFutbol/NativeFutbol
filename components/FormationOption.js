import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyFormation } from "../store/myFormation";
import { resetMyPlayer } from "../store/myPlayers";

const FormationOption = ({ type, filterFormationRef }) => {
  const formation = type.replace(/\s/g, "");
  const myFormation = useSelector((state) => state.myFormation);
  const dispatch = useDispatch();

  const isSelected =
    [myFormation.Attacker, myFormation.Midfielder, myFormation.Defender].join(
      "-"
    ) === formation;

  const onPress = () => {
    dispatch(setMyFormation(formation));
    filterFormationRef.current?.close();
    dispatch(resetMyPlayer());
  };

  return (
    <View
      style={{
        margin: 15,
      }}
    >
      <TouchableOpacity
        style={{
          borderRadius: 20,
          padding: 5,
          backgroundColor: isSelected ? "orangered" : "black",
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
          {type}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormationOption;

const styles = StyleSheet.create({});
