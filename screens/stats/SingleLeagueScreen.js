import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import { useSelector } from "react-redux";
import CategoryList from "../../components/CategoryList";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useDispatch } from "react-redux";
import { setstandingsData } from "../../store/standingsData";
import LeagueInfoButtons from "../../components/LeagueInfoButtons";
import { setTopScorersData } from "../../store/topScorersData";
import { setTopAssistsData } from "../../store/topAssistsData";

export default function SingleLeagueScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("leagues");

  const [isLoading, setIsLoading] = useState(false);

  const singleLeagueData = useSelector((state) => state.singleScreenData);
  const leagueId = singleLeagueData.league?.league?.id;

  // const seasonYear = useSelector((state) => state.season);

  const [league, setLeague] = useState({
    id: leagueId,
    season,
    name: "",
    logo: "",
  });

  const [teams, setTeams] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getStandings();
  }, [season]);

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
            season: season,
          };
        });

        setIsLoading(false);

        dispatch(
          setstandingsData(response.data.response[0].league.standings[0])
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getTopScorers();
  }, [season]);

  const getTopScorers = () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/players/topscorers?season=${season}&league=${leagueId}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setIsLoading(false);

        dispatch(setTopScorersData(response.data.response));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getTopAssists();
  }, [season]);

  const getTopAssists = () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/players/topassists?season=${season}&league=${leagueId}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setIsLoading(false);

        dispatch(setTopAssistsData(response.data.response));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getTeams();
  }, [season]);

  const getTeams = () => {
    setIsLoading(true);

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

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={{ zIndex: 9999 }}>
      <CustomSearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search Teams..."
        onSubmit={getTeams}
      />
      <Filters />
      <SeasonFilter season={season} setSeason={setSeason} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 30,
          zIndex: -1,
        }}
      >
        <View style={styles.imageContainer}>
          {league.logo === "" ? (
            <></>
          ) : (
            <Image source={{ uri: league.logo, width: 50, height: 50 }} />
          )}
          <Text style={{ fontWeight: "bold" }}>{league.name}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <LeagueInfoButtons
            data={league}
            text="Standings"
            screen="LeagueStandings"
          />
          <LeagueInfoButtons data={league} text="Goals" screen="LeagueGoals" />
          <LeagueInfoButtons
            data={league}
            text="Assists"
            screen="LeagueAssists"
          />
        </View>
      </View>

      <View style={{ zIndex: -1 }}>
        <CategoryList data={teams} filter="teams" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    marginRight: 25,
  },
});
