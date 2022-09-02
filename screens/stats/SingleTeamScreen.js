import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import CategoryList from "../../components/CategoryList";
import { useSelector } from "react-redux";
import CoachButton from "../../components/CoachButton";
import VenueButton from "../../components/VenueButton";
import TeamStatsButton from "../../components/TeamStatsButton";

export default function SingleTeamScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("players");
  const [singleTeamInfo, setSingleTeamInfo] = useState([]);
  const singleTeamData = useSelector((state) => state.singleScreenData).team
    ?.team;

  useEffect(() => {
    getTeamInfo();
  }, [singleTeamData.id]);

  const getTeamInfo = () => {
    const searchUrl =
      query === ""
        ? `https://v3.football.api-sports.io/players/squads?team=${singleTeamData.id}`
        : `https://v3.football.api-sports.io/players?team=${
            singleTeamData.id
          }&search=${query.toLowerCase()}`;

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
        setSingleTeamInfo(
          query === ""
            ? response.data.response[0]?.players
            : response.data.response
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <SafeAreaView>
      <View style={{ zIndex: 9000 }}>
        <CustomSearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search players..."
          onSubmit={getTeamInfo}
        />
        <Filters />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            margin: 5,
          }}
        >
          <View>
            <CoachButton
              data={singleTeamInfo}
              text="Coach"
              screen="CoachInfo"
            />
          </View>
          <View>
            <VenueButton data={singleTeamInfo} text="Venue" screen="Venue" />
          </View>
          <View>
            <TeamStatsButton
              data={singleTeamInfo}
              text="TeamStats"
              screen="TeamStats"
            />
          </View>
        </View>
      </View>
      <CategoryList data={singleTeamInfo} filter={filter} />
    </SafeAreaView>
  );
}
