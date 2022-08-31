import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import AllCountriesScreen from "../screens/stats/AllCountriesScreen";
import AllLeaguesScreen from "../screens/stats/AllLeaguesScreen";
import AllTeamsScreen from "../screens/stats/AllTeamsScreen";
import AllPlayersScreen from "../screens/stats/AllPlayersScreen";
import SingleCountryScreen from "../screens/stats/SingleCountryScreen";
import SingleLeagueScreen from "../screens/stats/SingleLeagueScreen";
import SingleTeamScreen from "../screens/stats/SingleTeamScreen";
import AccountScreen from "../screens/AccountScreen";
import SinglePlayerScreen from "../screens/stats/SinglePlayerScreen";
import LeagueStandingsScreen from "../screens/stats/LeagueStandingsScreen";
import LeagueGoals from "../screens/stats/LeagueGoals";
import LeagueAssists from "../screens/stats/LeagueAssists";
import LeagueCards from "../screens/stats/LeagueCards";
import { SvgUri } from "react-native-svg";
import MyTeamsScreen from "../screens/MyTeamsScreen";
import CoachInfo from "../screens/stats/CoachInfo";
import Venue from "../screens/stats/Venue";
import TeamStats from "../screens/stats/TeamStats";
import LeagueCharts from "../screens/stats/LeagueCharts";
import TopPlayersScreen from "../screens/stats/TopPlayersScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StatsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="AllCountries"
        component={AllCountriesScreen}
        options={() => {
          return {
            title: "All Countries",
          };
        }}
      />
      <Stack.Screen
        name="AllLeagues"
        component={AllLeaguesScreen}
        options={() => {
          return {
            title: "All Leagues",
          };
        }}
      />
      <Stack.Screen
        name="AllTeams"
        component={AllTeamsScreen}
        options={() => {
          return {
            title: "All Teams",
          };
        }}
      />
      <Stack.Screen
        name="AllPlayers"
        component={AllPlayersScreen}
        options={() => {
          return {
            title: "All Players",
          };
        }}
      />
      <Stack.Screen
        name="CoachInfo"
        component={CoachInfo}
        options={() => {
          return {
            title: "Current Coach Info",
          };
        }}
      />
      <Stack.Screen name="Venue" component={Venue} />
      <Stack.Screen name="TeamStats" component={TeamStats} />
      <Stack.Screen name="TopPlayersScreen" component={TopPlayersScreen} />
      <Stack.Screen
        name="SingleCountry"
        component={SingleCountryScreen}
        options={({ route }) => {
          const name = route.params.name;
          const flag = route.params.flag;

          return {
            title: name,
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
            headerRight: () => {
              return <SvgUri uri={flag} width={30} height={30} />;
            },
          };
        }}
      />
      <Stack.Screen
        name="SingleLeague"
        component={SingleLeagueScreen}
        options={({ route }) => {
          const name = route.params.league.name;
          const logo = route.params.league.logo;

          return {
            title: name,
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
            headerRight: () => {
              return <Image source={{ uri: logo, width: 30, height: 30 }} />;
            },
          };
        }}
      />
      <Stack.Screen
        name="SingleTeam"
        component={SingleTeamScreen}
        options={({ route }) => {
          const name = route.params.team.name;
          const logo = route.params.team.logo;

          return {
            title: name,
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
            headerRight: () => {
              return <Image source={{ uri: logo, width: 30, height: 30 }} />;
            },
          };
        }}
      />
      <Stack.Screen
        name="SinglePlayer"
        component={SinglePlayerScreen}
        options={({ route }) => {
          const name = route.params.player.name;

          return {
            title: name,
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
          };
        }}
      />
      <Stack.Screen
        name="LeagueStandings"
        component={LeagueStandingsScreen}
        options={({ route }) => {
          const season = route.params.season;
          const name = route.params.name;
          const logo = route.params.logo;

          return {
            title: name + " - " + season,
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
            headerRight: () => {
              return (
                <View>
                  <Image source={{ uri: logo, width: 30, height: 30 }} />
                </View>
              );
            },
          };
        }}
      />
      <Stack.Screen
        name="LeagueGoals"
        component={LeagueGoals}
        options={({ route }) => {
          const season = route.params.season;
          const name = route.params.name;
          const logo = route.params.logo;

          return {
            title: name + " Top Scorers " + " - " + season,
            headerTitleStyle: {
              fontSize: 13,
              fontWeight: "bold",
            },
            headerRight: () => {
              return (
                <View>
                  <Image source={{ uri: logo, width: 20, height: 20 }} />
                </View>
              );
            },
          };
        }}
      />
      <Stack.Screen
        name="LeagueAssists"
        component={LeagueAssists}
        options={({ route }) => {
          const season = route.params.season;
          const name = route.params.name;
          const logo = route.params.logo;

          return {
            title: name + " Top Assists " + " - " + season,
            headerTitleStyle: {
              fontSize: 13,
              fontWeight: "bold",
            },
            headerRight: () => {
              return (
                <View>
                  <Image source={{ uri: logo, width: 20, height: 20 }} />
                </View>
              );
            },
          };
        }}
      />
      <Stack.Screen
        name="LeagueCards"
        component={LeagueCards}
        options={({ route }) => {
          const season = route.params.season;
          const name = route.params.name;
          const logo = route.params.logo;

          return {
            title: name + " Red/Yellow Cards " + " - " + season,
            headerTitleStyle: {
              fontSize: 13,
              fontWeight: "bold",
            },
            headerRight: () => {
              return (
                <View>
                  <Image source={{ uri: logo, width: 20, height: 20 }} />
                </View>
              );
            },
          };
        }}
      />

      <Stack.Screen
        name="LeagueCharts"
        component={LeagueCharts}
        options={({ route }) => {
          const season = route.params.season;
          const name = route.params.name;
          const logo = route.params.logo;

          return {
            // title: "League - Standings/Total Points - Last 4 Years ",
            headerTitle: () => (
              <View style={{ height: 100 }}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  {`${name} (Last 4 yrs)`}
                </Text>
                <View style={{ marginTop: 3 }}>
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                    {`Standings / Total Points Trend`}
                  </Text>
                </View>
                {/* <View style={{ marginTop: 3 }}>
                  <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    (Last 4 Years)
                  </Text>
                </View> */}
              </View>
            ),
            headerTitleStyle: {
              fontSize: 13,
              fontWeight: "bold",
            },
            headerRight: () => {
              return (
                <View>
                  <Image source={{ uri: logo, width: 20, height: 20 }} />
                </View>
              );
            },
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default function FooterTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        headerShown: true,
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
          title: "Welcome to Native Futbol!",
          headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center",
          },
          headerTitleAlign: "center",
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
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyTeam"
        component={MyTeamsScreen}
        options={{
          tabBarLabel: "My Team",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="soccer-field"
              color={color}
              size={size}
            />
          ),
          title: "My Dream Team",
          headerTitleStyle: {
            fontWeight: "bold",
            textAlign: "center",
          },
          headerTitleAlign: "center",
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
