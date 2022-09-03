import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

import CustomSearchBar from "../../components/CustomSearchBar";
import Filters from "../../components/Filters";
import SeasonFilter from "../../components/SeasonFilter";
import CategoryList from "../../components/CategoryList";
import singleScreenData from "../../store/singleScreenData";
import { useSelector } from "react-redux";
import CoachButton from "../../components/CoachButton";
import { Col, Row, Grid } from "react-native-easy-grid";
import SeasonFilterV2 from "../../components/SeasonFilterV2";
import ComparisonTeam from "../../components/ComparisonTeam";
import TeamFilter from "../../components/TeamFilter";
import LeagueFilterV2 from "../../components/LeagueFilterV2";
import CompareLeagueFilter from "../../components/CompareLeagueFilter";
export default function TeamStats() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("teams");
  const [venueInfo, setVenueInfo] = useState("");
  const [teamStatsInfo, setTeamStatsInfo] = useState("");
  const [singleTeamInfo, setSingleTeamInfo] = useState([]);
  const [coachId, setCoachId] = useState("");
  const [isCompare, setIsCompare] = useState(false);
  const league = useSelector((state) => state.league);
  const singleTeamData = useSelector((state) => state.singleScreenData).team
    ?.team;
  const seasonInfo = useSelector((state) => state.season);

  useEffect(() => {
    getTeamStats();
  }, [singleTeamData.id, seasonInfo]);

  const getTeamStats = () => {
    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/teams/statistics?season=${seasonInfo}&team=${singleTeamData.id}&league=${league}`,
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
  return (
    <SafeAreaView>
      <View style={{ height: 55 }}>
        <SeasonFilterV2 />
      </View>
      <ScrollView>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            height: 35,
          }}
        >
          <Text style={styles.headers}>{teamStatsInfo.team?.name}</Text>
          <Image
            source={{ uri: teamStatsInfo.team?.logo }}
            style={{ width: 33, height: 33, margin: 3, padding: 2 }}
          />
        </View>
        <Grid
          style={{
            backgroundColor: "white",
            padding: 2,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Row size={1.5}>
            <Row
              size={1.6}
              style={{
                alignItems: "center",
                justifyContent: "center",
                margin: 5,
              }}
            ></Row>
            <Row
              style={{
                alignItems: "center",
                justifyContent: "center",
                margin: 5,
                width: "100%",
              }}
            ></Row>
          </Row>
          <Row size={1.2} style={styles.subheaders}>
            <Col size={2}></Col>

            <Col size={1}>
              <Text style={{ fontWeight: "bold" }}>HOME</Text>
            </Col>

            <Col size={1}>
              <Text style={{ fontWeight: "bold" }}>AWAY</Text>
            </Col>

            <Col size={1}>
              <Text style={{ fontWeight: "bold" }}>ALL</Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col size={2}>
              <Text>Games Played</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.fixtures?.played?.home}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.fixtures?.played?.away}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.fixtures?.played?.total}</Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col size={2}>
              <Text>Wins</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.fixtures?.wins?.home}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.fixtures?.wins?.away}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.fixtures?.wins?.total}</Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col size={2}>
              <Text>Draws</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.fixtures?.draws?.home}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.fixtures?.draws?.away}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.fixtures?.draws?.total}</Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col size={2}>
              <Text>Loses</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.fixtures?.loses?.home}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.fixtures?.loses?.away}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.fixtures?.loses?.total}</Text>
            </Col>
          </Row>
          <Row size={1} style={styles.subheaders}>
            <Col size={2}>
              <Text style={{ fontWeight: "bold" }}>GOALS</Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col size={2}>
              <Text>Goals For</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.goals?.for?.total.home}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.goals?.for?.total.away}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.goals?.for?.total.total}</Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col size={2}>
              <Text>Goals Against</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.goals?.against?.total.home}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.goals?.against?.total.away}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.goals?.against?.total.total}</Text>
            </Col>
          </Row>
          <Row size={1} style={styles.subheaders}>
            <Col size={2}>
              <Text style={{ fontWeight: "bold" }}>GOALS AVERAGE</Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col size={2}>
              <Text>Goals For</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.goals?.for?.average.home}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.goals?.for?.average.away}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.goals?.for?.average.total}</Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col size={2}>
              <Text>Goals Against</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.goals?.against?.average.home}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.goals?.against?.average.away}</Text>
            </Col>
            <Col size={1}>
              <Text>{teamStatsInfo.goals?.against?.average.total}</Text>
            </Col>
          </Row>
        </Grid>
        <Button
          onPress={() => setIsCompare(true)}
          title="Choose a team to compare"
        />
        {isCompare ? (
          <View>
            <View style={{ flexDirection: "row", height: 65 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  height: 30,
                }}
              >
                <View style={{ height: 15 }}>
                  <Text
                    style={{
                      padding: 2,
                      fontWeight: "900",
                      fontSize: "15",
                      height: 40,
                    }}
                  >
                    League
                  </Text>
                </View>
                <CompareLeagueFilter />
              </View>
              <View style={{ flex: 1, alignItems: "center", height: 30 }}>
                <View style={{ height: 15 }}>
                  <Text
                    style={{
                      padding: 2,
                      fontWeight: "900",
                      fontSize: "15",
                      height: 40,
                    }}
                  >
                    Team
                  </Text>
                </View>
                <TeamFilter seasonInfo={seasonInfo} leagueIdInfo={league} />
              </View>
            </View>
            <View>
              <ComparisonTeam seasonInfo={seasonInfo} leagueIdInfo={league} />
            </View>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headers: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subheaders: {
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "lightgreen",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
