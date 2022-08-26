import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function LeagueCards() {
  const mostCardsData = useSelector((state) => state.mostCardsData);

  //   console.log(mostCardsData.red);
  //   console.log(mostCardsData.yellow[0]);

  const [isRed, setIsRed] = useState(false);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setIsRed(false)}>
          <View
            style={[
              styles.buttonContainer,
              {
                marginRight: 50,
                backgroundColor: isRed ? "grey" : "orangered",
              },
            ]}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Yellow</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsRed(true)}>
          <View
            style={[
              styles.buttonContainer,
              { backgroundColor: isRed ? "orangered" : "grey" },
            ]}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Red</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexGrow: 1 }}>
        <View style={[styles.header, { marginHorizontal: 10 }]}>
          <Text style={[styles.fontWeight]}>Player</Text>
          <Text style={[styles.fontWeight]}>
            {isRed ? "Red Cards" : "Yellow Cards"}
          </Text>
        </View>

        <FlatList
          data={isRed ? mostCardsData.red : mostCardsData.yellow}
          ListFooterComponent={<View style={{ height: 200 }} />}
          renderItem={({ item }) => {
            return (
              <View style={[styles.header]}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={styles.logo}
                    source={{ uri: item.player.photo, width: 40, height: 40 }}
                  />

                  <View style={{ alignItems: "flex-start" }}>
                    <Text style={styles.name}>{item.player.name}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        style={styles.logo}
                        source={{
                          uri: item.statistics[0].team.logo,
                          width: 20,
                          height: 20,
                        }}
                      />
                      <Text style={styles.team}>
                        {item.statistics[0].team.name}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={{ marginRight: 10 }}>
                  {isRed
                    ? item.statistics[0].cards.red
                    : item.statistics[0].cards.yellow}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    padding: 5,
    margin: 5,
    justifyContent: "space-between",
  },

  fontWeight: {
    fontWeight: "bold",
  },

  logo: {
    marginRight: 10,
  },

  name: {
    fontSize: 14,
    margin: 1,
    marginBottom: 3,
  },

  team: {
    fontSize: 13,
  },

  buttonContainer: {
    borderRadius: 20,
    padding: 6,
    marginTop: 10,
    width: 70,
    alignItems: "center",
  },
});

//
