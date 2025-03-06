import { HeroSection, About, CourseCardSection, CTA } from '@/components'
import React from 'react'

const Home = () => {
  return (
    <main className=' lg:px-0 '>
      <HeroSection/>
      <About/>
      <CourseCardSection/>
      <CTA/>
    </main>
  )
}

export default Home
