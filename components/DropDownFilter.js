import { View, Text } from "react-native";
import React, { useEffect } from "react";
import ModalDropdown from "react-native-modal-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setMyTeamFilters } from "../store/myTeamFilters";
import { Ionicons } from "@expo/vector-icons";
import { fetchTeams } from "../store/myTeamFilterOptions";

export default function DropDownFilter({ values, label }) {
  // const myTeamFilters = useSelector((state) => state.myTeamFilters);

  const myTeamsFilterOptions = useSelector(
    (state) => state.myTeamFilterOptions
  );

  const seasonOptions = myTeamsFilterOptions?.season;
  const leagueOptions = myTeamsFilterOptions?.league;
  const teamOptions = myTeamsFilterOptions?.team;
  const positionOptions = myTeamsFilterOptions?.position;

  console.log(teamOptions);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        margin: 15,
        borderWidth: 1,
        padding: 5,
        borderRadius: 20,
        width: "65%",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginRight: 10,
          }}
        >
          {label}:
        </Text>
      </View>
      <ModalDropdown
        options={values}
        defaultValue={values[0].toString()}
        // style={{ borderBottomWidth: 1 }}
        textStyle={{ fontSize: 15, fontWeight: "bold", marginRight: 3 }}
        dropdownStyle={{ height: "auto" }}
        dropdownTextStyle={{
          width: 150,
          fontSize: 13,
          fontWeight: "bold",
          textAlign: "center",
        }}
        // onSelect={(idx, value) => dispatch(setMyTeamFilters(value))}
        renderRightComponent={() => (
          <Ionicons name="caret-down-sharp" color={"orangered"} size={16} />
        )}
        // showSearch={true}
      />
    </View>
  );
}
