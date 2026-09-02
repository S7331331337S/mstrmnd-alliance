import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface SparklineProps {
  points: number[];
  width?: number;
  height?: number;
  color?: string;
}

export function Sparkline({
  points,
  width = 280,
  height = 96,
  color = "#ffffff",
}: SparklineProps) {
  if (points.length < 2) return null;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - 8 - ((p - min) / span) * (height - 16);
    return { x, y };
  });
  const d = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");

  return (
    <Svg width={width} height={height}>
      <Path d={d} stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
      {coords.map((c, i) => (
        <Circle key={i} cx={c.x} cy={c.y} r={i === coords.length - 1 ? 3.5 : 2} fill={color} />
      ))}
    </Svg>
  );
}
