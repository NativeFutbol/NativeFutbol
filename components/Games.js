import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FOOTBALL_API_KEY } from "@env";
import axios from "axios";
import { apiFootballDummyData } from "../constants/apiFootballDummyData";
import Carousel from "react-native-snap-carousel";
import GamesCard, { ITEM_WIDTH, SLIDER_WIDTH } from "./GamesCard";

export default function Games() {
  const [games, setGames] = useState(apiFootballDummyData);

  //   const query = "";
  //   const cateogry = "sports";
  //   const pageSize = 20;
  //   const country = "us";

  //   const url = query
  //     ? `https://newsapi.org/v2/top-headlines?category=${cateogry}&pageSize=${pageSize}&country=${country}&q=${query}&apiKey=${NEWS_API_KEY}`
  //     : `https://newsapi.org/v2/top-headlines?category=${cateogry}&pageSize=${pageSize}&country=${country}&apiKey=${NEWS_API_KEY}`;

  //   useEffect(() => {
  //     getArticles();
  //   }, []);

  //   const getArticles = async () => {
  //     try {
  //       const res = await axios.get(url);
  //       setArticles(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const isCarousel = useRef(null);

  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={games}
        renderItem={GamesCard}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        // sliderHeight={SLIDER_WIDTH}
        // itemHeight={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        // vertical={true}
        // autoplay={true}
        // lockScrollWhileSnapping={true}
        // autoplayInterval={4000}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
