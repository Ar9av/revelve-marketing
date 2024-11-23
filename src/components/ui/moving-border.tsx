import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  containerClassName?: string;
  borderClassName?: string;
}

export function MovingBorder({
  children,
  duration = 2000,
  containerClassName,
  borderClassName,
}: MovingBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = ((timestamp - startTime) % duration) / duration;

      const angle = progress * Math.PI * 2;
      const x = Math.cos(angle);
      const y = Math.sin(angle);

      setPosition({ x, y });
      setOpacity(1);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [duration]);

  return (
    <div
      className={cn("relative rounded-lg", containerClassName)}
      ref={containerRef}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-lg transition-opacity",
          borderClassName
        )}
        style={{
          opacity,
          background: `radial-gradient(circle at ${50 + position.x * 50}% ${
            50 + position.y * 50
          }%, rgb(var(--moving-border-gradient)) 0%, transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}