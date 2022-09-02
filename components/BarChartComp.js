import { View, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function BarChartComp({ title, labels, data, color }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
      <BarChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
              color: (opacity = 1) => `rgba(200, 0, 0, ${opacity})`,
            },
          ],
        }}
        width={370} // from react-native
        height={180}
        fromZero={true}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        segments={5}
        showValuesOnTopOfBars={true}
        chartConfig={{
          backgroundColor: "gray",
          backgroundGradientFrom: "gray",
          backgroundGradientTo: "lightgray",

          fillShadowGradientTo: color,
          fillShadowGradientOpacity: 1,
          color: (opacity = 1) => color,
          labelColor: (opacity = 1) => `#333`,
          strokeWidth: 2,

          barPercentage: 0.5,
          useShadowColorFromDataset: false,
          decimalPlaces: 0,
          propsForBackgroundLines: {
            stroke: "black",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          fontWeight: "bold",
        }}
      />
    </View>
  );
}
