import { View, Text } from "react-native";
import React from "react";
import ModalDropdown from "react-native-modal-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setSeasonYear } from "../store/season";
import { Ionicons } from "@expo/vector-icons";

export default function SeasonFilterV2() {
  const data = ["2022", "2021", "2020", "2019"];

  const dispatch = useDispatch();

  const season = useSelector((state) => state.season);

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
        <View style={{}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            Season:
          </Text>
        </View>
        <ModalDropdown
          options={data}
          defaultValue={season}
          textStyle={{ fontSize: 15, fontWeight: "bold", marginRight: 3 }}
          dropdownStyle={{}}
          dropdownTextStyle={{
            width: 100,
            fontSize: 15,
            fontWeight: "bold",
          }}
          onSelect={(idx, value) => dispatch(setSeasonYear(value))}
          renderRightComponent={() => (
            <Ionicons name="caret-down-sharp" color={"orangered"} size={16} />
          )}
        />
      </View>
    </View>
  );
}
