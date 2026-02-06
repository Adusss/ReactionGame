import { useReactionGame } from "./useReactionGame";
import { ReactionBox } from "./ReactionBox";
import "./ReactionGame.css";
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
  const { gameState, reactionTime, highscores, handleClick } = useReactionGame();

  return (
    <div>
      <ReactionBox gameState={gameState} message={getMessage(gameState, reactionTime)} onClick={handleClick} />

      {highscores.length > 0 && (
        <div>
          <h3>Top 10 Hightscores</h3>
          <ol>
            {highscores.map((score) => (
              <li key={score.id}>{score.time}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
