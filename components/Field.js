import { ImageBackground, StyleSheet, View } from "react-native";

import field from "../assets/field.jpg";
import FieldPlayer from "./FieldPlayer";

const players = {
  Attacker: [null, null, null],
  Midfielder: [null, null, null],
  Defender: [null, null, null, null],
  Goalkeeper: [null],
};

export default function Field() {
  return (
    <View>
      <ImageBackground
        source={field}
        style={{
          width: "100%",
          aspectRatio: 2 / 3,
          justifyContent: "space-around",
          alignItems: "center",
        }}
        resizeMode="contain"
      >
        {Object.keys(players).map((position, idx) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
            key={idx}
          >
            {players[position].map((player, idx) => (
              <FieldPlayer key={idx} player={player} position={position} />
            ))}
          </View>
        ))}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({});
