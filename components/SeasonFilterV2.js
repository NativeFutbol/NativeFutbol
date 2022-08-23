import { View, Text } from "react-native";
import React from "react";
import ModalDropdown from "react-native-modal-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setSeasonYear } from "../store/season";

export default function SeasonFilterV2() {
  const data = ["2022", "2021", "2020", "2019"];

  const dispatch = useDispatch();

  const season = useSelector((state) => state.season);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          margin: 15,
          borderWidth: 1,
          padding: 5,
          borderRadius: 20,
          width: "50%",
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
            Year:
          </Text>
        </View>
        <ModalDropdown
          options={data}
          defaultValue={season}
          style={{ borderBottomWidth: 1 }}
          textStyle={{ fontSize: 15, fontWeight: "bold" }}
          dropdownStyle={{}}
          dropdownTextStyle={{
            width: 100,
            fontSize: 15,
            fontWeight: "bold",
          }}
          onSelect={(idx, value) => dispatch(setSeasonYear(value))}
          // showSearch={true}
        />
      </View>
    </View>
  );
}
