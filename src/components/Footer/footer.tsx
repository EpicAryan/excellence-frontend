'use client';
import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

const socialIcons = [
  { icon: FaFacebook, link: "https://facebook.com", color: "hover:text-blue-800" },
  { icon: FaTwitter, link: "https://twitter.com", color: "hover:text-blue-400" },
  { icon: FaInstagram, link: "https://instagram.com", color: "hover:text-pink-600" },
  { icon: FaLinkedin, link: "https://linkedin.com", color: "hover:text-blue-600" },
  { icon: FaYoutube, link: "https://youtube.com", color: "hover:text-red-600" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-footer text-black">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-6">
        {/* About */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-sm text-gray-700 leading-relaxed break-words">
            Unlock your true potential with expert guidance and a commitment to excellence.
            <br />
            Step into a future of success with quality learning that shapes bright minds!
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-3 text-sm">
            {["Home", "About", "Courses", "Contact", "FAQ"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gray-700 hover:text-[#8F63E0] cursor-pointer"
              >
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="mr-3 text-[#8F63E0]" />
              123 Education Street, Learning City
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FaPhone className="mr-3 text-[#8F63E0]" />
              +91 98765 43210
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FaEnvelope className="mr-3 text-[#8F63E0]" />
              info@excellencepathshala.com
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FaClock className="mr-3 text-[#8F63E0]" />
              Mon - Sat: 9:00 AM - 6:00 PM
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
          <div className="flex justify-center md:justify-start space-x-4 mb-6">
            {socialIcons.map(({ icon: Icon, link, color }, idx) => (
              <motion.a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`text-[#8F63E0] ${color} text-xl`}
              >
                <Icon />
              </motion.a>
            ))}
          </div>

          {/* Email */}
          <h3 className="text-lg font-semibold mb-3">Write to Us</h3>
          <motion.a
            href="mailto:info@excellencepathshala.com?subject=Inquiry&body=Hi, I would like to know more about your courses."
            whileHover={{
              scale: 1.05,
              backgroundColor: "#7C4DFF",
              boxShadow: "0px 5px 15px rgba(140, 82, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block bg-[#8F63E0] text-white px-6 py-3 rounded-xl font-medium text-center w-full sm:w-auto"
          >
            Send Us an Email
          </motion.a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#8F63E0] text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6 text-center md:text-left">
          <div className="text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Excellence Pathशाला. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
            <p className="hover:underline cursor-pointer">Privacy Policy</p>
            <p className="hover:underline cursor-pointer">Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
