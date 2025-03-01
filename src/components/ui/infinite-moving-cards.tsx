"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    title: string;
    img: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-[1440px] overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-12 py-4 w-max flex-nowrap overflow-hidden",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[200px] sm:w-[220px] md:w-[240px] lg:w-[280px] max-w-full h-[300px] md:h-[320px] lg:h-[360px] max-h-full bg-cardbg/35 stroke-gradient-100 rounded-2xl  flex-shrink-0  p-2 shadow-[1px_2px_4px_1px_rgba(217,217,217,1)]"
            key={item.title}
          >
            <div className="w-full h-full flex flex-col gap-2">

            <div className="h-1/2 rounded-2xl overflow-hidden">
                <Image
                src={item.img} 
                alt={item.title}
                width={280} 
                height={180} 
                className="w-full h-full object-cover rounded-2xl"
                />
            </div>
              <div className="h-1/2 flex flex-col justify-around mb-1">
                <h2 className="font-bold text-sm lg:text-lg  underline underline-offset-2 text-center">
                    {item.title}
                </h2>
                <p className="font-light text-xs lg:text-sm px-1 line-clamp-2">{item.quote}</p>
                <button className="w-full py-1 text-xs lg:text-base bg-buttontag rounded-md shadow[0px_4px_4px_rgba(217,217,217,1)]">
                    View Notes
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
