import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
}) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const moveGradient = () => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      setPosition({ x, y });
    };

    const intervalId = setInterval(moveGradient, duration);

    return () => clearInterval(intervalId);
  }, [duration]);

  return (
    <div className={cn("relative", containerClassName)}>
      <motion.div
        className={cn(
          "absolute inset-0 rounded-lg transition-all duration-500",
          "bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500",
          "p-[1px]",
          className
        )}
        animate={{
          background: `linear-gradient(${position.x}deg, rgb(139, 92, 246), rgb(59, 130, 246))`,
        }}
        transition={{
          duration: duration / 1000,
          ease: "linear",
        }}
      >
        <div className="relative h-full w-full rounded-lg bg-background">
          {children}
        </div>
      </motion.div>
    </div>
  );
};