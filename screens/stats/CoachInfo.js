import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import {
  View,
  Text,
  SafeAreaView,
  Image,
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

export default function CoachInfo() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState("2022");
  const [filter, setFilter] = useState("teams");
  const [singleTeamInfo, setSingleTeamInfo] = useState([]);
  const [coachInfo, setCoachInfo] = useState([]);
  const singleTeamData = useSelector((state) => state.singleScreenData).team
    ?.team;
  const [currentCoachInfo, setCurrentCoachInfo] = useState("");

  useEffect(() => {
    getCoach();
  }, [currentCoachInfo]);

  useEffect(() => {
    getCoachInfo();
  }, [singleTeamData.id]);

  const getCoachInfo = () => {
    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/coachs?team=${singleTeamData.id}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setCoachInfo(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  //   console.log("coachInfo", coachInfo);

  //   const currentCoach = coachInfo.filter((coach) => coach.age === 49);

  //   const currentCoach = coachInfo.filter(
  //     (coach) =>
  //       coach.career(
  //         (eachcareer) =>
  //           eachcareer.end === null && eachcareer.team.id === singleTeamData.id
  //       ) === true
  //   );
  //   const getCoach = () => {
  //     for (let j = 0; j < coachInfo.length; j++) {
  //       const coach = coachInfo[j];
  //       for (let i = 0; i < coach.career.length; i++) {
  //         if (
  //           coach.career[i].team.id === singleTeamData.id &&
  //           coach.career[i].end === null
  //         )
  //           return coach;
  //       }
  //     }
  //   };

  const getCoach = () => {
    for (let j = 0; j < coachInfo.length; j++) {
      const coach = coachInfo[j];
      for (let i = 0; i < coach.career.length; i++) {
        if (
          coach.career[i].team.id === singleTeamData.id &&
          coach.career[i].end === null
        )
          //   return setCurrentCoachInfo(coach);
          return coach;
      }
    }
  };

  console.log(getCoach());

  //   console.log("currentCoachInfo", currentCoachInfo);

  //   const coachName = coachInfo.name;
  //   const coachImageUri = coachInfo.photo;
  //   //   const coachBirth = coachInfo.birth[date];
  //   const coachCountry = coachInfo.nationnality ? coachInfo.nationnality : "";

  return (
    <FlatList
      numColumns={1}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={<View style={{ height: 500 }} />}
      data={[getCoach()]}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: item?.photo,
              height: 100,
              width: 100,
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item?.nationality}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item?.career[0].start} to{" "}
            {item?.career[0].end === null ? "Present" : item?.career[0].end}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    width: 200,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    margin: 5,
    backgroundColor: "white",
  },
  image: {
    alignSelf: "center",
    height: 100,
    width: 100,
  },
});
