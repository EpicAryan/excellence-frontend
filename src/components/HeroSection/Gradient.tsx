import React from "react";
import { cn } from "@/lib/utils";

interface OvalGradientShapeProps {
  className?: string;
}
interface HeroGradientProps {
  className?: string;
}

const OvalGradientShape: React.FC<OvalGradientShapeProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "md:w-[500px] md:h-[70px] lg:w-[50rem] lg:h-[5rem] bg-custom-oval-gradient blur-[100px] opacity-100",
        className
      )}
    />
  );
};

const HeroGradient: React.FC<HeroGradientProps> = ({ className }) => {
  return (
    <div className={cn("h-56 w-48 md:h-96 md:w-72 rounded-full bg-buttontag/70 blur-[64px] shadow-[4px_0_50px_5px_rgba(141,108,203,.7)] ", className)}>

    </div>
  )
}

export { OvalGradientShape, HeroGradient };
