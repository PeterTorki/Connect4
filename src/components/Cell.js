import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";

const window = Dimensions.get("window");
const W = window.width;

const Cell = ({
  col,
  row,
  player: currentPlayer,
  addSetPlayerToCell,
  onPress,
  isHighlighted,
}) => {
  const [player, setPlayer] = useState(currentPlayer);

  useEffect(() => {
    addSetPlayerToCell(col, row, setPlayer);
  }, []);

  const isHighlightedStyle = isHighlighted
    ? {
        borderColor: "#f0f0f0",
        borderWidth: 2,
      }
    : {};

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(col, row)}>
      <View
        style={[
          styles.opening,
          {
            backgroundColor:
              player < 0 ? "#181818" : player === 0 ? "#18BC9C" : "#EE6677",
            ...isHighlightedStyle,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

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

export default Cell;
