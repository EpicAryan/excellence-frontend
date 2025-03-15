
'use client'
// components/Navbar.js

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import logo from '../../../public/image/logo.png';
import { TbLogin2 } from "react-icons/tb";
import { motion } from "motion/react";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Set scrolled state for background change
      setScrolled(currentScrollPos > 10);
      
      // Hide navbar immediately when scrolling down, show when scrolling up
      const isScrollingDown = prevScrollPos < currentScrollPos;
      const isVisible = !isScrollingDown || currentScrollPos < 10;
      
      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled ? 'bg-[#1a1a2e] shadow-lg' : 'bg-transparent'
      } py-2 px-4 md:px-10 lg:px-20`}
    >
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
                className="w-24 sm:w-30 md:w-36"
                priority
              />
            </motion.div>
          </Link>
        </div>

        {/* Desktop Navigation Links with Line Animation - Hidden on Mobile */}
        <div className="hidden md:flex items-center space-x-8 mr-8">
          <Link href="#home" scroll={true}>
            <span className="nav-link relative text-white hover:text-[#B091EA] transition-colors duration-300">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B091EA] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
          <Link href="#about" scroll={true}>
            <span className="nav-link relative text-white hover:text-[#B091EA] transition-colors duration-300">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B091EA] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
          <Link href="#courses" scroll={true}>
            <span className="nav-link relative text-white hover:text-[#B091EA] transition-colors duration-300">
              Courses
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B091EA] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
          <Link href="#contact" scroll={true}>
            <span className="nav-link relative text-white hover:text-[#B091EA] transition-colors duration-300">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B091EA] transition-all duration-300 group-hover:w-full"></span>
            </span>
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
