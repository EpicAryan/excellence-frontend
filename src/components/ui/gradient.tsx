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
                    <stop stopColor="#9000FF" />
                    <stop offset="0.231256" stopColor="#8D6CCB" />
                    <stop offset="0.85" stopColor="#8C85BE" />
                    <stop offset="0.995" stopColor="#8BA0B1" />
                </linearGradient>
            </defs>
        </svg>
    );
};

const CourseHeadingGradient: React.FC<GradientProps> = ({ className }) => {
    return (
        <svg
            className={cn("w-80 lg:w-[860px] blur-[80px] lg:blur-[220px] -z-30", className)}
            viewBox="0 0 886 109"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M885.5 54.5C885.5 57.9741 882.625 61.5182 876.742 65.0551C870.896 68.5701 862.24 71.9781 851.047 75.2338C828.668 81.7429 796.261 87.6109 756.187 92.5411C676.046 102.4 565.317 108.5 443 108.5C320.683 108.5 209.954 102.4 129.813 92.5411C89.7386 87.6109 57.3316 81.7429 34.9528 75.2338C23.7596 71.9781 15.1044 68.5701 9.25781 65.0551C3.37474 61.5182 0.5 57.9741 0.5 54.5C0.5 51.0259 3.37474 47.4818 9.25781 43.9449C15.1044 40.4299 23.7596 37.0219 34.9528 33.7662C57.3316 27.2571 89.7386 21.3891 129.813 16.4589C209.954 6.59957 320.683 0.5 443 0.5C565.317 0.5 676.046 6.59957 756.187 16.4589C796.261 21.3891 828.668 27.2571 851.047 33.7662C862.24 37.0219 870.896 40.4299 876.742 43.9449C882.625 47.4818 885.5 51.0259 885.5 54.5Z"
                fill="#7A51CB"
            />
        </svg>
    );
};

const CourseLineGradient: React.FC<GradientProps> = ({ className }) => {
    return (
        <svg
            className={cn("w-[80%] lg:w-[90%] blur-[30px] lg:blur-[120px] h-[28px] fill-gradient-800/70 -z-30", className)}
            viewBox="0 0 957 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M956.156 11.8306C956.289 11.8968 956.38 11.9544 956.439 12C956.38 12.0456 956.289 12.1032 956.156 12.1694C955.791 12.3496 955.216 12.5425 954.41 12.7415C952.806 13.1375 950.4 13.5322 947.218 13.9221C940.86 14.7013 931.472 15.4541 919.367 16.1718C895.163 17.607 860.132 18.8997 816.838 19.9854C730.252 22.1569 610.631 23.5 478.5 23.5C346.369 23.5 226.748 22.1569 140.162 19.9854C96.868 18.8997 61.8374 17.607 37.6325 16.1718C25.5284 15.4541 16.1403 14.7013 9.78224 13.9221C6.60022 13.5322 4.19394 13.1375 2.59031 12.7415C1.7845 12.5425 1.20868 12.3496 0.84434 12.1694C0.710557 12.1032 0.619731 12.0456 0.56086 12C0.619731 11.9544 0.710557 11.8968 0.84434 11.8306C1.20868 11.6504 1.7845 11.4575 2.59031 11.2585C4.19394 10.8625 6.60022 10.4678 9.78224 10.0779C16.1403 9.29866 25.5284 8.54586 37.6325 7.82818C61.8374 6.39303 96.868 5.1003 140.162 4.01456C226.748 1.84312 346.369 0.5 478.5 0.5C610.631 0.5 730.252 1.84312 816.838 4.01456C860.132 5.1003 895.163 6.39303 919.367 7.82818C931.472 8.54586 940.86 9.29866 947.218 10.0779C950.4 10.4678 952.806 10.8625 954.41 11.2585C955.216 11.4575 955.791 11.6504 956.156 11.8306Z"
                
            />
        </svg>
    );
};

export {
    OvalGradientShape,
    HeroGradient,
    AboutGradientOne,
    AboutGradientTwo,
    CourseHeadingGradient,
    CourseLineGradient,
};
