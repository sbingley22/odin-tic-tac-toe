const Element = function () {
  const board = document.querySelector("#board");
  const scoreP1 = document.querySelector("#score-p1");
  const scoreP2 = document.querySelector("#score-p2");
  const tiles = [[], [], []];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      tiles[i][j] = document.querySelector("#t" + String(i * 3 + j + 1));

      const h1 = document.createElement("h1");
      h1.className = "marker";
      tiles[i][j].appendChild(h1);
    }
  }

  return { board, scoreP1, scoreP2, tiles };
};

const GameState = function (p1, p2, tiles, el) {
  let turn = 1;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      tiles[i][j].addEventListener("click", (e) => {
        if (turn == 1) {
          if (e.target.firstChild.textContent == "") {
            e.target.firstChild.textContent = "X";
          }

          if (checkVictory("X")) {
            p1.addScore();
            UpdateScore();
            turn = 2;
            return;
          }

          if (AiMove() == false) {
            clearBoard();
          }
          if (checkVictory("O")) {
            p2.addScore();
            UpdateScore();
            turn = 2;
          }
        } else {
          turn = 1;
          clearBoard();
        }
      });
    }
  }

  const AiMove = function () {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tiles[i][j].firstChild.textContent == "") {
          tiles[i][j].firstChild.textContent = "O";
          return true;
        }
      }
    }

    return false;
  };

  const checkVictory = function (marker) {
    if (checkLine(marker, [0, 0], [0, 1], [0, 2])) return true;
    if (checkLine(marker, [1, 0], [1, 1], [1, 2])) return true;
    if (checkLine(marker, [2, 0], [2, 1], [2, 2])) return true;

    if (checkLine(marker, [0, 0], [1, 0], [2, 0])) return true;
    if (checkLine(marker, [0, 1], [1, 1], [2, 1])) return true;
    if (checkLine(marker, [0, 2], [1, 2], [2, 2])) return true;

    if (checkLine(marker, [0, 0], [1, 1], [2, 2])) return true;
    if (checkLine(marker, [2, 0], [1, 1], [0, 2])) return true;

    return false;
  };

  const checkLine = function (marker, l1, l2, l3) {
    let tick1 = false;
    let tick2 = false;
    let tick3 = false;
    if (tiles[l1[0]][l1[1]].firstChild.textContent == marker) tick1 = true;
    if (tiles[l2[0]][l2[1]].firstChild.textContent == marker) tick2 = true;
    if (tiles[l3[0]][l3[1]].firstChild.textContent == marker) tick3 = true;

    if (tick1 && tick2 && tick3) return true;
    return false;
  };

  const clearBoard = function () {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        tiles[i][j].firstChild.textContent = "";
      }
    }
  };

  const UpdateScore = function () {
    el.scoreP1.textContent = p1.getScore();
    el.scoreP2.textContent = p2.getScore();
  };
};

function Player(name, score) {
  return {
    name: name,
    score: score,
    getScore: () => {
      return name + " score is: " + String(score);
    },
    addScore: () => {
      score = score + 1;
    },
  };
}

const el = Element();
const player1 = Player("Player One", 0);
const AI = Player("AI", 0);

GameState(player1, AI, el.tiles, el);
