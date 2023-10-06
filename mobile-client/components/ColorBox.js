import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ColorBox(props) {
  const textColor = {
    color:
      parseInt(props.hexCode.replace("#", ""), 16) > 0xffffff / 1.1
        ? "black"
        : "white",
  };

  return (
    <View style={[styles.box, { backgroundColor: props.hexCode }]}>
      <Text style={[styles.boxText, textColor]}>
        {props.colorName}: {props.hexCode}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 10,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: {
    color: "#fff",
  },
});
