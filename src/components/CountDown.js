import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const CountDown = ({
  isPlaying,
  playerName,
  current,
  isPlayerTurn,
  handleTimeWin,
}) => {
  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        size={100}
        isPlaying={isPlaying}
        duration={4 * 60}
        colors={isPlaying ? "#800000" : "#004777"}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => {
          if (!isPlaying || !isPlayerTurn) {
            return;
          }
          handleTimeWin(current === 0 ? 1 : 0);
          return [false, 0];
        }}
        updateInterval={1}>
        {({ remainingTime, color }) => (
          <Text style={{ color, fontSize: 25 }}>
            {Math.floor(remainingTime / 60) +
              `:${remainingTime % 60 < 10 ? "0" : ""}` +
              (remainingTime % 60)}
          </Text>
        )}
      </CountdownCircleTimer>
      <Text style={styles.playerTitle}>{playerName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  playerTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#f0f0f0",
  },
});

export default CountDown;
