import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import { useSelector } from "react-redux";
import CategoryList from "../../components/CategoryList";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function SingleLeagueScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("leagues");

  const [isLoading, setIsLoading] = useState(false);

  const singleLeagueData = useSelector((state) => state.singleScreenData);
  const leagueId = singleLeagueData?.league?.id;

  const [league, setLeague] = useState({ id: leagueId, name: "", logo: "" });
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getStandings();
  }, []);

  const getStandings = () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/standings?season=${season}&league=${leagueId}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setLeague((prev) => {
          return {
            ...prev,
            name: response.data.response[0].league.name,
            logo: response.data.response[0].league.logo,
          };
        });

        setIsLoading(false);

        // console.log(response.data.response[0].league.name);
        // console.log(response.data.response[0].league.logo);
        // console.log(response.data.response[0].league.standings[0][0].team.name);

        // console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = () => {
    setIsLoading(true);

    // const searchUrl =
    //   query === ""
    //     ? `https://v3.football.api-sports.io/teams?season=${season}&league=${leagueId}`
    //     : `https://v3.football.api-sports.io/teams?search=${query}`;

    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/teams?season=${season}&league=${leagueId}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const regex = new RegExp(`(${query})`);

        const teamsData = response.data.response.filter((team) => {
          return regex.test(team.team.name.toLowerCase());
        });

        setTeams(teamsData);

        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // console.log(teams[0]?.team?.logo);
  // console.log(teams[0]?.team?.name);

  return (
    <View>
      <CustomSearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search Teams..."
        onSubmit={getTeams}
      />
      <Filters />
      <SeasonFilter season={season} setSeason={setSeason} />

      <View style={styles.imageContainer}>
        {league.logo === "" ? (
          <></>
        ) : (
          <Image source={{ uri: league.logo, width: 50, height: 50 }} />
        )}
        <Text>{league.name}</Text>
      </View>

      <CategoryList data={teams} filter="teams" />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
});
