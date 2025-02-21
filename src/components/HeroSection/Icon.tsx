import Image from 'next/image'
import React from 'react'
import hat  from '../../../public/image/hat.png';
import  cone  from '../../../public/image/3d-cone.png';
import  cube  from '../../../public/image/3d-cube.png';
const Icon = () => {
  return (
    <div className='relative w-full z-10 '>
       
       <Image 
        src={hat}
        alt='hat icon'
        className='absolute  hidden lg:inline lg:w-48 xl:w-60 lg:top-[-5rem] xl:top-[-6rem] lg:left-[2vw] xl:left-[18vw] transform translate-x-1/2'
      />
      <Image 
        src={cone}
        alt='3d cone icon'
        className='absolute hidden lg:inline w-28 top-[100] left-[30%]' 
      />
      <Image 
        src={cube}
        alt='3d cube icon'
        className='absolute hidden lg:inline w-20 top-[70] left-[25%]'
      />
    </div>
  )
}

export default Icon
