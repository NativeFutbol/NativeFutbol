import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";

export default function PastMatches({ data }) {
  return (
    <FlatList
      numColumns={1}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={<View style={{ height: 625 }} />}
      data={data}
      renderItem={({ item, index }) => (
        <View style={styles.container} key={index}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
              {new Date(item.fixture.date).toDateString()}
            </Text>
            <Text>{item.league.round}</Text>
            <Text style={{ marginBottom: 10 }}>{item.fixture.venue.name}</Text>
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
              margin: 15,
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
        </View>
      )}
    />
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
