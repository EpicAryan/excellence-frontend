'use client'

import React from 'react'
import Image from 'next/image'
import about from '../../../public/image/about.png'
import cta1 from '../../../public/image/cta-1.png'
import { CourseLineSvg, CtaGradient } from '@/components'
import CtaLineSvg from '../Svg/ctaLineSvg'
import cta2 from '../../../public/image/cta-2.png';
import cta3 from '../../../public/image/cta-3.png';
const CTA = () => {
  return (
    <div id="contact" className='w-full h-full container mx-auto flex flex-col justify-center items-center mb-60 gap-16 md:gap-32 md:px-10 '>
        <div className='relative'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl'>Get in Touch With Us</h1>
            <CourseLineSvg className="absolute w-56 md:w-80 lg:w-[380px] right-0 -translate-y-1/4  "/>
        </div>
        <div className='relative w-full'>
            <div className='relative flex flex-col md:flex-row items-center gap-10 lg:items-start md:justify-between'>
           
                <div className=' w-[17rem] sm:w-[40%] md:w-[16rem] lg:w-[32rem] h-[18rem] lg:h-[16rem]  bg-morph-card rounded-xl  backdrop-blur-md  border border-gradient/70 shadow-[2px_2px_2px_1px_rgba(140,133,190,0.7)] z-10'
                >
                    <div className='h-full flex flex-col lg:flex-row p-3 lg:p-4 rounded-xl gap-6'>
                        <Image 
                            src={about}
                            alt='profile picture'
                            className='rounded-md h-1/2 lg:h-full lg:w-1/2 drop-shadow-[2px_2px_2px_rgba(238,238,238,1)]'
                        />
                        <div className='h-full text-center space-y-3 lg:space-y-6 lg:flex lg:flex-col lg:justify-center'>
                            <h2 className='text-lg lg:text-xl font-semibold lg:font-bold drop-shadow-md'>Educator</h2>
                            <p className='text-base lg:text-lg drop-shadow-md'>Mr. Rahul Kumar</p>
                            <p className='text-base lg:text-lg drop-shadow-md'>Contact - 9765427931</p>
                        </div>
                    </div>
                </div>
                <Image 
                        src={cta1}
                        alt='profile picture'
                        className='hidden xl:block w-24 absolute -bottom-4 left-1/4 xl:translate-x-28 -z-40'
                />
                <Image 
                        src={cta2}
                        alt='profile picture'
                        className='hidden md:block w-24 lg:w-28 absolute bottom-1/3 left-1/3 translate-x-20 lg:translate-x-0 lg:left-1/2 -z-40'
                />
                <Image 
                        src={cta3}
                        alt='profile picture'
                        className='hidden xl:block w-24 absolute -bottom-4 right-1/4 translate-x-20 -z-40'
                />
                <div className='absolute hidden md:block -top-12 w-32 h-32 blur-[6px] bg-[#7A51C8] rounded-full -z-10' />
                <div className='absolute hidden md:block -bottom-16 right-0 lg:left-60 w-32 h-32 blur-[8px] bg-[#7A51C8] rounded-full  -z-10' />

                <div className=' w-[17rem] sm:w-[40%]  md:w-[16rem] lg:w-[20rem] h-[18rem] lg:h-[16rem]  bg-morph-card rounded-xl z-10 backdrop-blur-md border border-gradient/70 shadow-[2px_2px_2px_1px_rgba(140,133,190,0.7)]'
                >
                    <div className='relative h-full flex flex-col p-5 lg:p-5 rounded-xl gap-6'>
                        <h2 className='text-lg lg:text-xl font-semibold lg:font-bold text-center'>Scan to get the location</h2>
                        <Image 
                            src={about}
                            alt='profile picture'
                            className='rounded-md w-full h-full lg:w-2/3 lg:h-2/3 place-self-end drop-shadow-[2px_2px_2px_rgba(238,238,238,1)] lg:mr-6 lg:mt-1'
                        />
                        <CtaLineSvg className='hidden lg:block w-10  absolute translate-y-1/2 translate-x-1/2'/>
                    </div>
                    
                </div>
            </div>
            <CtaGradient className='hidden md:block absolute -translate-y-3/4 translate-x-36 -z-20'/>
        </div>
    </div>
  )
}

export default CTA
