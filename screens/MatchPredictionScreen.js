import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import PastMatches from "../components/PastMatches";
import RadarChartPrediction from "../components/RadarChartPrediction";
import BarChartPrediction from "../components/BarChartPrediction";

export default function MatchPredictionScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [matchInfo, setMatchInfo] = useState({});
  const [winnerId, setWinnerId] = useState("");
  const [winnerInfo, setWinnerInfo] = useState({});
  const [isRatings, setIsRatings] = useState(false);
  const [isRadar, setIsRadar] = useState(true);

  const match = useSelector((state) => state.singleScreenData.match);
  const fixtureId = match?.fixture?.id;

  useEffect(() => {
    getPrediction();
  }, []);

  const getPrediction = () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/predictions?fixture=${fixtureId}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMatchInfo(response.data.response[0]);
        setWinnerId(response.data.response[0].predictions?.winner?.id);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getWinner();
  }, [winnerId]);

  const getWinner = () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/teams?id=${winnerId}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setWinnerInfo(response.data.response[0]);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log("matchinfo", matchInfo);
  console.log("winnerinfo", winnerInfo);
  console.log("match", match);

  return (
    <View>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
            {new Date(match.fixture.date).toDateString()}
          </Text>
          <Text style={{ marginBottom: 10 }}>{match.fixture.venue.name}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Home</Text>
          {match.goals.home === 0 || match.goals.home ? (
            <Text>
              {match.goals.home} : {match.goals.away}
            </Text>
          ) : (
            <Text>vs</Text>
          )}
          <Text style={{ fontWeight: "bold" }}>Away</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {match.teams.home.logo ? (
              <Image
                source={{ uri: match.teams.home.logo }}
                style={styles.image}
              />
            ) : (
              <></>
            )}
            <Text>{match.teams.home.name}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            {match.goals.home === 0 || match.teams.away.logo ? (
              <Image
                source={{ uri: match.teams.away.logo }}
                style={styles.image}
              />
            ) : (
              <></>
            )}
            <Text>{match.teams.away.name}</Text>
          </View>
        </View>
      </View>

      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Predicted Winner
      </Text>
      <Image
        style={styles.winnerLogo}
        source={{
          uri: winnerInfo?.team?.logo,
        }}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        {winnerInfo?.team?.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text>Home Wins: {matchInfo?.predictions?.percent?.home}</Text>
        <Text>Draw: {matchInfo?.predictions?.percent?.draw}</Text>
        <Text>Away Wins: {matchInfo?.predictions?.percent?.away}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setIsRatings(false)}>
          <View
            style={[
              styles.buttonContainer2,
              {
                marginRight: 50,
                backgroundColor: isRatings ? "grey" : "orangered",
              },
            ]}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Past Matches
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsRatings(true)}>
          <View
            style={[
              styles.buttonContainer2,
              {
                backgroundColor: isRatings ? "orangered" : "grey",
              },
            ]}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Team Ratings
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {isRatings ? (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => setIsRadar(true)}>
              <View
                style={[
                  styles.buttonContainer,
                  {
                    marginRight: 125,
                    backgroundColor: isRadar ? "orangered" : "grey",
                  },
                ]}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Radar
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsRadar(false)}>
              <View
                style={[
                  styles.buttonContainer,
                  { backgroundColor: isRadar ? "grey" : "orangered" },
                ]}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Bar</Text>
              </View>
            </TouchableOpacity>
          </View>
          {isRadar ? (
            <RadarChartPrediction
              predictionData={matchInfo?.comparison}
              homeTeam={matchInfo?.teams?.home?.name}
              awayTeam={matchInfo?.teams?.away?.name}
            />
          ) : (
            <BarChartPrediction
              data={matchInfo?.comparison}
              homeTeam={matchInfo?.teams?.home?.name}
              awayTeam={matchInfo?.teams?.away?.name}
            />
          )}
        </View>
      ) : (
        <View style={{ marginTop: 10 }}>
          <PastMatches data={matchInfo.h2h} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 5,
  },
  image: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  winnerLogo: {
    alignSelf: "center",
    height: 100,
    width: 100,
  },
  buttonContainer2: {
    borderRadius: 20,
    padding: 6,
    marginTop: 10,
    width: 125,
    alignItems: "center",
  },
  buttonContainer: {
    borderRadius: 20,
    marginTop: 10,
    width: 60,
    alignItems: "center",
  },
});
