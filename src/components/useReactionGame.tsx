import { useEffect, useState } from "react";
import type { GameState } from "./types";

export function useReactionGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [highscore, setHighscore] = useState<number | null>(null);

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
      setHighscore((prev) => (prev === null || time < prev ? time : prev));
      setGameState("result");
      return;
    }

    if (gameState === "result" || gameState === "tooEarly") {
      setGameState("idle");
    }
  };

  useEffect(() => {
    if (gameState !== "waiting") return;

    const delay = Math.random() * 2000 + 1000;
    const timer = setTimeout(() => {
      setStartTime(Date.now());
      setGameState("ready");
    }, delay);

    return () => clearTimeout(timer);
  }, [gameState]);

  return { gameState, reactionTime, highscore, handleClick };
}
