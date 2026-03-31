import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#_";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export const ScrambleText = ({ text, className = "" }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((letter, index) => {
            // If the letter is a space, leave it as a space so words don't merge
            if (letter === " ") return " ";
            
            // If the iteration has passed this index, show the real letter
            if (index < iteration) return text[index];
            
            // Otherwise, show a random hacker character
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      // Stop the interval once the whole string is revealed
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      // Speed control: lower fraction = slower reveal
      iteration += 1 / 3; 
    }, 30); // 30ms between every frame update

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};