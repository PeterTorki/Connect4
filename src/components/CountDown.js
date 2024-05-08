import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const CountDown = ({ isPlaying }) => {
  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={4 * 60}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => ({ shouldRepeat: true, delay: 2 })}
        updateInterval={1}>
        {({ remainingTime, color }) => (
          <Text style={{ color, fontSize: 40 }}>
            {Math.floor(remainingTime / 60) + ":" + (remainingTime % 60)}
          </Text>
        )}
      </CountdownCircleTimer>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CountDown;
