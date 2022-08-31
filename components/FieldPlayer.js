import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeMyPlayer } from "../store/myPlayers";

export default function FieldPlayer(props) {
  const { player, position } = props;
  const dispatch = useDispatch();

  const removePlayer = () => {
    if (player) {
      dispatch(removeMyPlayer(player));
    }
  };

  return (
    <View>
      <TouchableOpacity style={{ alignItems: "center" }} onPress={removePlayer}>
        {player ? (
          <Image
            source={{
              uri: player.player.photo,
            }}
            style={styles.image}
          />
        ) : (
          <FontAwesome5 name="tshirt" size={20} color={"white"} />
        )}
        <Text
          style={{
            backgroundColor: player ? "orangered" : "black",
            color: "white",
            fontWeight: "bold",
            fontSize: 9,
            padding: 2,
            paddingHorizontal: 7,
          }}
        >
          {player ? player.player.name : position}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#aaa",
  },
});
