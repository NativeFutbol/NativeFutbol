import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useMemo, useRef } from "react";
import Field from "../components/Field";
import BottomSheet from "@gorhom/bottom-sheet";

export default function MyTeamsScreen() {
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const sheetRef = useRef(null);

  const selectPlayers = () => {
    sheetRef.current?.expand();
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
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <TouchableOpacity onPress={() => sheetRef.current?.close()}>
          <Text>Close</Text>
        </TouchableOpacity>
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
