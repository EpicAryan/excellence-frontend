import React from "react";
import { cn } from "@/lib/utils";

interface GradientProps {
    className?: string;
}

const OvalGradientShape: React.FC<GradientProps> = ({ className }) => {
    return (
        <div
            className={cn(
                "md:w-[500px] md:h-[70px] lg:w-[50rem] lg:h-[5rem] bg-custom-oval-gradient blur-[100px] opacity-100 ",
                className
            )}
        />
    );
};

const HeroGradient: React.FC<GradientProps> = ({ className }) => {
    return (
        <div
            className={cn(
                "h-56 w-48 md:h-96 md:w-72 rounded-full bg-buttontag/80 blur-[64px] shadow-[4px_0_50px_5px_rgba(141,108,203,.7)] ",
                className
            )}
        ></div>
    );
};

const AboutGradientOne: React.FC<GradientProps> = ({ className }) => {
    return (
        <div className={cn(" ", className)}>
            <svg
                className="w-[150px] lg:w-[352px] lg:h-[1138px]"
                viewBox="0 0 352 1138"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_f_419_198)">
                    <ellipse
                        cx="-268.337"
                        cy="569.012"
                        rx="426.5"
                        ry="237.5"
                        transform="rotate(-36.9022 -268.337 569.012)"
                        fill="#8D6CCB"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_f_419_198"
                        x="-888.103"
                        y="0.161621"
                        width="1239.53"
                        height="1137.7"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        />
                        <feGaussianBlur
                            stdDeviation="125"
                            result="effect1_foregroundBlur_419_198"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

const AboutGradientTwo: React.FC<GradientProps> = ({ className }) => {
    return (
            <svg
                className={cn(" ", className)}
                width="352"
                height="399"
                viewBox="0 0 352 399"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_f_424_48)">
                    <ellipse
                        cx="287.127"
                        cy="199.505"
                        rx="143.656"
                        ry="18.7023"
                        transform="rotate(18.5821 287.127 199.505)"
                        fill="url(#paint0_linear_424_48)"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_f_424_48"
                        x="0.827026"
                        y="0.401611"
                        width="572.599"
                        height="398.207"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                    >
                        <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        />
                        <feGaussianBlur
                            stdDeviation="75"
                            result="effect1_foregroundBlur_424_48"
                        />
                    </filter>
                    <linearGradient
                        id="paint0_linear_424_48"
                        x1="143.471"
                        y1="199.505"
                        x2="430.782"
                        y2="199.505"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stop-color="#9000FF" />
                        <stop offset="0.231256" stop-color="#8D6CCB" />
                        <stop offset="0.85" stop-color="#8C85BE" />
                        <stop offset="0.995" stop-color="#8BA0B1" />
                    </linearGradient>
                </defs>
            </svg>
    );
};

export { OvalGradientShape, HeroGradient, AboutGradientOne, AboutGradientTwo };
