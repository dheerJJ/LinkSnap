import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * DecryptedText component (inspired by reactbits.dev).
 * Scrambles and decrypts characters in a string to create a modern tech reveal effect.
 */
export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  className = '',
  animateOn = 'mount', // 'mount' | 'hover'
  style = {},
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  const triggerAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    let iterations = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';

            // Determine if this character index is decrypted
            const isDecrypted = index < iterations / maxIterations;
            if (isDecrypted) return text[index];

            // Otherwise, show a randomized character
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });

      iterations += 1;

      if (iterations >= text.length * maxIterations) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, speed);
  }, [text, isAnimating, maxIterations, speed, chars]);

  useEffect(() => {
    if (animateOn === 'mount') {
      triggerAnimation();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, animateOn, triggerAnimation]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      triggerAnimation();
    }
  };

  return (
    <span
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block', ...style }}
      {...props}
    >
      {displayText}
    </span>
  );
}
