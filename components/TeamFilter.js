import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import ModalDropdown from "react-native-modal-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setSeasonYear } from "../store/season";
import { Ionicons } from "@expo/vector-icons";
import { setSingleScreenData } from "../store/singleScreenData";
import { FOOTBALL_API_KEY } from "@env";
import axios from "axios";

export default function TeamFilter({ seasonInfo, leagueIdInfo }) {
  //   const data = ["2022", "2021", "2020", "2019"];

  //   const dispatch = useDispatch();

  //   const season = useSelector((state) => state.season);
  const [query, setQuery] = useState("");
  //   const [season, setSeason] = useState("2022");
  //   const [filter, setFilter] = useState("teams");
  const [allTeamData, setAllTeamData] = useState([]);
  //   const [league, setLeague] = useState("39");

  useEffect(() => {
    getTeams();
  }, [leagueIdInfo, seasonInfo]);

  const getTeams = () => {
    const searchUrl =
      query === ""
        ? `https://v3.football.api-sports.io/teams?league=${leagueIdInfo}&season=${seasonInfo}`
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
        console.log(allTeamData);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

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
            Team:
          </Text>
        </View>
        <ModalDropdown
          options={allTeamData}
          defaultValue={""}
          // style={{ borderBottomWidth: 1 }}
          textStyle={{ fontSize: 15, fontWeight: "bold", marginRight: 3 }}
          dropdownStyle={{}}
          dropdownTextStyle={{
            width: 100,
            fontSize: 15,
            fontWeight: "bold",
          }}
          //   onSelect={(idx, value) => dispatch(setSingleScreenData(value))}
          renderRightComponent={() => (
            <Ionicons name="caret-down-sharp" color={"orangered"} size={16} />
          )}
          // showSearch={true}
        />
      </View>
    </View>
  );
}
