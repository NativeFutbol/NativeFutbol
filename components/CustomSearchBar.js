import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SearchBar } from "react-native-elements";

export default function CustomSearchBar({
  query,
  setQuery,
  placeholder,
  onSubmit,
}) {
  const updateSearch = (search) => {
    setQuery(search);
  };
  return (
    <View>
      <SearchBar
        placeholder={placeholder ? placeholder : "Search..."}
        onChangeText={updateSearch}
        value={query}
        onSubmitEditing={onSubmit}
      />
    </View>
  );
}
