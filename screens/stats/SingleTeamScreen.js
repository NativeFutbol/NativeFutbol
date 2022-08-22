import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";
import singleScreenData from "../../store/singleScreenData";

export default function AllTeamsScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("teams");
  const [teamId, setTeamId] = useState("50");
  const [singleTeamData, setSingleTeamData] = useState([]);

  useEffect(() => {
    getTeamInfo();
  }, []);

  const getTeamInfo = () => {
    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/players?team=${teamId}&season=${season}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setSingleTeamData(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <SafeAreaView>
      <View>
        <CustomSearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search teams..."
          onSubmit={getTeamInfo}
        />
        <Filters />
        <SeasonFilter season={season} setSeason={setSeason} />
      </View>
      <CategoryList data={singleTeamData} filter={filter} />
    </SafeAreaView>
  );
}
