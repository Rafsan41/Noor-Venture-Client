"use client";

import { useId } from "react";

interface NoorPatternProps {
  className?: string;
  opacity?: number;
  strokeWidth?: number;
}

export function NoorPattern({
  className,
  opacity = 0.08,
  strokeWidth = 1.5,
}: NoorPatternProps) {
  const uid = useId().replace(/:/g, "");
  const patternId = `noor-${uid}`;

  const points =
    "88,50 64.54,56.02 76.87,76.87 56.02,64.54 50,88 43.98,64.54 " +
    "23.13,76.87 35.46,56.02 12,50 35.46,43.98 23.13,23.13 43.98,35.46 " +
    "50,12 56.02,35.46 76.87,23.13 64.54,43.98";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeOpacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
