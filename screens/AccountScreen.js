import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebase";

import LoginRegisterScreen from "./LoginRegisterScreen";

export default function AccountScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const userId = auth?.currentUser.uid;
  db.collection("User Information")
    .doc(userId)
    .get()
    .then((snapshot) => {
      setUserInfo(snapshot.data());
    })
    .catch((error) => console.log(error));

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
        <Text>Hey, {userInfo.firstName}!</Text>
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
  button: {
    backgroundColor: "#0782F9",
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
