'use client'
// import { useEffect, useState } from "react";
import { motion } from "motion/react";

const TypingText= () => {
    // const fullText = "Excellence Pathशाला";
    // const [displayedText, setDisplayedText] = useState("");

    // useEffect(() => {
    //     let index = 0;
    //     const interval = setInterval(() => {
    //         if (index < fullText.length) {
    //             setDisplayedText((prev) => prev + fullText[index]);
    //             index++;
    //         } else {
    //             clearInterval(interval);
    //         }
    //     }, 100); // Adjust speed by changing the delay (100ms per character)

    //     return () => clearInterval(interval);
    // }, []);

    // return (
    //     <div className="w-auto absolute -left-28 top-[64%] -translate-y-1/2 flex items-center justify-center">
    //         <motion.p
    //             initial={{ opacity: 0 }}
    //             animate={{ opacity: 1 }}
    //             transition={{ duration: 0.5, ease: "easeInOut" }}
    //             className="whitespace-nowrap -rotate-90 font-title text-3xl md:text-5xl lg:text-5xl font-extrabold text-center underline underline-offset-[12px] decoration-gradient-800 decoration-4"
    //         >
    //             {displayedText}
    //         </motion.p>
    //     </div>
    // );
    return (
        <div className="w-40 hidden absolute top-[64%] translate-y-24 slide-out-to-left-10 lg:inline">
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                }}
                className="whitespace-nowrap"
            >
                <p className=" -rotate-90 font-title lg:text-5xl font-extrabold text-center underline underline-offset-[12px] decoration-gradient-800 decoration-4">
                    Excellence Pathशाला
                </p>
            </motion.div>
        </div>
    );
};

export default TypingText;
