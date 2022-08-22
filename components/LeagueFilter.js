import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";

export default function LeagueFilter({ league, setLeague }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Premier League", value: "39" },
    { label: "Bundesliga", value: "78" },
    { label: "Ligue 1", value: "61" },
    { label: "La Liga", value: "140" },
    { label: "Serie A", value: "135" },
  ]);
  return (
    <View style={{ width: "40%", alignItems: "center", marginTop: 5 }}>
      <DropDownPicker
        containerStyle={{ width: 180 }}
        maxHeight={100}
        placeholder="Premier League"
        open={open}
        value={league}
        items={items}
        setOpen={setOpen}
        setValue={setLeague}
        setItems={setItems}
      />
    </View>
  );
}
