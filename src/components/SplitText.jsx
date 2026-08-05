import { motion } from 'framer-motion';

/**
 * SplitText component (inspired by reactbits.dev).
 * Splits text into letters or words and animates them sequentially.
 */
export default function SplitText({
  text,
  delay = 0.03,
  duration = 0.35,
  className = '',
  style = {},
  ...props
}) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(3px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  let charCount = 0;

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: 'inline', ...style }}
      {...props}
    >
      {words.map((word, wordIndex) => {
        const chars = word.split('');
        return (
          <span
            key={wordIndex}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {chars.map((char) => {
              const key = charCount++;
              return (
                <motion.span
                  key={key}
                  variants={childVariants}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span style={{ display: 'inline-block' }}>&nbsp;</span>
            )}
          </span>
        );
      })}
    </motion.span>
  );
}
