import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { API_URL } from "../configs/constants";

import PalettePreview from "../components/PalettePreview";

export default function Home(props) {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColorPalettes();

    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
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
      refreshing={isRefreshing}
      onRefresh={() => handleRefresh()}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: "white",
  },
});
