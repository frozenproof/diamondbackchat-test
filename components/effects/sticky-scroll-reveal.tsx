"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: React.ReactNode | any;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];
  return (
    <motion.div
      // animate={{
      //   backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      // }}
      className="h-[30rem] overflow-y-auto flex justify-center relative rounded-md p-8 w-full"
      ref={ref}
    >
      <div className="div relative flex items-start px-4 justify-around w-1/2">
        <div className="max-w-2xl left-0 h-full">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20 h-full">
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-[#dd8080]"
              >
                {item.title}
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg text-[#dd8080] max-w-sm mt-10"
              >
                {item.description}
              </motion.div>
            </div>
          ))}
          
        </div>
        </div>
        <motion.div
          // animate={{
          //   background: linearGradients[activeCard % linearGradients.length],
          // }}
          className={cn(
            "hidden lg:block max-h-2/3 w-1/2  rounded-md bg-white sticky top-10 overflow-hidden right-0",
            contentClassName
          )}
        >
          <div
            className={cn(
              "hidden lg:block rounded-md ")}
          >
            {content[activeCard].content ?? null}
          </div>
        </motion.div>
    </motion.div>
  );
};
