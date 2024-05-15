const cols = 7;
const rows = 6;

export default function checkWin(board) {
  const grid = board.map((x) => x.map((obj) => obj.player));

  // horizontal
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c <= cols - 4; c++) {
      if (
        grid[r][c] === grid[r][c + 1] &&
        grid[r][c + 1] === grid[r][c + 2] &&
        grid[r][c + 2] === grid[r][c + 3] &&
        grid[r][c] >= 0
      ) {
        return grid[r][c];
      }
    }
  }
  // vertical
  for (let r = 0; r <= rows - 4; r++) {
    for (let c = 0; c < cols; c++) {
      if (
        grid[r][c] === grid[r + 1][c] &&
        grid[r + 1][c] === grid[r + 2][c] &&
        grid[r + 2][c] === grid[r + 3][c] &&
        grid[r][c] >= 0
      ) {
        return grid[r][c];
      }
    }
  }
  // diagonal
  for (let r = 0; r <= rows - 4; r++) {
    for (let c = 0; c <= cols - 4; c++) {
      if (
        grid[r][c] === grid[r + 1][c + 1] &&
        grid[r + 1][c + 1] === grid[r + 2][c + 2] &&
        grid[r + 2][c + 2] === grid[r + 3][c + 3] &&
        grid[r][c] >= 0
      ) {
        return grid[r][c];
      }
    }
  }

  // anti diagonal
  for (let r = 0; r <= rows - 4; r++) {
    for (let c = 0; c <= cols - 4; c++) {
      if (
        grid[r][c + 3] === grid[r + 1][c + 2] &&
        grid[r + 1][c + 2] === grid[r + 2][c + 1] &&
        grid[r + 2][c + 1] === grid[r + 3][c] &&
        grid[r][c + 3] >= 0
      ) {
        return grid[r][c + 3];
      }
    }
  }

  // Check for tie
  let tce = true;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] < 0) {
        tce = false;
      }
    }
  }

  if (tce) return 2;

  return -1;
}
