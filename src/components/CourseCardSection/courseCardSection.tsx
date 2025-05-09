"use client";

import React, { useState } from "react";
import {
    InfiniteMovingCards,
    CourseHeadingGradient,
    CourseLineGradient,
    CourseLineSvg,
} from "@/components";
import Image from "next/image";
import CourseText from "../../../public/image/course-text.png";
import SuperToroid from "../../../public/image/super-toroid.png";
import { courseSections } from "@/lib/constants";
import { motion } from "motion/react";

const CourseCardSection = () => {
  const [isHovered, setIsHovered] = useState(false);
    return (
        <section
            id="courses"
            className="w-full min-h-screen md:container md:mx-auto  mb-20"
        >
            <div className="relative mb-20 lg:mb-40 mt-28 lg:mt-60 px-2 lg:px-0">
                <h1 className="font-title font-bold text-xl md:text-4xl text-center drop-shadow-[0px_3px_1px_rgba(141,108,203,1)]">
                    <span className="text-gradient-800">Unlock</span> Success
                    with Expert-Curated Notes
                </h1>
                <CourseLineSvg className="absolute w-48 lg:w-[550px] right-0 -translate-x-1/2 -translate-y-1/4 lg:translate-y-1/3 " />
                <CourseHeadingGradient className="absolute -translate-y-full translate-x-4 lg:translate-x-1/2 lg:-translate-y-1/2 lg:-left-24 " />
                <Image
                    src={CourseText}
                    alt="Course Text"
                    className="absolute size-14 lg:size-28 right-[15%] lg:right-1/4 translate-x-2 bottom-2/3 lg:bottom-1/2 -translate-y-2 lg:translate-y-0 "
                />
                <Image
                    src={SuperToroid}
                    alt="superToroid"
                    className="absolute hidden lg:block size-12 left-1/4 -translate-x-8 bottom-[20%] -z-40"
                />
            </div>
            {courseSections.map((section, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-8 lg:gap-16 mt-12 lg:mt-20 "
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="relative pl-6 sm:pl-8 md:pl-10"
                    >
                        <motion.h2
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            whileHover={{ color: "#7A51C8" }}
                            className="text-lg md:text-xl lg:text-2xl font-bold text-gray-200 relative inline-block cursor-default transition-colors duration-300 group"
                        >
                            {section.title}
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={ isHovered ? {scaleX:1 } : { scaleX: [0, 1, 0] }}
                                transition={ isHovered ? {duration: 0.4, ease: "easeInOut"}:{
                                    duration: 1.6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    repeatType: "loop",
                                }}
                                className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#7A51C8] origin-left"
                            />
                        </motion.h2>
                    </motion.div>

                    <div className="max-h-[40rem] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                        <InfiniteMovingCards
                            items={section.items}
                            direction="right"
                            speed="fast"
                        />
                    </div>
                    <div className="relative">
                        <hr className="mt-4 lg:mt-8 border-[#8BA0B1] mx-4" />
                        <CourseLineGradient className="absolute translate-x-10 lg:translate-x-20 -translate-y-1/2 " />
                    </div>
                </div>
            ))}
        </section>
    );
};

export default CourseCardSection;
