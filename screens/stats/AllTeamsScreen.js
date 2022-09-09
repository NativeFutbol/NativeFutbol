import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilterV2 from "../../components/SeasonFilterV2";
import CategoryList from "../../components/CategoryList";
import LeagueFilterV2 from "../../components/LeagueFilterV2";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function AllTeamsScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("teams");
  const [allTeamData, setAllTeamData] = useState([]);
  const league = useSelector((state) => state.league);
  const season = useSelector((state) => state.season);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTeams();
  }, [league, season]);

  const getTeams = () => {
    setIsLoading(true);

    const searchUrl = `https://v3.football.api-sports.io/teams?league=${league}&season=${season}`;

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
        const regex = new RegExp(`(${query.toLowerCase()})`);

        const teamsData = response.data.response.filter((team) => {
          return regex.test(team.team.name.toLowerCase());
        });

        setAllTeamData(teamsData);

        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
      <CategoryList data={allTeamData} filter={filter} footer={175} />
    </SafeAreaView>
  );
}
