import { Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default class FooterTabs extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          marginHorizontal: 30,
          justifyContent: "space-between",
        }}
      >
        <Icon icon="home" text="Home" />
        <Icon icon="chart-bar" text="Stats" />
        <Icon icon="user" text="Account" />
      </View>
    );
  }
}

const Icon = (props) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{ marginBottom: 3, alignSelf: "center" }}
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);
