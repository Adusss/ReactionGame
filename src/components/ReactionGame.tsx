import { useReactionGame } from "./useReactionGame";
import { ReactionBox } from "./ReactionBox";
import type { GameState } from "./types";

const getMessage = (state: GameState, reactionTime: number | null) => {
  switch (state) {
    case "idle":
      return "Click to start";
    case "waiting":
      return "Wait...";
    case "ready":
      return "CLICK!";
    case "tooEarly":
      return "Too early! Click to try again";
    case "result":
      return `Your time: ${reactionTime} ms`;
  }
};

export function ReactionGame() {
  const { gameState, reactionTime, highscore, handleClick } = useReactionGame();

  return (
    <div>
      <ReactionBox gameState={gameState} message={getMessage(gameState, reactionTime)} onClick={handleClick} />
      {highscore && <div>Highscore: {highscore} ms</div>}
    </div>
  );
}
