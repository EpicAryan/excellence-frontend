"use client";

import React from "react";
import { InfiniteMovingCards, CourseHeadingGradient, CourseLineGradient, CourseLineSvg } from "@/components";
import Image from "next/image";
import CourseText from "../../../public/image/course-text.png"
import SuperToroid from "../../../public/image/super-toroid.png"

const testimonials = [
    {
        quote: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
        title: "A Tale of Two Cities",
        img: "/image/about.png",
    },
    {
        quote: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
        title: "Hamlet",
        img: "/image/about.png",
    },
    {
        quote: "All that we see or seem is but a dream within a dream.",
        title: "A Dream Within a Dream",
        img: "/image/about.png",
    },
    {
        quote: "It is a truth universally acknowledged, that a single man in ",
        title: "Pride and Prejudice",
        img: "/image/about.png",
    },
    {
        quote: "Call me Ishmael. Some years ago—never mind how long precisely—having ",
        title: "Moby-Dick",
        img: "/image/about.png",
    },
];

const courseSections = [
    { title: "English Batch - 1", items: testimonials },
    { title: "Maths Batch - 2", items: testimonials },
    { title: "Physics Batch - 3", items: testimonials },
    { title: "Chemistry Batch - 4", items: testimonials },
    { title: "Biology Batch - 5", items: testimonials },
    { title: "Computer Science Batch - 6", items: testimonials },
];
const CourseCardSection = () => {
    return (
        <section className="w-full min-h-screen md:container md:mx-auto  mb-20">
            <div className="relative mb-20 lg:mb-40 mt-28 lg:mt-60 px-2 lg:px-0">
                <h1 className="font-title font-bold text-xl md:text-4xl text-center drop-shadow-[0px_3px_1px_rgba(141,108,203,1)]">
                    <span className="text-gradient-800">Unlock</span> Success
                    with Expert-Curated Notes
                </h1>
                <CourseLineSvg className="absolute w-48 lg:w-[550px] right-0 -translate-x-1/2 -translate-y-1/4 lg:translate-y-1/3 "/>
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
                <div key={index} className="flex flex-col gap-8 lg:gap-16 mt-12 lg:mt-32 ">
                    <div className="bg-buttontag size-fit px-2 lg:px-4 py-2 text-xs lg:text-lg lg:font-bold rounded-sm lg:rounded-md hover:bg-[#7A51C8] drop-shadow-[1px_1px_2px_rgba(163,163,163,1)] lg:drop-shadow-[2px_2px_3px_rgba(163,163,163,1)] translate-x-6 sm:translate-x-8">
                        {section.title}
                    </div>
                    <div className="max-h-[40rem] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                        <InfiniteMovingCards
                            items={section.items}
                            direction="right"
                            speed="fast"
                        />
                    </div>
                    <div className="relative">
                      <hr className="mt-4 lg:mt-12 border-[#8BA0B1] mx-4" />
                      <CourseLineGradient className="absolute translate-x-10 lg:translate-x-20 -translate-y-1/2 " />
                    </div>
                </div>
            ))}
        </section>
    );
};

export default CourseCardSection;
