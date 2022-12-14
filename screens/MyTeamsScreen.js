import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import Field from "../components/Field";
import BottomSheet from "@gorhom/bottom-sheet";
import PlayersList from "../components/PlayerList";
import DropDownFilter from "../components/DropDownFilter";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../store/myTeamFilterOptions";
import { resetMyPlayer, setMyPlayersStore } from "../store/myPlayers";
import { setMyFormationStore } from "../store/myFormation";
import FormationOption from "../components/FormationOption";
import { ScrollView } from "react-native-gesture-handler";
import SearchBar from "react-native-dynamic-search-bar";
import { useState } from "react";
import { auth, db } from "../firebase";
import Modal from "react-native-modal";
import InstructionModal from "../components/InstructionModal";

export default function MyTeamsScreen({ navigation, route }) {
  const toggleModal = () => {
    navigation.setParams({
      isInstructionOpen: !route.params.isInstructionOpen,
    });
  };

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

  const myFormation = useSelector((state) => state.myFormation);
  const myPlayers = useSelector((state) => state.myPlayers);
  const [currentUser, setCurrentUser] = useState({});

  auth.onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    }
  });

  const saveChanges = () => {
    Alert.alert(
      "Save Dream Team",
      "Are you sure you want to save your Dream Team?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            db.collection("User Information")
              .doc(currentUser.uid)
              .update({
                myFormation,
                myPlayers,
              })
              .catch((error) => alert(error.message));
          },
        },
      ]
    );
  };

  useEffect(() => {
    db.collection("User Information")
      .doc(currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.data()) {
          dispatch(setMyFormationStore(snapshot.data()?.myFormation));
          dispatch(setMyPlayersStore(snapshot.data()?.myPlayers));
        } else {
          // console.log("No data available");
        }
      })
      .catch((error) => alert(error.message));
  }, [currentUser]);

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={route.params?.isInstructionOpen}>
        <View style={{ flex: 1 }}>
          <InstructionModal toggleModal={toggleModal} />
        </View>
      </Modal>

      <View style={styles.container}>
        <Field />

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              auth.currentUser
                ? { padding: 5, margin: 5 }
                : { padding: 10, margin: 20 },
            ]}
            onPress={selectPlayers}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Select Players
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              auth.currentUser
                ? { padding: 5, margin: 5 }
                : { padding: 10, margin: 20 },
            ]}
            onPress={selectFormation}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Select Formation
            </Text>
          </TouchableOpacity>
        </View>

        {auth.currentUser ? (
          <TouchableOpacity
            onPress={saveChanges}
            style={[styles.buttonContainer, { padding: 5, margin: 5 }]}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <BottomSheet
          ref={playerListRef}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
        >
          <View style={{ marginBottom: 20 }}>
            <SearchBar
              placeholder="Search by Players Name..."
              onChangeText={searchBarChangeHanlder}
              onClearPress={() => setSearchPlayerName("")}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => {
                filterPlayerListRef.current?.expand();
                Keyboard.dismiss();
              }}
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
              onPress={() => {
                dispatch(resetMyPlayer());
                Keyboard.dismiss();
              }}
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
              onPress={() => {
                playerListRef.current?.close();
                Keyboard.dismiss();
              }}
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
            <View style={{ marginBottom: 25 }}>
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                Filter your Player List, Here!
              </Text>
            </View>
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
            <View style={{ marginVertical: 12, alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                Select your Formation!
              </Text>
            </View>
            <View style={{ alignItems: "center", marginBottom: 3 }}>
              <Text style={{ fontSize: 14, fontWeight: "400" }}>
                ex. 3-3-4 (attackers - midfielders - defenders)
              </Text>
            </View>

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
    alignItems: "center",
    borderRadius: 50,
  },
});
