import React from 'react';

/**
 * ShinyText component (inspired by reactbits.dev).
 * Shimmers text with a metallic accent gradient effect.
 */
export default function ShinyText({
  text,
  disabled = false,
  speed = '3s',
  className = '',
  style = {},
  ...props
}) {
  const finalStyle = {
    animationDuration: speed,
    ...style,
  };

  return (
    <span
      className={`${disabled ? '' : 'shiny-text'} ${className}`}
      style={finalStyle}
      {...props}
    >
      {text}
    </span>
  );
}
