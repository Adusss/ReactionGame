import type { Props } from "./types";
import "./ReactionBox.css";

export function ReactionBox({ gameState, message, onClick }: Props) {
  const stateClass = `reaction-box ${gameState}`;

  return (
    <div onClick={onClick} className={stateClass}>
      {message}
    </div>
  );
}
