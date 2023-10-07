import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import PalettePreview from "../components/PalettePreview";

export default function Home(props) {
  const newColorPalette = props.route.params
    ? props.route.params.newColorPalette
    : undefined;

  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchColorPalettes = useCallback(async () => {
    const result = await fetch(process.env.EXPO_PUBLIC_API_URL);

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

  useEffect(() => {
    if (newColorPalette) {
      setColorPalettes((palletes) => [newColorPalette, ...palletes]);
    }
  }, [newColorPalette]);

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
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ColorPaletteModal");
          }}
        >
          <Text style={styles.buttonText}>Add Custom Palette</Text>
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "teal",
    marginBottom: 10,
  },
});
