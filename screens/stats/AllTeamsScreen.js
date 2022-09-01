import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";

import BarChartComp from "../../components/BarChartComp";
import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import SeasonFilterV2 from "../../components/SeasonFilterV2";
import CategoryList from "../../components/CategoryList";
import LeagueFilter from "../../components/LeagueFilter";
import LineChartComp from "../../components/LineChartComp";

export default function AllTeamsScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("teams");
  const [allTeamData, setAllTeamData] = useState([]);
  const [league, setLeague] = useState("39");

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
            flexDirection: "row",
            marginBottom: 55,
            left: 60,
          }}
        >
          <View>
            <LeagueFilter league={league} setLeague={setLeague} />
          </View>
          <View style={{ marginRight: 370, width: "28%" }}>
            <SeasonFilterV2 season={season} setSeason={setSeason} />
          </View>
        </View>
      </View>
      <CategoryList data={allTeamData} filter={filter} />
    </SafeAreaView>
  );
}
