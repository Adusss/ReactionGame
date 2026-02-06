import { useEffect, useState } from "react";
import type { GameState } from "./types";
import type { Score } from "./types";

export function useReactionGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [highscores, setHighscores] = useState<Score[]>([]);

  const handleClick = () => {
    if (gameState === "idle") {
      setReactionTime(null);
      setGameState("waiting");
      return;
    }

    if (gameState === "waiting") {
      setGameState("tooEarly");
      return;
    }

    if (gameState === "ready" && startTime) {
      const time = Date.now() - startTime;
      setReactionTime(time);

      const newScore: Score = {
        id: crypto.randomUUID(),
        time,
      };

      setHighscores((prev) => {
        const updated = [...prev, newScore].sort((a, b) => a.time - b.time);
        return updated.slice(0, 10);
      });
      setGameState("result");
      return;
    }

    if (gameState === "result" || gameState === "tooEarly") {
      setGameState("idle");
    }
  };

  useEffect(() => {
    if (gameState !== "waiting") return;

    const delay = Math.random() * 1 + 100;
    const timer = setTimeout(() => {
      setStartTime(Date.now());
      setGameState("ready");
    }, delay);

    return () => clearTimeout(timer);
  }, [gameState]);

  return { gameState, reactionTime, highscores, handleClick };
}
