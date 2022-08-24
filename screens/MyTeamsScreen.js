import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import Field from "../components/Field";
import BottomSheet from "@gorhom/bottom-sheet";
import PlayersList from "../components/PlayerList";
import DropDownFilter from "../components/DropDownFilter";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../store/myTeamFilterOptions";

export default function MyTeamsScreen() {
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const playerListRef = useRef(null);
  const filterPlayerListRef = useRef(null);

  const myTeamFilters = useSelector((state) => state.myTeamFilters);
  const seasonAndLeague = {
    season: myTeamFilters?.season,
    league: myTeamFilters?.league,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeams(seasonAndLeague));
  }, [dispatch, seasonAndLeague]);

  const selectPlayers = () => {
    playerListRef.current?.expand();
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
          <Text style={{ color: "white", fontWeight: "bold" }}>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => filterPlayerListRef.current?.expand()}
            style={{
              alignItems: "flex-start",
              marginLeft: 30,
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
            onPress={() => playerListRef.current?.close()}
            style={{
              alignItems: "flex-end",
              marginRight: 30,
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

        <PlayersList />
      </BottomSheet>

      <BottomSheet
        ref={filterPlayerListRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
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
