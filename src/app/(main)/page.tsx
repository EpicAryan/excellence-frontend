import { HeroSection, About, CourseCardSection } from '@/components'
import React from 'react'

const Home = () => {
  return (
    <main className=' lg:px-0 '>
      <HeroSection/>
      <About/>
      <CourseCardSection/>
    </main>
  )
}

export default Home
