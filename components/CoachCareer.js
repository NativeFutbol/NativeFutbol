import axios from "axios";
import { FOOTBALL_API_KEY } from "@env";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

export default class CoachCareer extends Component {
  constructor({ data, teamId }) {
    super();
    this.renderDetail = this.renderDetail.bind(this);

    this.state = {
      currentCoachCareer: [],
    };
  }

  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    var desc = null;
    if (rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>
          <Image source={{ uri: rowData.imageUrl }} style={styles.image} />
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      );

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
      </View>
    );
  }

  async componentDidMount() {
    const options = {
      method: "GET",
      url: `https://v3.football.api-sports.io/coachs?team=${this.props.teamId}`,
      headers: {
        "X-RapidAPI-Key": FOOTBALL_API_KEY,
        "X-RapidAPI-Host": "v3.football.api-sports.io",
      },
    };

    const { data } = await axios.get(options.url, { headers: options.headers });

    const getCoach = () => {
      for (let j = 0; j < data.response.length; j++) {
        const coach = data.response[j];
        for (let i = 0; i < coach.career.length; i++) {
          if (
            coach.career[i].team.id === this.props.teamId &&
            coach.career[i].end === null
          )
            return coach;
        }
      }
    };

    const currentCoach = getCoach();

    let newData = [];
    currentCoach.career.map((element) => {
      if (element.end) {
        newData.push({
          time: element.end,
          title: `Left ${element.team.name}`,
          imageUrl: element.team.logo,
          icon: require("../assets/soccer-ball.png"),
        });
      }

      if (element.start) {
        newData.push({
          time: element.start,
          title: `Joined ${element.team.name}`,
          imageUrl: element.team.logo,
          icon: require("../assets/soccer-ball.png"),
        });
      }
    });

    this.setState({ currentCoachCareer: newData });
  }

  render() {
    return (
      <View style={styles.container}>
        <Timeline
          style={styles.list}
          data={this.state.currentCoachCareer}
          circleSize={20}
          circleColor="rgba(0,0,0,0)"
          innerCircle={"icon"}
          separator={true}
          lineColor="rgb(45,156,219)"
          timeContainerStyle={{ minWidth: 100, marginTop: -5 }}
          timeStyle={{
            textAlign: "center",
            backgroundColor: "#ff9797",
            color: "white",
            padding: 5,
            borderRadius: 13,
          }}
          descriptionStyle={{ color: "gray" }}
          options={{
            style: { paddingTop: 5 },
          }}
          renderDetail={this.renderDetail}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionContainer: {
    flexDirection: "row",
    paddingRight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textDescription: {
    marginLeft: 10,
    color: "gray",
  },
});
