import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { API_URL } from "../configs/constants";

import PalettePreview from "../components/PalettePreview";

export default function Home(props) {
  const [colorPalettes, setColorPalettes] = useState([]);

  const fetchColorPalettes = useCallback(async () => {
    const result = await fetch(API_URL);

    if (result.ok) {
      const palletes = await result.json();

      setColorPalettes(palletes);
    }
  });

  useEffect(() => {
    fetchColorPalettes();
  }, []);

  return (
    <FlatList
      style={styles.list}
      data={colorPalettes}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() => props.navigation.navigate("ColorPalette", item)}
          colorPalette={item}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: "white",
  },
});
