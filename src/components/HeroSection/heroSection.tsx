'use client'

import React from 'react'
import { ArrowSvg, AboutGradientOne  } from '@/components'
import Image from 'next/image'
import hero from '../../../public/image/hero-section.png'
import { OvalGradientShape, HeroGradient } from '../ui/gradient'
import Icon from './icon'
// import {motion} from 'motion/react'


const HeroSection = () => {
  return (
    <main id="home" className='relative w-full h-full px-4 lg:px-0 pt-28'>
        <div className=' absolute -left-72 -top-16 rotate-[25deg]'>
            <OvalGradientShape className=''/>
        </div>
        <div className=' absolute -right-72 -top-16 -rotate-[25deg] '>
            <OvalGradientShape className='rotate-180'/>
        </div>
        <div className='md:mt-20'>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-fit relative'>
                    <Icon/>
                    <h1 className="font-title text-center text-3xl md:text-5xl lg:text-7xl font-extrabold drop-shadow-[4px_0_4px_rgba(144,0,255,1)] z-20 "> Excellence Path
                        <span className='text-gradient-800 drop-shadow-[1px_1px_rgba(255,255,255,1)]'>शाला</span>
                    </h1>
                    <p className='text-center text-xs md:text-base mt-1 text-subtext font-light z-20'>
                    Unlock your true potential with expert guidance and personalized learning.<span className="inline"><br/></span>
                        Build a strong foundation, master every subject, and achieve academic excellence <span className="hidden "><br/></span>
                        with the right support
                    </p>
                </div>
            </div>

            <div className=' flex flex-col-reverse lg:flex-row container mx-auto mt-14'>
                <div className='lg:w-1/2 flex flex-col items-center justify-center lg:items-end lg:justify-end md:mb-20'>
                    <div className='mb-2 md:mb-8 text-center text-xs md:text-base mt-6 text-gray-300 font-semibold md:pl-4'>
                        सुबह पढ़ो या रात को हमेशा दिल में रखो इस बात को <br className='md:hidden'/> सफल बनाना है <br className='hidden md:inline-block'/> एक दिन अपने आप को
                    </div>
                    <div className='relative left-12 md:left-20 lg:-left-24 '>
                        <ArrowSvg />
                    </div>
                    <div className='flex text-xs md:text-2xl lg:text-xl font-light rounded-md drop-shadow-[3px_3px_2px_rgba(141,108,203,1)] shadow-[3px_3px_2px_4px_rgba(141,108,203,0.1)] md:mr-5'>
                        <div className='bg-bigbutton px-8 py-3 rounded-l-md '>
                            Get Your Tutor Now
                        </div>
                        <button 
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className='bg-bigbutton border-l-[1px] border-gray-300 px-8 py-3 rounded-r-md text-[#B091EA] hover:text-[#9057FA]'>
                            <span>Click here</span>
                        </button>
                    </div>
                    <p className='text-center text-xs md:text-sm mt-6 text-gray-300 font-light '>
                        Access expert-crafted notes, engaging video lessons, and personalized <span className='hidden md:inline'><br/></span> tutoring — all in one place to make learning easier and more effective
                    </p>
                </div>
                <div className='relative lg:w-1/2 overflow-visible'>
                    
                    <Image 
                        src={hero}
                        alt='hero image'
                        className='w-[450px] md:w-[540px] place-self-center lg:place-self-end lg:mr-16  z-10'
                    />       
                    <HeroGradient className='absolute rotate-[25deg] bottom-[20%] right-[20%] md:right-[28%] lg:right-[20%] -translate-x-4 -z-10'/>
                </div>
                
            </div>
        <AboutGradientOne className="absolute -bottom-[19rem] -left-16 md:-left-4  lg:top-72 lg:-left-8 "/>
        </div>
    </main>
  )
}

export default HeroSection
