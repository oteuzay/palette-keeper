import React from "react";
import { StyleSheet, FlatList, Text } from "react-native";

import ColorBox from "../components/ColorBox";

export default function ColorPalette(props) {
  const { colors, paletteName } = props.route.params;
  return (
    <FlatList
      style={styles.container}
      keyExtractor={(item, index) => index}
      data={colors}
      renderItem={(data) => (
        <ColorBox hexCode={data.item.hexCode} colorName={data.item.colorName} />
      )}
      ListHeaderComponent={<Text style={styles.headling}>{paletteName}</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  headling: {
    fontWeight: "bold",
  },
});
