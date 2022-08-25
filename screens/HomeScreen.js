import { StyleSheet, Text, View } from "react-native";
import React from "react";
import News from "../components/News";
import Games from "../components/Games";

export default function HomeScreen() {
  return (
    <View>
      <News />
      <Games />
    </View>
  );
}

const styles = StyleSheet.create({});
