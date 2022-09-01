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
import Filters from "../components/Filters";
import SeasonFilter from "../components/SeasonFilter";
import CategoryList from "../components/CategoryList";
import singleScreenData from "../store/singleScreenData";
import { useSelector } from "react-redux";
import CoachButton from "../components/CoachButton";
import { Col, Row, Grid } from "react-native-easy-grid";
import SeasonFilterV2 from "../components/SeasonFilterV2";
export default function ComparisonTeam(props) {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("teams");
  const [venueInfo, setVenueInfo] = useState("");
  const [teamStatsInfo, setTeamStatsInfo] = useState("");
  const [singleTeamInfo, setSingleTeamInfo] = useState([]);
  const [coachId, setCoachId] = useState("");
  const [league, setLeague] = useState("39");

  const singleTeamData = useSelector((state) => state.singleScreenData).team
    ?.team;
  const leagueIdInfo = useSelector((state) => state.leagueId);
  const seasonInfo = useSelector((state) => state.season);

  useEffect(() => {
    getTeamStats();
  }, [singleTeamData.id, seasonInfo]);

  const getTeamStats = () => {
    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/teams/statistics?season=${seasonInfo}&team=${props.team}&league=${leagueIdInfo}`,
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
      <ScrollView>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={styles.headers}>{teamStatsInfo.team?.name}</Text>
          <Image
            source={{ uri: teamStatsInfo.team?.logo }}
            style={{ width: 45, height: 45, margin: 3 }}
          />
        </View>
        <Grid style={{ backgroundColor: "white", padding: 3 }}>
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
              <Text>HOME</Text>
            </Col>

            <Col size={1}>
              <Text>AWAY</Text>
            </Col>

            <Col size={1}>
              <Text>ALL</Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col size={2}>
              <Text>Games played</Text>
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
              <Text style>GOALS</Text>
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
              <Text>GOALS AVERAGE</Text>
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
    backgroundColor: "lightgray",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
