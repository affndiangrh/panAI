import { useState, useEffect } from "react";
import "./App.css";

function useTypingAnimation(text, speed) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) {
      return;
    }

    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index += 1;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

export default useTypingAnimation;
