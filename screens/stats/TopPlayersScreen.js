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

import CategoryList from "../../components/CategoryList";
import { useNavigation } from "@react-navigation/native";

export default function TopPlayersScreen(props) {
  // const [season, setSeason] = useState("2022");
  // const [league, setLeague] = useState(39);
  const [filter, setFilter] = useState("players");
  const [data, setData] = useState([]);

  const navigation = useNavigation();
  const options = {
    method: "GET",
    url: "https://v3.football.api-sports.io/players/topscorers",
    params: {
      league: navigation.getParam("league"),
      season: navigation.getParam("season"),
    },
    headers: {
      "X-RapidAPI-Key": FOOTBALL_API_KEY,
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  };
  useEffect(() => {
    console.log(props.route.params.league, season);
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setData(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return <CategoryList data={data} filter={filter} />;
}
