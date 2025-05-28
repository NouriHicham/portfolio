import React, { useState, useEffect } from "react";
import { Flag, Bomb, RefreshCw } from "lucide-react";

type CellValue = number | "mine";
interface Cell {
  value: CellValue;
  revealed: boolean;
  flagged: boolean;
  question: boolean;
}
interface MinesweeperProps {
  width?: number;
  height?: number;
  mines?: number;
}

function Minesweeper({ width = 9, height = 9, mines = 10 }: MinesweeperProps) {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [minesLeft, setMinesLeft] = useState(mines);
  const [firstClick, setFirstClick] = useState(true);
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<ReturnType<typeof setInterval> | null>(null);

  // Inicializar el tablero
  const initializeBoard = () => {
    const newBoard: Cell[][] = [];
    for (let y = 0; y < height; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < width; x++) {
        row.push({ value: 0, revealed: false, flagged: false, question: false });
      }
      newBoard.push(row);
    }
    return newBoard;
  };

  // Colocar minas en el tablero (evitando la primera celda clickeada)
  const placeMines = (board: Cell[][], firstClickX: number, firstClickY: number) => {
    let minesPlaced = 0;
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    while (minesPlaced < mines) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      const isTooCloseToFirstClick = Math.abs(x - firstClickX) <= 1 && Math.abs(y - firstClickY) <= 1;
      if (newBoard[y][x].value !== "mine" && !isTooCloseToFirstClick) {
        newBoard[y][x].value = "mine";
        minesPlaced++;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              if (newBoard[ny][nx].value !== "mine") {
                newBoard[ny][nx].value = (newBoard[ny][nx].value as number) + 1;
              }
            }
          }
        }
      }
    }
    return newBoard;
  };

  // Iniciar un nuevo juego
  const startNewGame = () => {
    const newBoard = initializeBoard();
    setBoard(newBoard);
    setGameOver(false);
    setGameWon(false);
    setMinesLeft(mines);
    setFirstClick(true);
    setTimer(0);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  useEffect(() => {
    startNewGame();
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (board.length === 0 || gameOver) return;
    let allNonMinesRevealed = true;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (board[y][x].value !== "mine" && !board[y][x].revealed) {
          allNonMinesRevealed = false;
          break;
        }
      }
      if (!allNonMinesRevealed) break;
    }
    if (allNonMinesRevealed) {
      setGameWon(true);
      setGameOver(true);
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
  }, [board, gameOver, height, timerInterval, width]);

  // Revelar una celda
  const revealCell = (x: number, y: number) => {
    if (gameOver || board[y][x].revealed || board[y][x].flagged || board[y][x].question) return;
    if (firstClick) {
      const newBoard = placeMines(board, x, y);
      setBoard(newBoard);
      setFirstClick(false);
      const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
      setTimerInterval(interval);
    }
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    if (newBoard[y][x].value === "mine") {
      for (let y2 = 0; y2 < height; y2++) {
        for (let x2 = 0; x2 < width; x2++) {
          if (newBoard[y2][x2].value === "mine") {
            newBoard[y2][x2].revealed = true;
          }
        }
      }
      setBoard(newBoard);
      setGameOver(true);
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
      return;
    }
    newBoard[y][x].revealed = true;
    if (newBoard[y][x].value === 0) {
      revealAdjacentCells(newBoard, x, y);
    }
    setBoard(newBoard);
  };

  const revealAdjacentCells = (board: Cell[][], x: number, y: number) => {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          if (!board[ny][nx].revealed && !board[ny][nx].flagged && !board[ny][nx].question) {
            board[ny][nx].revealed = true;
            if (board[ny][nx].value === 0) {
              revealAdjacentCells(board, nx, ny);
            }
          }
        }
      }
    }
  };

  const markCell = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    if (gameOver || board[y][x].revealed) return;
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    if (!newBoard[y][x].flagged && !newBoard[y][x].question) {
      newBoard[y][x].flagged = true;
      setMinesLeft((prev) => prev - 1);
    } else if (newBoard[y][x].flagged) {
      newBoard[y][x].flagged = false;
      newBoard[y][x].question = true;
      setMinesLeft((prev) => prev + 1);
    } else {
      newBoard[y][x].question = false;
    }
    setBoard(newBoard);
  };

  const getNumberColor = (value: number) => {
    const colors = [
      "", "text-blue-600", "text-green-600", "text-red-600", "text-blue-900", "text-red-900", "text-teal-600", "text-black", "text-gray-600"
    ];
    return colors[value];
  };

  return (
    <div className="p-4 bg-[#c0c0c0] h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 px-2 py-1 bg-[#c0c0c0] border-t-4 border-l-4 border-white border-r-4 border-b-4 border-r-gray-500 border-b-gray-500">
        <div className="bg-black text-red-500 font-mono font-bold px-2 py-1 text-xl">
          {minesLeft.toString().padStart(3, "0")}
        </div>
        <button
          onClick={startNewGame}
          className="bg-[#c0c0c0] p-1 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-r-gray-500 border-b-gray-500 hover:bg-[#d0d0d0]"
        >
          <RefreshCw className="w-6 h-6" />
        </button>
        <div className="bg-black text-red-500 font-mono font-bold px-2 py-1 text-xl">
          {timer.toString().padStart(3, "0")}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="border-t-4 border-l-4 border-gray-500 border-r-4 border-b-4 border-r-white border-b-white p-1 bg-[#c0c0c0]">
          {board.map((row, y) => (
            <div key={y} className="flex">
              {row.map((cell, x) => (
                <button
                  key={`${x}-${y}`}
                  className={`w-7 h-7 flex items-center justify-center text-sm font-bold ${
                    cell.revealed
                      ? "bg-[#d0d0d0] border border-[#d0d0d0]"
                      : "bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-r-gray-500 border-b-gray-500 hover:bg-[#d0d0d0]"
                  }`}
                  onClick={() => revealCell(x, y)}
                  onContextMenu={(e) => markCell(e, x, y)}
                  disabled={gameOver}
                >
                  {cell.revealed ? (
                    cell.value === "mine" ? (
                      <Bomb className="w-4 h-4" />
                    ) : cell.value > 0 ? (
                      <span className={getNumberColor(cell.value as number)}>{cell.value}</span>
                    ) : null
                  ) : cell.flagged ? (
                    <Flag className="w-4 h-4 text-red-600" />
                  ) : cell.question ? (
                    <span className="text-blue-800 font-bold">?</span>
                  ) : null}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      {gameOver && (
        <div className="mt-4 text-center font-bold">
          {gameWon ? (
            <div className="text-green-600">¡Has ganado!</div>
          ) : (
            <div className="text-red-600">¡Has perdido!</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function BuscaminasWindow() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 min-h-0">
        <Minesweeper width={9} height={9} mines={10} />
      </div>
    </div>
  );
}
