import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebase";

import LoginRegisterScreen from "./LoginRegisterScreen";

export default function AccountScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const user = auth?.currentUser;
  console.log(userInfo);

  useEffect(() => {
    db.collection("User Information")
      .doc(user?.uid)
      .get()
      .then((snapshot) => {
        setUserInfo(snapshot.data());
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            db.collection("User Information")
              .doc(user.uid)
              .delete()
              .catch((error) => console.log(error));

            user
              .delete()
              .then(() => {})
              .catch((error) => console.log(error));

            setIsLoggedIn(false);
          },
        },
      ]
    );
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => setIsLoggedIn(false))
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });

    return unsubscribe;
  }, []);

  return !isLoggedIn ? (
    <LoginRegisterScreen />
  ) : (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Hey, {userInfo?.firstName}!</Text>
        <Image
          source={require("../assets/default_pfp.png")}
          style={{
            margin: 10,
            width: 200,
            height: 200,
          }}
        />

        <View style={styles.accountInfo}>
          <Text style={styles.title}>Account Information</Text>
          <Text>First Name: {userInfo?.firstName}</Text>
          <Text>Last Name: {userInfo?.lastName}</Text>
          <Text>Country: {userInfo?.country}</Text>
          <Text>Favorite Team: {userInfo?.favTeam}</Text>
          <Text>Favorite Player: {userInfo?.favPlayer}</Text>
        </View>

        <TouchableOpacity onPress={handleDelete} style={styles.button}>
          <Text style={styles.buttonText}>Delete account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  accountInfo: { marginTop: 20, marginLeft: 10, alignSelf: "flex-start" },
  button: {
    backgroundColor: "red",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
