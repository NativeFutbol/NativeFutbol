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
import { Col, Row, Grid } from "react-native-easy-grid";

export default function TeamStats() {
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
  }, [singleTeamData.id, season]);

  const getTeamStats = () => {
    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/teams/statistics?season=${seasonInfo}&team=${singleTeamData.id}&league=${leagueIdInfo}`,
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
  // return (
  //   // <View>
  //   //   <View style={{ flex: 1 }}>
  //   //     <View
  //   //       style={{
  //   //         flexDirection: "row",
  //   //         justifyContent: "center",
  //   //         alignItems: "center",
  //   //         justifyContent: "center",
  //   //       }}
  //   //     >
  //   //       <Text style={styles.team}>{teamStatsInfo.team?.name}</Text>
  //   //       <Image style={styles.logo} />
  //   //     </View>
  //   //     <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
  //   //       <Text style={styles.fontWeight}>Home</Text>
  //   //       <Text style={styles.fontWeight}>Away</Text>
  //   //       <Text style={styles.fontWeight}>All</Text>
  //   //     </View>
  //   //   </View>

  //   //   <FlatList
  //   //     data={[teamStatsInfo]}
  //   //     ListFooterComponent={<View style={{ height: 50 }} />}
  //   //     renderItem={({ item }) => {
  //   //       return (
  //   //         <View style={{ flex: 1 }}>
  //   //           <View style={{ flexDirection: "row" }}>
  //   //             <Text style={styles.team}>{item.team?.name}</Text>
  //   //             <Image
  //   //               source={{ uri: item.team?.logo, width: 50, height: 50 }}
  //   //               style={styles.logo}
  //   //             />
  //   //           </View>
  //   //           <View style={{ flexDirection: "row" }}>
  //   //             <Text style={styles.stat}>Games played</Text>
  //   //             <Text style={styles.stat}>{item.fixtures?.played?.home}</Text>
  //   //             <Text style={styles.stat}>{item.fixtures?.played?.away}</Text>
  //   //             <Text style={styles.stat}>{item.fixtures?.played?.total}</Text>
  //   //           </View>

  //   //           <View style={{ flexDirection: "row" }}>
  //   //             <Text style={styles.stat}>Wins</Text>
  //   //             <Text style={styles.stat}>{item.fixtures?.wins?.home}</Text>
  //   //             <Text style={styles.stat}>{item.fixtures?.wins?.away}</Text>
  //   //             <Text style={styles.stat}>{item.fixtures?.wins?.total}</Text>
  //   //           </View>
  //   //           <View style={{ flexDirection: "row" }}>
  //   //             <Text style={styles.stat}>Draws</Text>
  //   //             <Text style={styles.stat}>{item.fixtures?.draws?.home}</Text>
  //   //             <Text style={styles.stat}>{item.fixtures?.draws?.away}</Text>
  //   //             <Text style={styles.stat}>{item.fixtures?.draws?.total}</Text>
  //   //           </View>
  //   //           <View style={{ flexDirection: "row" }}>
  //   //             <Text style={styles.stat}>loses</Text>
  //   //             <Text style={styles.stat}>{item.fixtures?.loses?.home}</Text>
  //   //             <Text style={styles.stat}>{item.fixtures?.loses?.away}</Text>
  //   //             <Text style={styles.stat}>{item.fixtures?.loses?.total}</Text>
  //   //           </View>
  //   //           <Text>Goals</Text>
  //   //           <View style={{ flexDirection: "row" }}>
  //   //             <Text>Goals For</Text>
  //   //             <Text style={styles.stat}>{item.goals?.for?.total?.home}</Text>
  //   //             <Text style={styles.stat}>{item.goals?.for?.total?.away}</Text>
  //   //             <Text style={styles.stat}>{item.goals?.for?.total?.total}</Text>
  //   //           </View>
  //   //           <View>
  //   //             <View style={{ flexDirection: "row" }}>
  //   //               <Text>Goals Against</Text>
  //   //               <Text style={styles.stat}>
  //   //                 {item.goals?.against?.total?.home}
  //   //               </Text>
  //   //               <Text style={styles.stat}>
  //   //                 {item.goals?.against?.total?.away}
  //   //               </Text>
  //   //               <Text style={styles.stat}>
  //   //                 {item.goals?.against?.total?.total}
  //   //               </Text>
  //   //             </View>
  //   //           </View>
  //   //           <View>
  //   //             <Text>Goals Averages</Text>
  //   //             <View style={{ flexDirection: "row" }}>
  //   //               <Text>Goals For</Text>
  //   //               <Text style={styles.stat}>
  //   //                 {item.goals?.for?.average?.home}
  //   //               </Text>
  //   //               <Text style={styles.stat}>
  //   //                 {item.goals?.for?.average?.away}
  //   //               </Text>
  //   //               <Text style={styles.stat}>
  //   //                 {item.goals?.for?.average?.total}
  //   //               </Text>
  //   //             </View>
  //   //             <View>
  //   //               <View style={{ flexDirection: "row" }}>
  //   //                 <Text>Goals Against</Text>
  //   //                 <Text style={styles.stat}>
  //   //                   {item.goals?.against?.average?.home}
  //   //                 </Text>
  //   //                 <Text style={styles.stat}>
  //   //                   {item.goals?.against?.average?.away}
  //   //                 </Text>
  //   //                 <Text style={styles.stat}>
  //   //                   {item.goals?.against?.average?.total}
  //   //                 </Text>
  //   //               </View>
  //   //             </View>
  //   //           </View>
  //   //         </View>
  //   //       );
  //   //     }}
  //   //     keyExtractor={(item, index) => index}
  //   //   />
  //   // </View>

  // );
  console.log("teamStatInfo-----", teamStatsInfo.goals?.for?.total);

  return (
    <Grid>
      <Row size={3}>
        <Text>Name</Text>
      </Row>
      <Row size={2}>
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
      <Row size={1}>
        <Col size={2}>
          <Text>GOALS</Text>
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
      <Row size={1}></Row>
      <Row size={1}></Row>
      <Row size={1}></Row>
      <Row size={1}></Row>
      <Row size={1}></Row>
    </Grid>
  );
}

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     borderBottomWidth: 0.5,
//     borderBottomColor: "grey",
//     padding: 5,
//     margin: 5,
//   },

//   fontWeight: {
//     fontWeight: "bold",
//   },

//   logo: {
//     width: 20,
//     height: 20,
//   },

//   team: {
//     fontSize: 12,
//   },

//   stat: {
//     fontSize: 12,
//     flex: 1,
//     alignContent: "center",
//     alignItems: "center",
//     justifyContent: "cneter",
//   },
// });

//
