import { Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import AllCountriesScreen from "../screens/stats/AllCountriesScreen";
import AccountScreen from "../screens/AccountScreen";

const Tab = createBottomTabNavigator();

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
          tabBarIcon: () => <Icon icon="home" />,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={AllCountriesScreen}
        options={{
          tabBarLabel: "Stats",
          tabBarIcon: () => <Icon icon="chart-bar" />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: () => <Icon icon="user" />,
        }}
      />
    </Tab.Navigator>
  );
}

const Icon = (props) => (
  <TouchableOpacity>
    <FontAwesome5
      name={props.icon}
      size={25}
      style={{ marginBottom: 3, alignSelf: "center" }}
    />
  </TouchableOpacity>
);
