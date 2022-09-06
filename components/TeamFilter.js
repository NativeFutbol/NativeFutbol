import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import ModalDropdown from "react-native-modal-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setSeasonYear } from "../store/season";
import { setComparisonTeamId } from "../store/comparisonTeamId";
import { Ionicons } from "@expo/vector-icons";
import { setSingleScreenData } from "../store/singleScreenData";
import { FOOTBALL_API_KEY } from "@env";
import axios from "axios";

export default function TeamFilter({ seasonInfo, leagueIdInfo }) {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [allTeamData, setAllTeamData] = useState([]);
  const compareLeagueId = useSelector((state) => state.comparisonLeagueId);

  useEffect(() => {
    getTeams();
  }, [compareLeagueId, seasonInfo]);

  const getTeams = () => {
    const searchUrl =
      query === ""
        ? `https://v3.football.api-sports.io/teams?league=${compareLeagueId}&season=${seasonInfo}`
        : `https://v3.football.api-sports.io/teams?search=${query.toLowerCase()}`;

    const options = {
      method: "GET",
      url: searchUrl,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setAllTeamData(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const teams = allTeamData.map((team) => team.team);

  const teamNames = teams.map((team) => team.name);

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
          width: 180,
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
          ></Text>
        </View>
        <ModalDropdown
          options={teamNames}
          defaultValue={"---"}
          textStyle={{ fontSize: 15, fontWeight: "bold", marginRight: 3 }}
          dropdownStyle={{ justifyContent: "center", alignContent: "center" }}
          dropdownTextStyle={{
            width: 125,
            fontSize: 15,
            fontWeight: "bold",
            textAlign: "center",
          }}
          onSelect={(idx, value) => {
            let teamiddd = teams.filter((element) => element.name === value)[0]
              .id;
            dispatch(setComparisonTeamId(teamiddd));
          }}
          renderRightComponent={() => (
            <Ionicons name="caret-down-sharp" color={"orangered"} size={16} />
          )}
        />
      </View>
    </View>
  );
}
