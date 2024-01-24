function setGrid() {
    const input = document.querySelector("#grid");
    const size = 6;
  
    for (let i = 0; i < size; i++) {
      let rows = document.createElement("div");
      input.appendChild(rows);
      rows.className = "rows";
  
      for (let j = 0; j < size; j++) {
        let field = document.createElement("input");
        field.type = "number";
        field.className = "cells";
        field.id = `grid${i}${j}`;
        let flex = document.createElement("div");
        flex.className = "flex";
        flex.style.display = "inline";
        rows.appendChild(flex);
        flex.appendChild(field);
      }
    }
  }
  
  document.getElementById("submitButton").addEventListener("click", (e) => {
    e.preventDefault();
    calculateGrid();
  });
  
  function isValid(board) {
    let n = 6;
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] !== ".") {
          if (check(board, i, j, board[i][j]) === 0) {
            return false;
          }
        }
      }
    }
    return true;
  }
  
  function check(board, i, j, cond) {
    let a = true;
    let b = cond;
  
    for (let k = 0; k < 6; k++) {
      if ((board[i][k] == b && k !== j) || (board[k][j] == b && k !== i)) {
        a = false;
      }
    }
  
    let r = Math.floor(i / 2) * 2;
    let c = Math.floor(j / 3) * 3;
  
    for (let p = r; p < r + 2; p++) {
      for (let q = c; q < c + 3; q++) {
        if (board[p][q] == b && p !== i && q !== j) {
          a = false;
        }
      }
    }
  
    return a;
  }
  
  function solve(board) {
    let n = 6;
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === ".") {
          for (let k = 1; k <= n; k++) {
            if (check(board, i, j, k.toString())) {
              board[i][j] = k;
              if (solve(board)) {
                return true;
              } else {
                board[i][j] = ".";
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  function calculateGrid() {
    let n = 6;
    let mat = [];
    let invalidCells = [];
  
    for (let i = 0; i < n; i++) {
      mat[i] = [];
      for (let j = 0; j < n; j++) {
        let inputValue = document.getElementById(`grid${i}${j}`).value;
        if (inputValue === "") {
          mat[i][j] = ".";
        } else {
          let parsedValue = parseInt(inputValue);
          if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > n) {
            invalidCells.push({ row: i, col: j });
          } else {
            mat[i][j] = parsedValue;
          }
        }
      }
    }
  
    if (invalidCells.length === 0 && isValid(mat) && solve(mat)) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          document.getElementById(`grid${i}${j}`).value = mat[i][j];
        }
      }
    } else {
      if (!document.getElementById("errorMessage")) {
        let errorMessage = document.createElement("div");
        errorMessage.innerHTML = "Invalid input. Please enter valid Numbers.";
        errorMessage.style.color = "red";
        errorMessage.id = "errorMessage";
        document.body.appendChild(errorMessage);
  
        setTimeout(function () {
          document.body.removeChild(errorMessage);
          resetGrid();
        }, 2000);
      }
    }
  }
  
  function resetGrid() {
    const size = 6;
  
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const field = document.getElementById(`grid${i}${j}`);
        if (field) {
          field.value = "";
        }
      }
    }
  }
  
  document.getElementById("resetButton").addEventListener("click", (e) => {
    e.preventDefault();
    resetGrid();
  });