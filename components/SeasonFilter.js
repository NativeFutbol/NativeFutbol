import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";

export default function SeasonFilter() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
  ]);
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}
