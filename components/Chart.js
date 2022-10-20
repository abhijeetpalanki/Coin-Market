import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-wagmi-charts";

export const { width: SIZE } = Dimensions.get("window");

const Chart = ({
  currentPrice,
  logoUrl,
  name,
  symbol,
  priceChangePercentage7d,
  sparkline,
}) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? "#34c759" : "#ff3b30";

  return (
    <LineChart.Provider
      data={sparkline.map((el) => {
        return { timestamp: el.x, value: el.y };
      })}
    >
      <View style={styles.chartWrapper}>
        <View style={styles.titlesWrapper}>
          <View style={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              <Image source={{ uri: logoUrl }} style={styles.image} />
              <Text style={styles.subTitle}>
                {name} ({symbol.toUpperCase()})
              </Text>
            </View>
            <Text style={styles.subTitle}>7d</Text>
          </View>

          <View style={styles.lowerTitles}>
            <LineChart.PriceText
              format={({ value }) => {
                "worklet";
                if (value === "") {
                  return `$${currentPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                }
                return `$${value
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }}
              style={styles.boldTitle}
            />
            <Text style={[styles.title, { color: priceChangeColor }]}>
              {priceChangePercentage7d.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.chartLineWrapper}>
        <LineChart width={SIZE} height={SIZE / 2}>
          <LineChart.Path />
          <LineChart.CursorCrosshair color={priceChangeColor} />
        </LineChart>
      </View>
    </LineChart.Provider>
  );
};

const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 16,
  },
  titlesWrapper: {
    marginHorizontal: 16,
  },
  upperTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subTitle: {
    fontSize: 14,
    color: "#a9abb1",
  },
  lowerTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
  },
  chartLineWrapper: {
    marginTop: 40,
  },
});

export default Chart;
