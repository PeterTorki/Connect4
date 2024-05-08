import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";

const window = Dimensions.get("window");
const W = window.width;

export default function Cell({
  col,
  row,
  player: currentPlayer,
  addSetPlayerToCell,
  onPress,
}) {
  const [player, setPlayer] = useState(currentPlayer);

  useEffect(() => {
    addSetPlayerToCell(col, row, setPlayer);
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(col, row)}>
      <View
        style={[
          styles.opening,
          {
            backgroundColor:
              player < 0 ? "#181818" : player === 0 ? "salmon" : "yellow",
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50 * (W / 375),
    height: 50 * (W / 375),
    alignItems: "center",
    justifyContent: "center",
  },
  opening: {
    width: "80%",
    height: "80%",
    borderRadius: 100,
  },
});
