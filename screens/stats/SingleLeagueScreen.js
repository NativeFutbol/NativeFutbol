import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import { useSelector } from "react-redux";
import CategoryList from "../../components/CategoryList";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useDispatch } from "react-redux";
import { setstandingsData } from "../../store/standingsData";
import LeagueInfoButtons from "../../components/LeagueInfoButtons";
import { setTopScorersData } from "../../store/topScorersData";
import { setTopAssistsData } from "../../store/topAssistsData";
import { setMostCardsData } from "../../store/mostCardsData";
import SeasonFilterV2 from "../../components/SeasonFilterV2";

export default function SingleLeagueScreen() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const singleLeagueData = useSelector((state) => state.singleScreenData);
  const leagueId = singleLeagueData.league?.league?.id;

  const season = useSelector((state) => state.season);

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
  }, [season, leagueId]);

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
  }, [season, leagueId]);

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
  }, [season, leagueId]);

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
    getTopRedCards();
  }, [season, leagueId]);

  const getTopRedCards = () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/players/topredcards?season=${season}&league=${leagueId}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setIsLoading(false);

        dispatch(setMostCardsData(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getTopYellowCards();
  }, [season, leagueId]);

  const getTopYellowCards = () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/players/topyellowcards?season=${season}&league=${leagueId}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setIsLoading(false);

        dispatch(setMostCardsData(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getTeams();
  }, [season, leagueId]);

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
        const regex = new RegExp(`(${query.toLowerCase()})`);

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
      <SeasonFilterV2 />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 5,
          zIndex: -1,
        }}
      >
        <View style={styles.imageContainer}>
          {league.logo === "" ? (
            <></>
          ) : (
            <Image source={{ uri: league.logo, width: 40, height: 40 }} />
          )}
          <Text style={{ fontWeight: "bold" }}>{league.name}</Text>
        </View>

        <View>
          <View style={{ flexDirection: "row" }}>
            <LeagueInfoButtons
              data={league}
              text="Standings"
              screen="LeagueStandings"
            />
            <LeagueInfoButtons
              data={league}
              text="Goals"
              screen="LeagueGoals"
            />
            <LeagueInfoButtons
              data={league}
              text="Assists"
              screen="LeagueAssists"
            />
          </View>

          <View
            style={{
              marginTop: 8,
              width: "60%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <LeagueInfoButtons
              data={league}
              text="Red/Yellow Cards"
              screen="LeagueCards"
            />
            <LeagueInfoButtons
              data={league}
              text="Charts"
              screen="LeagueCharts"
            />
          </View>
        </View>
      </View>

      <View style={{ zIndex: -1 }}>
        <CategoryList data={teams} filter="teams" footer={475} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});
