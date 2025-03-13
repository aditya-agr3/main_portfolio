"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/utils/cn";

/** ✅ Improved Type Definitions for Button */
interface ButtonProps<C extends React.ElementType = "button"> {
  borderRadius?: string;
  as?: C; // Generic type for the dynamic element
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  children?: React.ReactNode;
}

export function Button<C extends React.ElementType = "button">({
  borderRadius = "1.75rem",
  children,
  as: Component = "button" as C, // Type assertion for default value
  containerClassName,
  borderClassName,
  duration = 2000,
  className,
  ...otherProps
}: ButtonProps<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonProps>) {
  // Extract props specific to the Component
  const componentProps = {
    className: cn(
      "bg-transparent relative text-xl p-[1px] overflow-hidden md:col-span-2 md:row-span-1",
      containerClassName
    ),
    style: { borderRadius },
    ...otherProps,
  } as React.ComponentPropsWithoutRef<C>; // Explicitly type the props

  return (
    <Component {...componentProps}>
      <div
        className="absolute inset-0 rounded-[1.75rem]"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8] bg-[radial-gradient(#CBACF9_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

/** Improved Type Definitions for MovingBorder */
interface MovingBorderProps extends React.SVGProps<SVGSVGElement> {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}

export const MovingBorder: React.FC<MovingBorderProps> = ({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  ...otherProps
}) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (!pathRef.current) return;
    const bbox = pathRef.current.getBBox();
    const length = bbox.width; // `getBBox()` is used for `rect`
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((progress.get() + delta * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => val);
  const transform = useMotionTemplate`translateX(${x}px) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "0%",
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};