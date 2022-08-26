import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Carousel from "react-native-snap-carousel";
import NewsCard, { ITEM_WIDTH, SLIDER_WIDTH } from "./NewsCard";

export default function News({ newsData }) {
  const isCarousel = useRef(null);

  return (
    <View style={{ marginBottom: 30 }}>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={newsData.articles}
        renderItem={NewsCard}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        // sliderHeight={SLIDER_WIDTH}
        // itemHeight={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        // vertical={true}
        autoplay={true}
        autoplayInterval={5000}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
