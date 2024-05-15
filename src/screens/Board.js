import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import Cell from "../components/Cell";
import checkWin from "../components/Win";
import axios from "axios";
import CountDown from "../components/CountDown";
import StartLunch from "../components/StartLunch";
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
        .map(() => ({ player: -1, setPlayer: null, isHighlighted: false }))
    );
};

const Board = () => {
  const [grid, setGrid] = useState(createGrid());
  const [current, setCurrent] = useState(0);
  const [win, setWin] = useState(-1);

  const [isAiPlaying, setIsAiPlaying] = useState(false);
  const [areYouPlaying, setAreYouPlaying] = useState(false);
  const [start, setStart] = useState(false);
  const [countStart, setCountStart] = useState(false);

  useEffect(() => {
    if (current === 0 && start === true) {
      setIsAiPlaying(false);
      setAreYouPlaying(true);
    } else if (current === 1) {
      aiTurn();
      setAreYouPlaying(false);
      setIsAiPlaying(true);
    }
  }, [current, start]);

  useEffect(() => {
    if (win !== -1) {
      setIsAiPlaying(false);
      setAreYouPlaying(false);
    }
  }, [win]);

  const renderGameBoard = () => {
    return Array(6)
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
                  isHighlighted={grid[row][col].isHighlighted}
                />
              </View>
            ))}
        </View>
      ));
  };

  const updateCellOnFirst = (i, j, prop, value) => {
    const copied = copyGrid(grid);
    copied[j][i]["setPlayer"] = value;

    setGrid(copied);
  };

  const updateCellOnPress = (i, j, prop, value) => {
    const copied = copyGrid(grid);
    copied[j][i]["player"] = value;

    copied.map((row) => row.map((cell) => (cell.isHighlighted = false)));
    copied[j][i].isHighlighted = true;
    setGrid(copied);
  };

  const aiTurn = async () => {
    const board = grid.map((x) => x.map((obj) => obj.player + 1));
    try {
      const response = await axios.post(
        "https://connect-4-ai.onrender.com/connect4/minimax",
        {
          board: board,
        }
      );
      const col = response.data.column;

      gameLogic(col);
    } catch (error) {
      console.error(error);
    }
  };

  const addSetPlayerToCell = (i, j, setPlayer) => {
    if (setPlayer) {
      updateCellOnFirst(i, j, "setPlayer", setPlayer);
    }
  };

  const handleTimeWin = (player) => {
    setIsAiPlaying(false);
    setAreYouPlaying(false);
    console.log("handleTimeWin", player);
    setWin(player);
  };

  const gameLogic = (clickedCol) => {
    if (win !== -1) {
      console.log("gameLogic", win);
      setIsAiPlaying(false);
      setAreYouPlaying(false);
      return;
    }
    if (!start) {
      Alert.alert("Please click start the game first!");
      return;
    }

    let row = 5;
    let flag = false;
    while (row >= 0) {
      if (grid[row][clickedCol].player < 0) {
        console.log(
          "Check Extra Cells",
          grid[row][clickedCol].player,
          row,
          clickedCol
        );
        updateCellOnPress(clickedCol, row, "player", current);
        grid[row][clickedCol].setPlayer(current);
        flag = true;
        break;
      }
      row--;
    }
    if (flag) {
      setCurrent(1 - current);
    }

    // Check for win condition
    const newWin = checkWin(grid);
    if (newWin !== -1) {
      // Set win state and prevent further updates
      setWin(newWin);
      return;
    }
  };

  const handleStart = () => {
    setCountStart(true);
    const timeStart = setTimeout(() => {
      setStart(true);
      setCountStart(false);
    }, 3000);

    return () => clearTimeout(timeStart);
  };

  return (
    <View style={styles.container}>
      {countStart && (
        <View style={styles.counter}>
          <StartLunch />
        </View>
      )}
      {isAiPlaying && (
        <View style={styles.counter}>
          <Text style={{ color: "white", fontSize: 20 }}>
            Ai is thinking...
          </Text>
        </View>
      )}

      <View style={styles.playersHeader}>
        <CountDown
          isPlaying={areYouPlaying}
          playerName="You"
          current={current}
          handleTimeWin={handleTimeWin}
          isPlayerTurn={current === 0}
        />
        <CountDown
          isPlaying={isAiPlaying}
          playerName="Ai"
          current={current}
          handleTimeWin={handleTimeWin}
          isPlayerTurn={current === 1}
        />
      </View>

      <View style={styles.board}>{renderGameBoard()}</View>
      <Text
        style={[
          styles.win,
          {
            color:
              win >= 0 &&
              (win === 0 ? "red" : win === 1 ? "#EE6677" : "#18BC9C"),
          },
        ]}>
        {win >= 0 &&
          (win === 0 ? "You won!" : win === 1 ? "Ai won!" : "It's a tie!")}
      </Text>

      <TouchableOpacity
        onPress={() => handleStart()}
        style={{
          ...styles.startButton,
          backgroundColor: start ? "grey" : "dodgerblue",
        }}
        disabled={start}>
        <Text style={{ color: "white", textAlign: "center" }}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101B27",
    justifyContent: "space-around",
  },
  board: {
    backgroundColor: "dodgerblue",
    borderRadius: 10,
    borderWidth: 3,
    alignSelf: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  win: {
    fontSize: 35,
    alignSelf: "center",
  },

  playersHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    // center the players header
  },
  counter: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  startButton: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
});

export default Board;
