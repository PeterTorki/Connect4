import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Board from "./src/screens/Board";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Connect 4</Text>
      <Board />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101B27",
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
