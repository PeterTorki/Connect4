const cols = 7;
const rows = 6;

export default function checkWin(board) {
  const grid = board.map((x) => x.map((obj) => obj.player));

  // horizontal
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i <= cols - 4; i++) {
      if (
        grid[j][i] === grid[j][i + 1] &&
        grid[j][i + 1] === grid[j][i + 2] &&
        grid[j][i + 2] === grid[j][i + 3] &&
        grid[j][i] >= 0
      ) {
        return grid[j][i];
      }
    }
  }

  // vertical
  for (let j = 0; j <= rows - 4; j++) {
    for (let i = 0; i < cols; i++) {
      if (
        grid[j][i] === grid[j + 1][i] &&
        grid[j + 1][i] === grid[j + 2][i] &&
        grid[j + 2][i] === grid[j + 3][i] &&
        grid[j][i] >= 0
      ) {
        return grid[j][i];
      }
    }
  }

  // diagonal
  for (let j = 0; j <= rows - 4; j++) {
    for (let i = 0; i <= cols - 4; i++) {
      if (
        grid[j][i] === grid[j + 1][i + 1] &&
        grid[j + 1][i + 1] === grid[j + 2][i + 2] &&
        grid[j + 2][i + 2] === grid[j + 3][i + 3] &&
        grid[j][i] >= 0
      ) {
        return grid[j][i];
      }
    }
  }

  // Anti-diagonal
  for (let j = 0; j <= rows - 4; j++) {
    for (let i = 0; i <= cols - 4; i++) {
      if (
        grid[j][i + 3] === grid[j + 1][i + 2] &&
        grid[j + 1][i + 2] === grid[j + 2][i + 1] &&
        grid[j + 2][i + 1] === grid[j + 3][i] &&
        grid[j][i + 3] >= 0
      ) {
        return grid[j][i + 3];
      }
    }
  }
  
  // Check for ties
  let tie = true;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (grid[j][i] < 0) {
        tie = false;
      }
    }
  }
  if (tie) return 2;

  return -1;
}
