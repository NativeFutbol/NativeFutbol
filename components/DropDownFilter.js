import { View, Text } from "react-native";
import React, { useEffect } from "react";
import ModalDropdown from "react-native-modal-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setMyTeamFilters } from "../store/myTeamFilters";
import { Ionicons } from "@expo/vector-icons";

export default function DropDownFilter({ label }) {
  const dispatch = useDispatch();
  // const myTeamFilters = useSelector((state) => state.myTeamFilters);

  const myTeamsFilterOptions = useSelector(
    (state) => state.myTeamFilterOptions
  );

  const seasonOptions = myTeamsFilterOptions?.season;
  const leagueOptions =
    myTeamsFilterOptions?.league && Object.values(myTeamsFilterOptions?.league);
  const teamOptions =
    myTeamsFilterOptions?.team && Object.values(myTeamsFilterOptions?.team);
  const positionOptions = myTeamsFilterOptions?.position;

  const options =
    label === "season"
      ? seasonOptions
      : label === "league"
      ? leagueOptions
      : label === "team"
      ? teamOptions
      : label === "position"
      ? positionOptions
      : null;

  const findId = (value) => {
    if (label === "league") {
      return Object.keys(myTeamsFilterOptions?.league).find(
        (key) => myTeamsFilterOptions?.league[key] === value
      );
    } else if (label === "team") {
      return Object.keys(myTeamsFilterOptions?.team).find(
        (key) => myTeamsFilterOptions?.team[key] === value
      );
    }

    return null;
  };

  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        margin: 15,
        borderWidth: 1,
        padding: 5,
        borderRadius: 20,
        width: "80%",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginRight: 10,
            marginLeft: 30,
          }}
        >
          {label}:
        </Text>
      </View>
      <ModalDropdown
        options={options}
        defaultValue={
          label === "season" || label === "league"
            ? options[0]?.toString()
            : `select ${label}...`
        }
        style={{ borderBottomWidth: 0.2, borderBottomColor: "orangered" }}
        textStyle={{
          fontSize: 15,
          fontWeight: "bold",
          marginRight: 3,
        }}
        // dropdownStyle={{ height: 200 }}
        dropdownTextStyle={{
          width: 200,
          fontSize: 15,
          fontWeight: "bold",
          textAlign: "center",
        }}
        onSelect={(idx, value) => {
          let id = findId(value);
          id = id ? id : value;
          dispatch(setMyTeamFilters({ id, label }));
        }}
        renderRightComponent={() => (
          <Ionicons name="caret-down-sharp" color={"orangered"} size={16} />
        )}
        // showSearch={true}
      />
    </View>
  );
}
