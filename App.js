import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Board from "./src/screens/Board";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect 4</Text>
      <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#f0f0f0",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
