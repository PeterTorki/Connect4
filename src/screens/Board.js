import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Cell from "../components/Cell";
import checkWin from "../components/Win";
import axios from "axios";
import CountDown from "../components/CountDown";

function copyGrid(grid) {
  return Array(grid.length)
    .fill()
    .map((_, j) =>
      Array(grid[j].length)
        .fill()
        .map((_, i) => grid[j][i])
    );
}

const createGrid = () => {
  return Array(6)
    .fill()
    .map(() =>
      Array(7)
        .fill()
        .map(() => ({ player: -1, setPlayer: null }))
    );
};

export default function Board(props) {
  const [grid, setGrid] = useState(createGrid());
  const [current, setCurrent] = useState(0);
  const [win, setWin] = useState(-1);

  useEffect(() => {
    if (current === 0) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      aiTurn();
    }
  }, [current]);

  const [isPlaying, setIsPlaying] = useState(true);

  function updateCell(i, j, prop, value) {
    const copied = copyGrid(grid);
    copied[j][i][prop] = value;
    setGrid(copied);
  }

  async function aiTurn() {
    const board = grid.map((x) => x.map((obj) => obj.player + 1));
    try {
      const response = await axios.post(
        "https://connect-4-ai.onrender.com/connect4/minimax",
        {
          board: board,
        }
      );
      const col = response.data.column;
      console.log(col);
      gameLogic(col);
    } catch (error) {
      console.error(error);
    }
  }

  function addSetPlayerToCell(i, j, setPlayer) {
    updateCell(i, j, "setPlayer", setPlayer);
  }

  function gameLogic(clickedCol) {
    if (win >= 0) {
      return;
    }

    let row = 5;
    while (row >= 0) {
      if (grid[row][clickedCol].player < 0) {
        updateCell(clickedCol, row, "player", current);
        grid[row][clickedCol].setPlayer(current);
        break;
      }
      row--;
    }
    setWin(checkWin(grid));
    setCurrent(1 - current);
  }

  return (
    <View style={styles.container}>
      <CountDown isPlaying={isPlaying} />
      <View style={styles.board}>
        {Array(6)
          .fill()
          .map((_, row) => (
            <View style={styles.row} key={row}>
              {Array(7)
                .fill()
                .map((_, col) => (
                  <View key={`${row}-${col}`}>
                    <Cell
                      player={-1}
                      onPress={gameLogic}
                      addSetPlayerToCell={addSetPlayerToCell}
                      col={col}
                      row={row}
                    />
                  </View>
                ))}
            </View>
          ))}
      </View>
      <Text
        style={[
          styles.win,
          {
            color:
              win >= 0 && (win === 0 ? "red" : win === 1 ? "yellow" : "white"),
          },
        ]}>
        {win >= 0 &&
          (win === 0 ? "Red won!" : win === 1 ? "Yellow won!" : "It's a tie!")}
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 20,
          alignSelf: "center",
        }}
        onPress={() => aiTurn()}>
        Click Ai
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: "dodgerblue",
    borderRadius: 10,
    borderWidth: 3,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  win: {
    fontSize: 35,
    alignSelf: "center",
  },
});
