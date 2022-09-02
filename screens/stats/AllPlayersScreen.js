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
import { useSelector } from "react-redux";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";

import SeasonFilterV2 from "../../components/SeasonFilterV2";
import LoadingOverlay from "../../components/LoadingOverlay";
import LeagueFilterV2 from "../../components/LeagueFilterV2";

export default function AllPlayersScreen() {
  const [query, setQuery] = useState("");
  const season = useSelector((state) => state.season);
  const league = useSelector((state) => state.league);
  const [filter, setFilter] = useState("players");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

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
    setIsLoading(true);
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setData(response.data.response);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [league, season, page]);

  const getPlayers = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  if (isLoading) {
    return <LoadingOverlay />;
  } else {
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
              height: 62,
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <LeagueFilterV2 />
            <SeasonFilterV2 />
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
              <Text
                style={{ textAlign: "center", textAlignVertical: "center" }}
              >
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
}

//
