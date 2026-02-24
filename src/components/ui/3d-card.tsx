"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useContext, useRef, useState } from "react";

const MouseEnterContext = createContext<[boolean, (value: boolean) => void]>([false, () => {}]);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <MouseEnterContext.Provider value={[isHovered, setIsHovered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn("flex items-center justify-center", className)}
          style={{
            transformStyle: "preserve-3d",
            transform: isHovered
              ? `rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg)`
              : "rotateY(0deg) rotateX(0deg)",
            transition: "transform 0.1s ease-out",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("flex flex-col", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useContext(MouseEnterContext);

  const z = typeof translateZ === "string" ? (translateZ.match(/^\d+$/) ? `${translateZ}px` : translateZ) : `${translateZ}px`;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("flex transition duration-200 ease-linear", className)}
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${z}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
          : `translateX(0) translateY(0) translateZ(${z}) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {children}
    </Tag>
  );
};
