import { View, StyleSheet } from "react-native";
import React, { useRef } from "react";
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
        inactiveSlideShift={0}
        useScrollView={true}
        autoplay={true}
        autoplayInterval={5000}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
