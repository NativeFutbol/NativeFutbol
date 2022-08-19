import { Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import AllCountriesScreen from "../screens/stats/AllCountriesScreen";
import AllLeaguesScreen from "../screens/stats/AllLeaguesScreen";
import AllTeamsScreen from "../screens/stats/AllTeamsScreen";
import AllPlayersScreen from "../screens/stats/AllPlayersScreen";
import AccountScreen from "../screens/AccountScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StatsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="AllCountries" component={AllCountriesScreen} />
      <Stack.Screen name="AllLeagues" component={AllLeaguesScreen} />
      <Stack.Screen name="AllPlayers" component={AllPlayersScreen} />
      <Stack.Screen name="AllTeams" component={AllTeamsScreen} />
    </Stack.Navigator>
  );
};

export default function FooterTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsStack}
        options={{
          tabBarLabel: "Stats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
