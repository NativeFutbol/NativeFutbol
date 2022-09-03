import { ImageBackground, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import field from "../assets/field.jpg";
import FieldPlayer from "./FieldPlayer";

export default function Field() {
  const myPlayers = useSelector((state) => state.myPlayers);
  const myFormation = useSelector((state) => state.myFormation);

  const positions = ["Attacker", "Midfielder", "Defender", "Goalkeeper"];
  const playersGroupedByFormation = {};

  positions.forEach((position) => {
    playersGroupedByFormation[position] = myPlayers.filter(
      (player) => player.statistics[0].games.position === position
    );

    for (
      let i = playersGroupedByFormation[position].length;
      i < myFormation[position];
      i++
    ) {
      playersGroupedByFormation[position].push(null);
    }
  });

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
        {Object.keys(playersGroupedByFormation).map((position, idx) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
            key={idx}
          >
            {playersGroupedByFormation[position].map((player, idx) => (
              <FieldPlayer key={idx} player={player} position={position} />
            ))}
          </View>
        ))}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({});
