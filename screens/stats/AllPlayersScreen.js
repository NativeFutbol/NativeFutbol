import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import {
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";
import LeagueFilter from "../../components/LeagueFilter";

export default function AllPlayersScreen() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [league, setLeague] = useState(39);
  const [filter, setFilter] = useState("players");
  const [page, setPage] = useState(1);

  const [data, setData] = useState([
    {
      league: {
        name: "fei",
        logo: "https://media.api-sports.io/football/leagues/801.png",
        id: 1,
      },
    },
    {
      league: {
        name: "alexis",
        logo: "https://media.api-sports.io/football/players/1.png",
        id: 2,
      },
    },
    {
      league: {
        name: "connor",
        logo: "https://media.api-sports.io/football/leagues/214.png",
        id: 3,
      },
    },
    {
      league: {
        name: "kevin",
        logo: "https://media.api-sports.io/football/teams/165.png",
        id: 4,
      },
    },
  ]);

  const navigation = useNavigation();
  const options = {
    method: "GET",
    url: `https://v3.football.api-sports.io/${filter}`,
    params: { league: league, season: season, page: page },
    headers: {
      "X-RapidAPI-Key": FOOTBALL_API_KEY,
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setData(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [league, season, page]);

  const getPlayers = () => {
    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/${filter}?search=${query}`,
      params: { league: league, season: season },
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setData(response.data.response);
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
          placeholder="Search players..."
          onSubmit={getPlayers}
        />
        <Filters />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginBottom: 55,
            left: 60,
          }}
        >
          <LeagueFilter league={league} setLeague={setLeague} />
          <SeasonFilter season={season} setSeason={setSeason} />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 50,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TopPlayersScreen", {
              league: league,
              season: season,
            })
          }
        >
          <View
            style={{
              borderWidth: 1,
              width: 100,
              height: "80%",
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ textAlign: "center", textAlignVertical: "center" }}>
              Top Players
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (page > 1) {
              let back = page - 1;
              setPage(back);
            }
          }}
        >
          <Text>{"<<    "}</Text>
        </TouchableOpacity>
        <Text>Page {page}</Text>
        <TouchableOpacity
          onPress={() => {
            let forward = page + 1;
            setPage(forward);
          }}
        >
          <Text>{"   >>"}</Text>
        </TouchableOpacity>
      </View>
      <CategoryList data={data} filter={filter} />
    </SafeAreaView>
  );
}

//
