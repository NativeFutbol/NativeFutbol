import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Timeline from "react-native-timeline-flatlist";

// export default function CoachCareer({ data }) {
//   const dummydata = [
//     { time: "09:00", title: "Event 1", description: "Event 1 Description" },
//     { time: "10:45", title: "Event 2", description: "Event 2 Description" },
//     { time: "12:00", title: "Event 3", description: "Event 3 Description" },
//     { time: "14:00", title: "Event 4", description: "Event 4 Description" },
//     { time: "16:30", title: "Event 5", description: "Event 5 Description" },
//   ];
//   console.log(data);
//   let newData = [];
//   data?.map((element) => {
//     if (element.end) {
//       newData.push({
//         time: element.start,
//         title: `Left ${element.team.name}`,
//         logoUrl: element.team.logo,
//       });
//     }

//     if (element.start) {
//       newData.push({
//         time: element.start,
//         title: `Joined ${element.team.name}`,
//         imageUrl: element.team.logo,
//       });
//     }
//   });
//   console.log("NEW DATA", newData);

//   const renderDetail = (rowData, sectionID, rowID) => {
//     let title = <Text style={[styles.title]}>{rowData.title}</Text>;
//     let desc = (
//       <View style={styles.descriptionContainer}>
//         <Image source={{ uri: rowData.imageUrl }} style={styles.image} />
//         <Text style={[styles.textDescription]}>{rowData.description}</Text>
//       </View>
//     );

//     return (
//       <View style={{ flex: 1 }}>
//         {/* {title}
//         {desc} */}
//       </View>
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <View>
//         <Timeline
//           data={newData}
//           separator={true}
//           timeContainerStyle={{ minWidth: 80 }}
//           renderDetail={renderDetail(newData)}
//         />
//         {/* <FlatList
//           numColumns={1}
//           keyExtractor={(item, index) => index.toString()}
//           ListFooterComponent={<View style={{ height: 500 }} />}
//           data={data}
//           renderItem={({ item }) => (
//             <View
//               style={{
//                 flexDirection: "row",
//                 margin: 10,
//                 backgroundColor: "rgba(55, 55, 55, 0.5)",
//               }}
//             >
//               <View>
//                 <Image
//                   source={{
//                     uri: item?.team?.logo
//                       ? item.team.logo
//                       : "https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193057179?k=20&m=1193057179&s=612x612&w=0&h=4eEeQWJXxxhRthWOBzbDP0ryllT5Mu7xtO1o9IA-hMU=",
//                     height: 100,
//                     width: 100,
//                   }}
//                 />
//               </View>

//               <View style={{ justifyContent: "center", margin: 5 }}>
//                 <Text
//                   style={{
//                     alignSelf: "center",
//                     fontSize: 18,
//                     fontWeight: "bold",
//                     margin: 5,
//                   }}
//                 >
//                   Team: {item?.team?.name}
//                 </Text>
//                 <Text
//                   style={{
//                     alignSelf: "center",
//                     fontSize: 18,
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {item?.start} to {item?.end === null ? "Present" : item?.end}
//                 </Text>
//               </View>
//             </View>
//           )}
//         /> */}
//       </View>
//     </View>
//   );
// }

export default class CoachCareer extends Component {
  constructor({ data }) {
    super();
    this.renderDetail = this.renderDetail.bind(this);

    console.log(data);
    let newData = [];
    data?.map((element) => {
      if (element.end) {
        newData.push({
          time: element.end,
          title: `Left ${element.team.name}`,
          imageUrl: element.team.logo,
        });
      }

      if (element.start) {
        newData.push({
          time: element.start,
          title: `Joined ${element.team.name}`,
          imageUrl: element.team.logo,
        });
      }
    });
    console.log("NEW DATA", newData);

    this.data = newData;
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

  render() {
    return (
      <View style={styles.container}>
        <Timeline
          style={styles.list}
          data={this.data}
          circleSize={10}
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
