"use client";
import React from "react";
import { motion } from "motion/react";

const ArrowSvg = () => {
    const pathVariants = {
        initial: {
            pathLength: 0,
        },
        animate: {
            pathLength: 1,
            transition: {
                duration: 2,
                ease: "linear",
                repeat: Infinity, 
                repeatType: "loop" as "loop" | "reverse" | "mirror",
            },
        },
    };

    return (
        <motion.svg
            className="w-12 md:w-20 lg:w-24 lg:h-28"
            viewBox="0 0 80 105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                variants={pathVariants}
                initial="initial"
                animate="animate"
                d="M0.5 1C0.5 1 23.6739 14.5 34 27C44.3261 39.5 44.8571 43 48 54C51.1429 65 47 65 43 65C39 65 35.4737 60 37.5 56.5C41 50.4545 50.7718 56.0237 59 65C70 77 79 104.5 79 104.5M79 104.5C79 104.5 72.5 94.5 69 96M79 104.5C79 104.5 77 93 79 86"
                stroke="#B091EA"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </motion.svg>
    );
};

export { ArrowSvg };
