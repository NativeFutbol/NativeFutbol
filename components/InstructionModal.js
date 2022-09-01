import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT_MODAL = 350;

export default function InstructionModal({ toggleModal }) {
  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            marginRight: 16,
          }}
        >
          <TouchableOpacity
            style={{
              paddingTop: 3,
            }}
            onPress={() => toggleModal()}
          >
            <MaterialIcons name="cancel-presentation" size={32} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.textView}>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={[
                styles.text,
                { fontSize: 18, fontWeight: "bold", color: "black" },
              ]}
            >
              Instructions
            </Text>
          </View>
          <View style={{ width: "100%", padding: 9 }}>
            <Text style={styles.text}>1. Pick your Formation</Text>
            <Text style={styles.text}>
              2. Apply Filters (e.g. league, team)
            </Text>
            <Text style={styles.text}>3. Pick your Players</Text>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.text}>
                * Logged-In users should click{" "}
                <Text style={{ fontWeight: "bold", color: "orangered" }}>
                  Save
                </Text>{" "}
                button if they wish to revisit the formation and the players
                chosen even after exiting the app.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    height: HEIGHT_MODAL,
    width: WIDTH - 80,
    paddingTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    // opacity: 0.8,
  },

  textView: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});
