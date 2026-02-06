import type { GameState } from "./types";
import "./ReactionBox.css";

type Props = {
  gameState: GameState;
  message: string;
  onClick: () => void;
};

export function ReactionBox({ gameState, message, onClick }: Props) {
  const stateClass = `reaction-box ${gameState}`;

  return (
    <div onClick={onClick} className={stateClass}>
      {message}
    </div>
  );
}
