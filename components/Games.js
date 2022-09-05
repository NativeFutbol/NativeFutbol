import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import GamesCard, { ITEM_WIDTH, SLIDER_WIDTH } from "./GamesCard";
import ModalDropdown from "react-native-modal-dropdown";
import { Ionicons } from "@expo/vector-icons";

export default function Games({ matchesData, label, setLeague }) {
  const [index, setIndex] = useState(0);

  const isCarousel = useRef(null);

  const dropDownRef = useRef(null);

  return (
    <View style={{ marginTop: 15 }}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
            borderRadius: 8,
            width: "90%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{
                  uri: matchesData[0]?.league?.logo,
                  width: 20,
                  height: 20,
                }}
                style={{ marginRight: 5 }}
              />
              <TouchableOpacity onPress={() => dropDownRef.current.show()}>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {matchesData[0]?.league?.name}
                </Text>
              </TouchableOpacity>

              <ModalDropdown
                ref={dropDownRef}
                options={[
                  "Premier League",
                  "Bundesliga",
                  "Ligue 1",
                  "La Liga",
                  "Serie A",
                ]}
                defaultValue={""}
                style={{
                  borderBottomWidth: 0.2,
                  borderBottomColor: "orangered",
                }}
                textStyle={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginRight: 3,
                }}
                dropdownTextStyle={{
                  width: 200,
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                onSelect={(idx, value) => {
                  setLeague(value);
                }}
                renderRightComponent={() => (
                  <Ionicons
                    name="caret-down-sharp"
                    color={"orangered"}
                    size={16}
                  />
                )}
              />
            </View>

            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              {label}
            </Text>
          </View>
        </View>
      </View>
      <Carousel
        layout="stack"
        layoutCardOffset={16}
        ref={isCarousel}
        data={matchesData}
        renderItem={GamesCard}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={(index) => setIndex(index)}
        autoplay={true}
        autoplayInterval={5000}
      />

      <Pagination
        dotsLength={matchesData.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
