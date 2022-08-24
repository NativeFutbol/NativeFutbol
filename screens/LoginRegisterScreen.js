import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");
const data = [
  { name: "Login", key: 1, ref: React.createRef() },
  { name: "Register", key: 2, ref: React.createRef() },
];

const Tab = React.forwardRef(({ item, onItemPress }, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({ measures, scrollX }) => {
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        height: 4,
        width: indicatorWidth,
        left: 0,
        backgroundColor: "black",
        bottom: -10,
        transform: [
          {
            translateX,
          },
        ],
      }}
    ></Animated.View>
  );
};

const Tabs = ({ data, scrollX, onItemPress }) => {
  const measures = [
    { height: 24, width: 50.333343505859375, x: 95.66666412353516, y: 0 },
    { height: 24, width: 76.6666259765625, x: 241.6666717529297, y: 0 },
  ];

  return (
    <View style={{ position: "absolute", top: 10, width }}>
      <View
        style={{
          justifyContent: "space-evenly",
          flex: 1,
          flexDirection: "row",
        }}
      >
        {data.map((item, index) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>
      <Indicator measures={measures} scrollX={scrollX} />
    </View>
  );
};

export default function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [favTeam, setFavTeam] = useState("N/A");
  const [favPlayer, setFavPlayer] = useState("N/A");
  const [pfpUrl, setPfpUrl] = useState("");
  const ref = useRef();

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const onItemPress = React.useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });

  const handleSignUp = () => {
    if (firstName === "") {
      alert("Please enter a first name!");
    } else if (lastName === "") {
      alert("Please enter a last name!");
    } else if (country === "") {
      alert("Please enter a country!");
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;

          db.collection("User Information").doc(`${user.uid}`).set({
            firstName,
            lastName,
            country,
            favPlayer,
            favTeam,
            pfpUrl,
          });
        })
        .catch((error) => alert(error.message));
    }
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  return (
    <Animated.FlatList
      ref={ref}
      data={data}
      keyExtractor={(item) => item.key}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      bounces={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      renderItem={({ item }) => {
        return item.name === "Login" ? (
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                secureTextEntry
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        ) : (
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={(text) =>
                  setFirstName(text.charAt(0).toUpperCase() + text.slice(1))
                }
                style={styles.input}
              />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={(text) =>
                  setLastName(text.charAt(0).toUpperCase() + text.slice(1))
                }
                style={styles.input}
              />
              <TextInput
                placeholder="Country"
                value={country}
                onChangeText={(text) =>
                  setCountry(text.charAt(0).toUpperCase() + text.slice(1))
                }
                style={styles.input}
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                secureTextEntry
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
  },
  inputContainer: { width: "80%" },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
