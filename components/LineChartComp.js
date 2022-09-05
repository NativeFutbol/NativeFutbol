import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function LineChartComp({ title, labels, data, color }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={370}
        height={180}
        fromZero={true}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        segments={5}
        chartConfig={{
          backgroundColor: "gray",
          backgroundGradientFrom: "gray",
          backgroundGradientTo: "lightgray",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(${color} ${opacity})`,
          labelColor: (opacity = 1) => `#333`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#A9A9A9",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
