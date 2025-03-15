import React from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full h-full bg-footer text-black ">
            <div className="container mx-auto flex flex-wrap justify-between py-8 ">
                <div className="flex-none w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold mb-3">About Us</h2>
                    <p className="w-full md:w-2/3 mb-4 text-justify">
                        Unlock your true potential with expert guidance and a
                        commitment to excellence.
                        <br />
                        Step into a future of success with quality learning that
                        shapes bright minds!
                    </p>
                </div>
                <div className="flex-auto w-full md:w-1/4 mb-6 md:mb-0">
                    <nav>
                        <h2 className="text-2xl font-bold mb-3">Quick Links</h2>
                        <ul className="space-y-2 px-1">
                            <li className="group">
                                <a
                                    href="/home"
                                    className="group-hover:underline group-hover:underline-offset-2 group-hover:text-blue-800 flex items-center"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="group">
                                <a
                                    href="/about"
                                    className="group-hover:underline group-hover:underline-offset-2 group-hover:text-blue-800 flex items-center"
                                >
                                    About
                                </a>
                            </li>
                            <li className="group">
                                <a
                                    href="/courses"
                                    className="group-hover:underline group-hover:underline-offset-2 group-hover:text-blue-800 flex items-center"
                                >
                                    Courses
                                </a>
                            </li>
                            <li className="group">
                                <a
                                    href="/contact"
                                    className="group-hover:underline group-hover:underline-offset-2 group-hover:text-blue-800 flex items-center"
                                >
                                    Contact
                                </a>
                            </li>
                            <li className="group">
                                <a
                                    href="/faq"
                                    className="group-hover:underline group-hover:underline-offset-2 group-hover:text-blue-800 flex items-center"
                                >
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex-auto w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <FaMapMarkerAlt className="mr-2 text-[#8F63E0]" />
                            <span>123 Education Street, Learning City</span>
                        </li>
                        <li className="flex items-center">
                            <FaPhone className="mr-2 text-[#8F63E0]" />
                            <span>+91 98765 43210</span>
                        </li>
                        <li className="flex items-center">
                            <FaEnvelope className="mr-2 text-[#8F63E0]" />
                            <span>info@excellencepathshala.com</span>
                        </li>
                        <li className="flex items-center">
                            <FaClock className="mr-2 text-[#8F63E0]" />
                            <span>Monday - Saturday: 9:00 AM - 6:00 PM</span>
                        </li>
                    </ul>
                </div>
                <div className="flex-auto w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold mb-3">Connect With Us</h2>
                    <div className="flex space-x-4 mb-4">
                        <a href="https://facebook.com" className="hover:transform hover:scale-110 transition-transform duration-300" aria-label="Facebook">
                            <FaFacebook className="text-2xl text-[#8F63E0] hover:text-blue-800" />
                        </a>
                        <a href="https://twitter.com" className="hover:transform hover:scale-110 transition-transform duration-300" aria-label="Twitter">
                            <FaTwitter className="text-2xl text-[#8F63E0] hover:text-blue-400" />
                        </a>
                        <a href="https://instagram.com" className="hover:transform hover:scale-110 transition-transform duration-300" aria-label="Instagram">
                            <FaInstagram className="text-2xl text-[#8F63E0] hover:text-pink-600" />
                        </a>
                        <a href="https://linkedin.com" className="hover:transform hover:scale-110 transition-transform duration-300" aria-label="LinkedIn">
                            <FaLinkedin className="text-2xl text-[#8F63E0] hover:text-blue-600" />
                        </a>
                        <a href="https://youtube.com" className="hover:transform hover:scale-110 transition-transform duration-300" aria-label="YouTube">
                            <FaYoutube className="text-2xl text-[#8F63E0] hover:text-red-600" />
                        </a>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Subscribe to Newsletter</h3>
                        <form className="flex">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#8F63E0] w-full"
                            />
                            <button 
                                type="submit" 
                                className="bg-[#8F63E0] text-white px-4 py-2 rounded-r hover:bg-purple-700 transition-colors duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-[#8F63E0] text-white border-t-[1px]">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-0">
                    <div>
                        &copy; {new Date().getFullYear()} Excellence Pathशाला. All
                        rights reserved.
                    </div>
                    <div className="mt-2 md:mt-0">
                        <a href="/privacy" className="hover:underline mx-2">Privacy Policy</a> | 
                        <a href="/terms" className="hover:underline mx-2">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
