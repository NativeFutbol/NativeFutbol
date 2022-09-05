import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import React, { useState, useEffect } from "react";

import CategoryList from "../../components/CategoryList";
import { useNavigation } from "@react-navigation/native";

export default function TopPlayersScreen(props) {
  const [filter, setFilter] = useState("players");
  const [data, setData] = useState([]);

  const navigation = useNavigation();
  const options = {
    method: "GET",
    url: "https://v3.football.api-sports.io/players/topscorers",
    params: {
      league: props.route.params.league,
      season: props.route.params.season,
    },
    headers: {
      "X-RapidAPI-Key": FOOTBALL_API_KEY,
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  };
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setData(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return <CategoryList data={data} filter={filter} />;
}
