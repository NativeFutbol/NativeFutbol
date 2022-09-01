import { View, Text } from "react-native";
import React from "react";
import ModalDropdown from "react-native-modal-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setLeagueId } from "../store/league";
import { Ionicons } from "@expo/vector-icons";

export default function LeagueFilterV2() {
  const data = [
    "Premier League",
    "Bundesliga",
    "Ligue 1",
    "La Liga",
    "Serie A",
  ];

  const dispatch = useDispatch();
  const league = useSelector((state) => state.league);
  let name = "Premier League";
  switch (league) {
    case 39:
      name = "Premier League";
      break;
    case 78:
      name = "Bundesliga";
      break;
    case 61:
      name = "Ligue 1";
      break;
    case 140:
      name = "La Liga";
      break;
    case 135:
      name = "Serie A";
      break;
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          margin: 15,
          borderWidth: 1,
          padding: 5,
          borderRadius: 20,
          width: 150,
          height: 35,
        }}
      >
        <ModalDropdown
          options={data}
          defaultValue={name}
          // style={{ borderBottomWidth: 1 }}
          textStyle={{ fontSize: 15, fontWeight: "bold", marginRight: 3 }}
          dropdownStyle={{}}
          dropdownTextStyle={{
            width: 100,
            fontSize: 15,
            fontWeight: "bold",
          }}
          onSelect={(idx, value) => dispatch(setLeagueId(value))}
          renderRightComponent={() => (
            <Ionicons name="caret-down-sharp" color={"orangered"} size={16} />
          )}
          // showSearch={true}
        />
      </View>
    </View>
  );
}
