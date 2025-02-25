import Image from 'next/image'
import React from 'react'
import hat  from '../../../public/image/hat.png';
import  cone  from '../../../public/image/3d-cone.png';
import  cube  from '../../../public/image/3d-cube.png';
const Icon = () => {
  return (
    <div className='w-full z-10 '>
       
       <Image 
        src={hat}
        alt='hat icon'
        className='absolute hidden md:block md:w-44 lg:w-72 left-12 bottom-8 lg:-left-32 lg:bottom-2 -z-20'
      />
      <Image 
        src={cone}
        alt='3d cone icon'
        className='absolute hidden md:block md:w-20 lg:w-32 left-24 top-20 lg:top-24  lg:left-10 -z-20' 
      />
      <Image 
        src={cube}
        alt='3d cube icon'
        className='absolute hidden md:block md:w-16 lg:w-24 top-4 lg:-left-24 lg:top-24 -z-20'
      />
    </div>
  )
}

export default Icon
