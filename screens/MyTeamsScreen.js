import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import Field from "../components/Field";
import BottomSheet from "@gorhom/bottom-sheet";
import PlayersList from "../components/PlayerList";
import DropDownFilter from "../components/DropDownFilter";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../store/myTeamFilterOptions";
import { resetMyPlayer } from "../store/myPlayers";
import FormationOption from "../components/FormationOption";
import { ScrollView } from "react-native-gesture-handler";
import SearchBar from "react-native-dynamic-search-bar";
import { useState } from "react";

export default function MyTeamsScreen() {
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const playerListRef = useRef(null);
  const filterPlayerListRef = useRef(null);
  const filterFormationRef = useRef(null);

  const myTeamFilters = useSelector((state) => state.myTeamFilters);
  const seasonAndLeague = {
    season: myTeamFilters?.season,
    league: myTeamFilters?.league,
  };

  const [searchPlayerName, setSearchPlayerName] = useState("");

  const searchBarChangeHanlder = (text) => {
    setSearchPlayerName(text);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeams(seasonAndLeague));
  }, [dispatch, seasonAndLeague]);

  const selectPlayers = () => {
    playerListRef.current?.expand();
  };
  const selectFormation = () => {
    filterFormationRef.current?.expand();
  };

  return (
    <View style={styles.container}>
      <Field />

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={selectPlayers}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Select Players
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={{ color: "white", fontWeight: "bold" }}
            onPress={selectFormation}
          >
            Select Formation
          </Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={playerListRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <View style={{ marginBottom: 20 }}>
          <SearchBar
            placeholder="Search by Players Name..."
            // onPress={() => alert("onPress")}
            onChangeText={searchBarChangeHanlder}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => filterPlayerListRef.current?.expand()}
            style={{
              alignItems: "flex-start",
              marginLeft: 15,
              borderWidth: 1,
              borderRadius: 20,
              padding: 3,
              width: "25%",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch(resetMyPlayer())}
            style={{
              alignItems: "flex-start",
              borderWidth: 1,
              borderRadius: 20,
              padding: 3,
              width: "25%",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => playerListRef.current?.close()}
            style={{
              alignItems: "flex-end",
              marginRight: 15,
              borderWidth: 1,
              borderRadius: 20,
              padding: 3,
              width: "25%",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>Close</Text>
          </TouchableOpacity>
        </View>

        <PlayersList searchPlayerName={searchPlayerName} />
      </BottomSheet>

      <BottomSheet
        ref={filterPlayerListRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => filterPlayerListRef.current?.close()}
            style={{
              marginRight: 30,
              borderWidth: 1,
              borderRadius: 20,
              padding: 3,
              width: "25%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <DropDownFilter label={"season"} />
          <DropDownFilter label={"league"} />
          <DropDownFilter label={"team"} />
          <DropDownFilter label={"position"} />
        </View>
      </BottomSheet>

      <BottomSheet
        ref={filterFormationRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            onPress={() => filterFormationRef.current?.close()}
            style={{
              marginRight: 30,
              borderWidth: 1,
              borderRadius: 20,
              padding: 3,
              width: "25%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>Close</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <FormationOption
            type={"3      -      3      -      4"}
            filterFormationRef={filterFormationRef}
          />
          <FormationOption
            type={"4      -      2      -      4"}
            filterFormationRef={filterFormationRef}
          />
          <FormationOption
            type={"4      -      3      -      3"}
            filterFormationRef={filterFormationRef}
          />
          <FormationOption
            type={"5      -      3      -      2"}
            filterFormationRef={filterFormationRef}
          />
          <FormationOption
            type={"3      -      4      -      3"}
            filterFormationRef={filterFormationRef}
          />
          <FormationOption
            type={"3      -      5      -      2"}
            filterFormationRef={filterFormationRef}
          />
          <FormationOption
            type={"3      -      6      -      1"}
            filterFormationRef={filterFormationRef}
          />
          <FormationOption
            type={"4      -      5      -      1"}
            filterFormationRef={filterFormationRef}
          />
          <FormationOption
            type={"5      -      4      -      1"}
            filterFormationRef={filterFormationRef}
          />
          <FormationOption
            type={"4      -      6      -      0"}
            filterFormationRef={filterFormationRef}
          />
        </ScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#72cc5e",
  },

  buttonContainer: {
    backgroundColor: "black",
    width: "40%",
    margin: 20,
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
  },
});
