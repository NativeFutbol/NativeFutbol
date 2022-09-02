import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BarChartComp from "../../components/BarChartComp";
import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import SeasonFilterV2 from "../../components/SeasonFilterV2";
import CategoryList from "../../components/CategoryList";

import LineChartComp from "../../components/LineChartComp";
import LeagueFilterV2 from "../../components/LeagueFilterV2";

export default function AllTeamsScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("teams");
  const [allTeamData, setAllTeamData] = useState([]);
  const league = useSelector((state) => state.league);
  const season = useSelector((state) => state.season);
  console.log("league.....", league);
  console.log("season.....", season);

  useEffect(() => {
    getTeams();
  }, [league, season]);

  const getTeams = () => {
    const searchUrl =
      query === ""
        ? `https://v3.football.api-sports.io/teams?league=${league}&season=${season}`
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
        console.log("22222", allTeamData);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <SafeAreaView>
      <View
        style={{
          zIndex: 5000,
        }}
      >
        <CustomSearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search teams..."
          onSubmit={getTeams}
        />
        <Filters />
        <View
          style={{
            height: 62,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <LeagueFilterV2 league={league} />

          <SeasonFilterV2 season={season} />
        </View>
      </View>
      <CategoryList data={allTeamData} filter={filter} />
    </SafeAreaView>
  );
}
