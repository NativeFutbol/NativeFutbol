import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebase";

import LoginRegisterScreen from "./LoginRegisterScreen";

export default function AccountScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [lastName, setLastName] = useState(userInfo?.lastName);
  const [country, setCountry] = useState(userInfo?.country);
  const [favTeam, setFavTeam] = useState(userInfo?.favTeam);
  const [favPlayer, setFavPlayer] = useState(userInfo?.favPlayer);
  const [pfpUrl, setPfpUrl] = useState(userInfo?.pfpUrl);

  const user = auth?.currentUser;
  console.log(userInfo);

  const updates = useEffect(() => {
    db.collection("User Information")
      .doc(user?.uid)
      .get()
      .then((snapshot) => {
        setUserInfo(snapshot.data());
        setFirstName(userInfo?.firstName);
        setLastName(userInfo?.lastName);
        setCountry(userInfo?.country);
        setFavTeam(userInfo?.favTeam);
        setFavPlayer(userInfo?.favPlayer);
        setPfpUrl(userInfo?.pfpUrl);
      })
      .catch((error) => console.log(error));
  }, [isLoggedIn, modalVisible]);

  const handleUpdate = () => {
    if (!firstName) {
      alert("Please enter a first name!");
    } else if (!lastName) {
      alert("Please enter a last name!");
    } else if (!country) {
      alert("Please enter a country!");
    } else if (!favTeam) {
      setFavTeam("N/A");
    } else if (!favPlayer) {
      setFavPlayer("N/A");
    } else {
      db.collection("User Information").doc(`${user.uid}`).set({
        firstName,
        lastName,
        country,
        favPlayer,
        favTeam,
        pfpUrl,
      });

      setModalVisible(!modalVisible);
    }
  };

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
          source={
            userInfo?.pfpUrl
              ? userInfo.pfpUrl
              : require("../assets/default_pfp.png")
          }
          style={{
            margin: 10,
            width: 200,
            height: 200,
          }}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modal}>
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
                placeholder="Favorite Team"
                value={favTeam}
                onChangeText={(text) =>
                  setFavTeam(text.charAt(0).toUpperCase() + text.slice(1))
                }
                style={styles.input}
              />
              <TextInput
                placeholder="Favorite Player"
                value={favPlayer}
                onChangeText={(text) =>
                  setFavPlayer(text.charAt(0).toUpperCase() + text.slice(1))
                }
                style={styles.input}
              />
            </View>

            <TouchableOpacity
              onPress={handleUpdate}
              style={styles.updateButton}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Discard Changes",
                  "Are you sure you want to discard your changes?",
                  [
                    {
                      text: "No",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: () => {
                        setModalVisible(!modalVisible);
                      },
                    },
                  ]
                )
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>Discard Changes</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.accountInfo}>
          <Text style={styles.title}>Account Information</Text>
          <Text>First Name: {userInfo?.firstName}</Text>
          <Text>Last Name: {userInfo?.lastName}</Text>
          <Text>Country: {userInfo?.country}</Text>
          <Text>Favorite Team: {userInfo?.favTeam}</Text>
          <Text>Favorite Player: {userInfo?.favPlayer}</Text>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.updateButton}
        >
          <Text style={styles.buttonText}>Edit Info</Text>
        </TouchableOpacity>
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
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  accountInfo: { marginTop: 20, marginLeft: 10, alignSelf: "flex-start" },
  updateButton: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
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
  inputContainer: { width: "80%" },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});
//
