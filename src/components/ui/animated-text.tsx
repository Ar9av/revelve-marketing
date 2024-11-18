import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export const AnimatedText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
          },
        },
      }}
      className={className}
    >
      {text}
    </motion.div>
  );
};