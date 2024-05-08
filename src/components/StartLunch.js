import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const StartLunch = () => {
  const [count, setCount] = useState(3);
  const scaleValue = new Animated.Value(0); // Initial scale value set to 0

  useEffect(() => {
    const timer = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      } else {
        clearInterval(timer);
        // After countdown, you can navigate to the next screen or trigger any other action
        console.log("GO!");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [count]);

  useEffect(() => {
    animateScale(); // Trigger scale animation
  }, [count]);

  const animateScale = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1, // Grow to full size
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 0, // Shrink to zero size
        duration: 500,
        useNativeDriver: true,
        delay: 500, // Delay before starting the next animation
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.countdownText, { transform: [{ scale: scaleValue }] }]}>
        {count > 0 ? count : "GO!"}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  countdownText: {
    fontSize: 100,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

export default StartLunch;
