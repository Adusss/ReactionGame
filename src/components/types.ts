export type GameState = "idle" | "waiting" | "ready" | "result" | "tooEarly";

export type Score = {
  id: string;
  time: number;
};

export type Props = {
  gameState: GameState;
  message: string;
  onClick: () => void;
};
