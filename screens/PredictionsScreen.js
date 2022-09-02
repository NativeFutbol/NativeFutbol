import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FOOTBALL_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import ModalDropdown from "react-native-modal-dropdown";
import { Ionicons } from "@expo/vector-icons";

import { setMatchScreenData } from "../store/singleScreenData";
import { apiFootballDummyNextMatches } from "../constants/apiFootballDummyData";
import LoadingOverlay from "../components/LoadingOverlay";

export default function PredictionsScreen() {
  const [league, setLeague] = useState("Premier League");
  const [isLoading, setIsLoading] = useState(false);
  const [nextGames, setNextGames] = useState(apiFootballDummyNextMatches);

  const myTeamsFilterOptions = useSelector(
    (state) => state.myTeamFilterOptions
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dropDownRef = useRef(null);

  const findId = (value) => {
    return Object.keys(myTeamsFilterOptions?.league).find(
      (key) => myTeamsFilterOptions?.league[key] === league
    );
  };

  useEffect(() => {
    getMatches();
  }, [league]);

  const getMatches = () => {
    setIsLoading(true);

    const leagueId = findId(league);
    const season = 2022;

    const FOOTBALL_API_URL = `https://v3.football.api-sports.io`;
    const baseUrl = `${FOOTBALL_API_URL}/fixtures?season=${season}&league=${leagueId}`;

    const optionForNextMatches = (next = 5) => {
      return {
        method: "GET",
        url: `${baseUrl}&next=${next}`,
        headers: {
          "X-RapidAPI-Key": FOOTBALL_API_KEY,
          "X-RapidAPI-Host": "v3.football.api-sports.io",
        },
      };
    };

    const getNextMatches = axios.request(optionForNextMatches("20"));

    axios.all([getNextMatches]).then(
      axios.spread((...matches) => {
        const nextMatches = matches[0].data.response;

        if (nextMatches && nextMatches.length) {
          setNextGames(nextMatches);
        }

        setIsLoading(false);
      })
    );
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            padding: 10,
          }}
        >
          Upcoming Matches
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Image
              source={{
                uri: nextGames[0]?.league?.logo,
                width: 20,
                height: 20,
              }}
              style={{ marginRight: 5 }}
            />
            <TouchableOpacity onPress={() => dropDownRef.current.show()}>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {nextGames[0]?.league?.name}
              </Text>
            </TouchableOpacity>

            <ModalDropdown
              ref={dropDownRef}
              options={[
                "Premier League",
                "Bundesliga",
                "Ligue 1",
                "La Liga",
                "Serie A",
              ]}
              defaultValue={""}
              style={{
                borderBottomWidth: 0.2,
                borderBottomColor: "orangered",
              }}
              textStyle={{
                fontSize: 15,
                fontWeight: "bold",
                marginRight: 3,
              }}
              // dropdownStyle={{ height: 200 }}
              dropdownTextStyle={{
                width: 200,
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
              }}
              onSelect={(idx, value) => {
                setLeague(value);
              }}
              renderRightComponent={() => (
                <Ionicons
                  name="caret-down-sharp"
                  color={"orangered"}
                  size={16}
                />
              )}
            />
          </View>
        </View>
        <FlatList
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={{ height: 160 }} />}
          data={nextGames}
          renderItem={({ item, index }) => (
            <View style={styles.container} key={index}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MatchPrediction", item);
                  dispatch(setMatchScreenData(item));
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
                    {new Date(item.fixture.date).toDateString()}
                  </Text>
                  <Text style={{ marginBottom: 5 }}>
                    {item.fixture.venue.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Home</Text>
                  {item.goals.home === 0 || item.goals.home ? (
                    <Text>
                      {item.goals.home} : {item.goals.away}
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
                    {item.teams.home.logo ? (
                      <Image
                        source={{ uri: item.teams.home.logo }}
                        style={styles.image}
                      />
                    ) : (
                      <></>
                    )}
                    <Text>{item.teams.home.name}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    {item.goals.home === 0 || item.teams.away.logo ? (
                      <Image
                        source={{ uri: item.teams.away.logo }}
                        style={styles.image}
                      />
                    ) : (
                      <></>
                    )}
                    <Text>{item.teams.away.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    margin: 5,
    backgroundColor: "white",
  },
  image: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
});
