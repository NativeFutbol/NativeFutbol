import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";

export default function SeasonFilter({ season, setSeason }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" },
    { label: "2019", value: "2019" },
  ]);
  return (
    <View style={{ alignItems: "center", marginTop: 5 }}>
      <View>
        <DropDownPicker
          containerStyle={{ width: "21%" }}
          maxHeight={100}
          placeholder="2022"
          open={open}
          value={season}
          items={items}
          setOpen={setOpen}
          setValue={setSeason}
          setItems={setItems}
        />
      </View>
    </View>
  );
}
