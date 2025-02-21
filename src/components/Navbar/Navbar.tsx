'use client'
// components/Navbar.js

import Link from 'next/link';
import Image from 'next/image'; 
import logo from '../../../public/image/logo.png';
import { TbLogin2 } from "react-icons/tb";
import  { motion } from "motion/react";
const Navbar = () => {
  return (
    <nav className="bg-transparent py-2 px-4 md:px-10 lg:px-20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
          <motion.div 
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.5, ease: "easeOut" }} 
              whileHover={{ scale: 1.05 }} 
              className="cursor-pointer inline-block" 
            >
              <Image
                src={logo}
                alt="Logo"
                // width={150}
                // height={50}
                className="w-24 sm:w-30 md:w-36"
                priority
              />
            </motion.div>
          </Link>
        </div>

        {/* Sign In Button */}
        <div>
          <Link href="/signin"> 
            <button className="custom-button-effect flex gap-2 items-center">
            <TbLogin2 className='text-xl md:text-2xl'/>Sign In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
