"use client";

import React from "react";
import Image from "next/image";
import about from "../../../public/image/about.png";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { HiRocketLaunch } from "react-icons/hi2";
import { motion } from "motion/react";
import { AboutLineSvg, AboutGradientTwo} from "@/components"

const features = [
    {
        text: "Expert Guidance",
        icon: <FaBookOpenReader className="text-xl lg:text-3xl lg:mr-3" />,
    },
    {
        text: "Personalized Support",
        icon: <FaHandshake className="text-xl lg:text-3xl lg:mr-3 " />,
    },
    {
        text: "Structured Learning",
        icon: <GiBookshelf className="text-xl lg:text-3xl lg:mr-3 " />,
    },
    {
        text: "Effective Learning",
        icon: <HiRocketLaunch className="text-xl lg:text-3xl lg:mr-3" />,
    },
];
const About = () => {
    return (
        <div className="w-full h-full container mx-auto ">
         
            <section className=" my-10 lg:my-36 flex lg:justify-between flex-col-reverse lg:flex-row items-center relative ">
                <figure className="hidden lg:block w-1/2 px-8">
                    <Image
                        src={about}
                        alt="about image"
                        className="lg:place-self-end scale-125"
                    />
                </figure>
                <div className="lg:w-1/2 flex flex-col items-center justify-around gap-6 lg:pl-16">
                    <h1 className="relative text-2xl md:text-3xl font-bold mb-4">Why Choose Us
                      <span className="absolute -left-8 top-8"><AboutLineSvg/></span>
                    </h1>
                    <p className="lg:tracking-wide text-xs md:text-sm lg:text-base/10 text-gray-300 text-center ">
                        At Excellence Pathशाला , we make learning effective and
                        engaging with expert guidance and a structured approach.
                        Our personalized support helps students build confidence
                        and achieve their goals.
                    </p>
                    <figure className="lg:hidden px-6 my-2">
                      <Image
                        src={about}
                        alt="about image"
                        className="lg:place-self-end scale-110 lg:scale-125"
                      />
                    </figure>
                    <div className="w-full lg:my-4">
                        <ul className="flex flex-wrap justify-center gap-2 lg:gap-4 rounded-lg">
                            {features.map((item, index) => (
                                <li
                                    key={index}
                                    className="group relative flex items-center justify-center rounded-lg border-2 border-transparent w-[calc(50%-1rem)] md:w-[calc(50%-2rem)] py-2 max-h-[50px] font-semibold overflow-hidden transition-all duration-500 
  hover:border-footer"
                                >
                                    {/* Moving Gradient */}
                                    <motion.div
                                        className="absolute inset-0 group-hover:bg-[linear-gradient(to_right,transparent_1%,rgba(144,108,203,0.5)_40%,rgba(176,145,234,0.5)_60%,transparent_100%)]"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1,
                                            ease: "linear",
                                        }}
                                    />

                                    {/* Content */}
                                    <span className="group-hover:text-[#9057FA] relative flex items-center gap-2 text-xs md:text-base lg:text-lg">
                                        {item.icon}
                                        {item.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-bigbutton text-sm md:text-base px-6 md:px-8 py-3  rounded-md md:tracking-wide drop-shadow-[3px_3px_2px_rgba(141,108,203,1)] shadow-[3px_3px_2px_4px_rgba(141,108,203,0.1)]">
                        Join us and Unlock your full{" "}
                        <span className="text-[#B091EA] hover:text-[#9057FA]">
                            potential
                        </span>
                    </div>
                </div>
             <AboutGradientTwo className="absolute hidden lg:block top-0 lg:-right-40 "/>
            </section>
        </div>
    );
};

export default About;
