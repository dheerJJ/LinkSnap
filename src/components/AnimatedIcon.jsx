import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks';
import { iconRegistry } from './icons/registry';

/**
 * AnimatedIcon — unified wrapper for Framer Motion SVG icon animations.
 *
 * @param {Object} props
 * @param {string} props.name - Icon name from registry
 * @param {'hover'|'click'|'mount'|'loop'|'none'} [props.trigger='hover'] - When to animate
 * @param {number} [props.size=24] - Icon size in px
 * @param {string} [props.color] - Override stroke/fill color (CSS var or hex)
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 * @param {boolean} [props.active] - Force active/animated state
 */
export default function AnimatedIcon({
  name,
  trigger = 'hover',
  size = 24,
  color,
  className = '',
  onClick,
  active = false,
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const timeoutRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') setIsHovered(true);
  }, [trigger]);

  const handleMouseLeave = useCallback(() => {
    if (trigger === 'hover') setIsHovered(false);
  }, [trigger]);

  const handleClick = useCallback(
    (e) => {
      if (trigger === 'click') {
        setIsClicked(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsClicked(false), 600);
      }
      onClick?.(e);
    },
    [trigger, onClick]
  );

  const icon = iconRegistry[name];
  if (!icon) {
    console.warn(`AnimatedIcon: icon "${name}" not found in registry`);
    return null;
  }

  const shouldAnimate =
    !prefersReducedMotion &&
    (active ||
      (trigger === 'hover' && isHovered) ||
      (trigger === 'click' && isClicked) ||
      trigger === 'mount' ||
      trigger === 'loop');

  const strokeColor = color || 'currentColor';

  // Motion variants
  const containerVariants = {
    idle: icon.container?.idle || {},
    animated: icon.container?.animated || {},
  };

  const spinClass = (name === 'loader' && shouldAnimate) ? 'animate-spin' : '';

  return (
    <motion.div
      className={`animated-icon inline-flex items-center justify-center cursor-pointer ${spinClass} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial="idle"
      animate={shouldAnimate ? 'animated' : 'idle'}
      variants={containerVariants}
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      role="img"
      aria-label={icon.label || name}
      {...rest}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox={icon.viewBox || '0 0 24 24'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={shouldAnimate ? 'animated' : 'idle'}
      >
        {icon.paths?.map((pathDef, i) => (
          <motion.path
            key={`p${i}`}
            d={pathDef.d}
            stroke={pathDef.fill ? 'none' : strokeColor}
            fill={pathDef.fill ? strokeColor : 'none'}
            strokeWidth={pathDef.strokeWidth || 2}
            strokeLinecap={pathDef.strokeLinecap || 'round'}
            strokeLinejoin={pathDef.strokeLinejoin || 'round'}
            variants={pathDef.variants || {}}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : pathDef.transition || {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
          />
        ))}
        {icon.circles?.map((circleDef, i) => (
          <motion.circle
            key={`c${i}`}
            cx={circleDef.cx}
            cy={circleDef.cy}
            r={circleDef.r}
            stroke={circleDef.fill ? 'none' : strokeColor}
            fill={circleDef.fill ? strokeColor : 'none'}
            strokeWidth={circleDef.strokeWidth || 2}
            variants={circleDef.variants || {}}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : circleDef.transition || {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
          />
        ))}
        {icon.rects?.map((rectDef, i) => (
          <motion.rect
            key={`r${i}`}
            x={rectDef.x}
            y={rectDef.y}
            width={rectDef.width}
            height={rectDef.height}
            rx={rectDef.rx}
            stroke={rectDef.fill ? 'none' : strokeColor}
            fill={rectDef.fill ? strokeColor : 'none'}
            strokeWidth={rectDef.strokeWidth || 2}
            variants={rectDef.variants || {}}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : rectDef.transition || {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
          />
        ))}
        {icon.lines?.map((lineDef, i) => (
          <motion.line
            key={`l${i}`}
            x1={lineDef.x1}
            y1={lineDef.y1}
            x2={lineDef.x2}
            y2={lineDef.y2}
            stroke={strokeColor}
            strokeWidth={lineDef.strokeWidth || 2}
            strokeLinecap="round"
            variants={lineDef.variants || {}}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : lineDef.transition || {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
          />
        ))}
        {icon.polylines?.map((polyDef, i) => (
          <motion.polyline
            key={`pl${i}`}
            points={polyDef.points}
            stroke={strokeColor}
            strokeWidth={polyDef.strokeWidth || 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={polyDef.variants || {}}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : polyDef.transition || {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
          />
        ))}
      </motion.svg>
    </motion.div>
  );
}
