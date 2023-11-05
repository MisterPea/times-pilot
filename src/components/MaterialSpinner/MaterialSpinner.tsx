import { useEffect } from 'react';
import { MaterialSpinnerProps } from '../types';

export default function MaterialSpinner({
  radius = 18,
  strokeWidth = 4,
  rotationDuration = 800,
  pathAnimationDuration = 2000,
  pathLimits = { min: 0.02, max: 0.98 },
  staticPath = false,
  staticPathLength = 0.5,
  showTrack = true,
  trackColor = 'lightgrey',
  pathColor = 'black',
}: MaterialSpinnerProps) {

  useEffect(() => {
    const strokeLength = 2 * Math.PI * radius;
    const strokeAnimationName = 'materialCirc';
    const rotateAnimationName = 'rotate';

    const strokeKeyframes = `
      @keyframes ${strokeAnimationName} {
        0% {stroke-dashoffset: ${strokeLength - (strokeLength * pathLimits.min)}}
        100% {stroke-dashoffset:${strokeLength - (strokeLength * pathLimits.max)}}
      }
    `;

    const rotateKeyframes = `
      @keyframes ${rotateAnimationName} {
        0% {transform: rotate(0)}
        100% {transform: rotate(360deg)}
      }
    `;

    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    styleElement.sheet?.insertRule(strokeKeyframes, 0);
    styleElement.sheet?.insertRule(rotateKeyframes, 1);

    // Cleanup: remove the style element when the component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [radius, pathLimits.min, pathLimits.max]); // Dependency array for useEffect

  const strokeLength = 2 * Math.PI * radius;

  const circleStyleAnimate = {
    animation: `${'materialCirc'} ${pathAnimationDuration}ms ease-in-out infinite alternate forwards`,
    strokeDasharray: strokeLength,
    strokeDashoffset: strokeLength,
  };

  const circleStyleStatic = {
    strokeDasharray: strokeLength,
    strokeDashoffset: strokeLength - (strokeLength * staticPathLength),
  };

  const rotateStyle = {
    animation: `${'rotate'} ${rotationDuration}ms linear infinite normal forwards`,
    transformOrigin: 'center',
  };

  return (
    <svg height={(radius * 2) + (strokeWidth * 2)} width={(radius * 2) + (strokeWidth * 2)} >
      <g style={rotateStyle}>
        {showTrack && (
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={trackColor}
            fill="none"
          />
        )}
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          stroke={pathColor}
          strokeWidth={strokeWidth}
          style={staticPath ? circleStyleStatic : circleStyleAnimate}
        />
      </g>
    </svg>
  );
}
