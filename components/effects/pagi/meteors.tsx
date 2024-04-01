import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute  h-0.5 w-0.5 rounded-[8px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[180deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#df492337] before:to-transparent",
            className
          )}
          style={{
            top: 50,
            // left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
            left: Math.floor(Math.random() * ((50) - -50) + -0) ,
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * (18 - 2) + 2) + "s",
          }}
        ></span>
      ))}
    </>
  );
};
