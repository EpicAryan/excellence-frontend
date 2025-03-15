import { HeroSection, About, CourseCardSection, CTA, Footer } from '@/components'
import React from 'react'

const Home = () => {
  return (
    <main className=' lg:px-0 '>
      <HeroSection/>
      <About/>
      <CourseCardSection/>
      <CTA/>
      <Footer/>
    </main>
  )
}

export default Home
