import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";
import singleScreenData from "../../store/singleScreenData";
import { useSelector } from "react-redux";

export default function AllTeamsScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("teams");
  const [singleTeamInfo, setSingleTeamInfo] = useState([]);
  const singleTeamData = useSelector((state) => state.singleScreenData).team
    ?.team;
  console.log("singleteamid", singleTeamData.id);
  console.log("season", season);
  useEffect(() => {
    getTeamInfo();
  }, [singleTeamData.id]);

  const getTeamInfo = () => {
    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/players/squads?team=${singleTeamData.id}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setSingleTeamInfo(response.data.response[0].players);
        console.log(response.data.response[0].players);
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
          placeholder="Search teams..."
          onSubmit={getTeamInfo}
        />
        <Filters />
        <View>
          <SeasonFilter season={season} setSeason={setSeason} />
        </View>
      </View>
      <CategoryList data={singleTeamInfo} filter={filter} />
    </SafeAreaView>
  );
}
