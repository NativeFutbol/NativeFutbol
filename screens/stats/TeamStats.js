import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";
import singleScreenData from "../../store/singleScreenData";
import { useSelector } from "react-redux";
import CoachButton from "../../components/CoachButton";

export default function TeamStats() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("teams");
  const [venueInfo, setVenueInfo] = useState("");
  const [teamStatsInfo, setTeamStatsInfo] = useState("");
  const [singleTeamInfo, setSingleTeamInfo] = useState([]);
  const [coachId, setCoachId] = useState("");
  const singleTeamData = useSelector((state) => state.singleScreenData).team;
  console.log("####", singleTeamData);
  console.log("season-----", season);

  useEffect(() => {
    getTeamStats();
  }, [singleTeamData.id, season]);

  const getTeamStats = () => {
    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/teams/statistics?season=${season}&team=${singleTeamData.id}&league=40`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setTeamStatsInfo(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log("teamStats@@", teamStatsInfo);

  return (
    <View style={{ flexGrow: 1 }}>
      <View style={styles.header}>
        <Image style={styles.logo} />
        <Text style={[styles.team, styles.fontWeight]}>Team</Text>
        <Text style={[styles.stat, styles.fontWeight]}>Home</Text>
        <Text style={[styles.stat, styles.fontWeight]}>Away</Text>
        <Text style={[styles.stat, styles.fontWeight]}>All</Text>
      </View>

      <FlatList
        data={[teamStatsInfo]}
        ListFooterComponent={<View style={{ height: 50 }} />}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.team}>{item.team?.name}</Text>
                <Image
                  source={{ uri: item.team?.logo, width: 50, height: 50 }}
                  style={styles.logo}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.stat}>Games played</Text>
                <Text style={styles.stat}>{item.fixtures?.played?.home}</Text>
                <Text style={styles.stat}>{item.fixtures?.played?.away}</Text>
                <Text style={styles.stat}>{item.fixtures?.played?.total}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.stat}>Wins</Text>
                <Text style={styles.stat}>{item.fixtures?.wins?.home}</Text>
                <Text style={styles.stat}>{item.fixtures?.wins?.away}</Text>
                <Text style={styles.stat}>{item.fixtures?.wins?.total}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.stat}>Draws</Text>
                <Text style={styles.stat}>{item.fixtures?.draws?.home}</Text>
                <Text style={styles.stat}>{item.fixtures?.draws?.away}</Text>
                <Text style={styles.stat}>{item.fixtures?.draws?.total}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.stat}>loses</Text>
                <Text style={styles.stat}>{item.fixtures?.loses?.home}</Text>
                <Text style={styles.stat}>{item.fixtures?.loses?.away}</Text>
                <Text style={styles.stat}>{item.fixtures?.loses?.total}</Text>
              </View>
              <Text>Goals</Text>
              <View style={{ flexDirection: "row" }}>
                <Text>Goals For</Text>
                <Text style={styles.stat}>{item.goals?.for?.total?.home}</Text>
                <Text style={styles.stat}>{item.goals?.for?.total?.away}</Text>
                <Text style={styles.stat}>{item.goals?.for?.total?.total}</Text>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Goals Against</Text>
                  <Text style={styles.stat}>
                    {item.goals?.against?.total?.home}
                  </Text>
                  <Text style={styles.stat}>
                    {item.goals?.against?.total?.away}
                  </Text>
                  <Text style={styles.stat}>
                    {item.goals?.against?.total?.total}
                  </Text>
                </View>
              </View>
              <View>
                <Text>Goals Averages</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text>Goals For</Text>
                  <Text style={styles.stat}>
                    {item.goals?.for?.average?.home}
                  </Text>
                  <Text style={styles.stat}>
                    {item.goals?.for?.average?.away}
                  </Text>
                  <Text style={styles.stat}>
                    {item.goals?.for?.average?.total}
                  </Text>
                </View>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Goals Against</Text>
                    <Text style={styles.stat}>
                      {item.goals?.against?.average?.home}
                    </Text>
                    <Text style={styles.stat}>
                      {item.goals?.against?.average?.away}
                    </Text>
                    <Text style={styles.stat}>
                      {item.goals?.against?.average?.total}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    padding: 5,
    margin: 5,
  },

  fontWeight: {
    fontWeight: "bold",
  },

  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  team: {
    fontSize: 12,
    flex: 5,
  },

  stat: {
    fontSize: 12,
    flex: 1,
  },
});

//
