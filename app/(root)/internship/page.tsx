'use client'
import InternCategoryCard from '@/components/shared/cards/interncategorycard'
import { Button } from '@/components/ui/button'
import React, { useRef } from 'react'
import { CarouselSliderIntern } from '@/components/shared/cards/sliders/carouselslider-intern'

const Internship = () => {
  const hrRef = useRef<HTMLDivElement>(null)
  const devRef = useRef<HTMLDivElement>(null)
  const marketingRef = useRef<HTMLDivElement>(null)
  const financeRef = useRef<HTMLDivElement>(null)
  const opsRef = useRef<HTMLDivElement>(null)

  const scrollToCategory = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className='mx-4 sm:mx-8 md:mx-1 lg:mx-1'>
      {/* Hero Section */}
      <div className='flex flex-col lg:flex-row justify-between items-center gap-8'>
        <div className='flex flex-col gap-3 w-full lg:w-3/5'>
          <div className='flex xs:flex-row gap-2 items-center'>
            <h1 className='text-green-600 text-3xl sm:text-4xl md:text-5xl font-extrabold'>Internship</h1>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold'>To Learn</h1>
          </div>
          <p className='p-2 text-slate-400 w-full lg:w-3/4 hover:text-slate-700 transition-all duration-100'>
            Explore opportunities from across the globe to grow, showcase skills, gain CV points & get hired by your dream company.
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Button className='bg-green-950 text-base sm:text-xl border border-white hover:bg-white hover:border hover:border-green-950 hover:text-black rounded-full p-4 sm:p-6 transition-all duration-100'>
              Find Internships
            </Button>
            <Button className='bg-white text-base sm:text-xl text-black border border-green-950 hover:bg-green-950 hover:border hover:border-white hover:text-white rounded-full p-4 sm:p-6 transition-all duration-100'>
              + Post Internships
            </Button>
          </div>
        </div>
        <img 
          src="internpage/internpageimg.webp" 
          alt="Internship illustration" 
          className='w-full lg:w-2/5 mt-6 lg:mt-0' 
        />
      </div>

      {/* Category Navigation */}
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-10 mb-6 bg-white py-4 overflow-x-auto'>
        <h1 className='text-lg sm:text-xl font-semibold whitespace-nowrap'>Internship Category:</h1>
        <div className='flex gap-2 sm:gap-4 pb-2 overflow-x-auto w-full sm:w-auto'>
          <button onClick={() => scrollToCategory(hrRef)} className='flex-shrink-0'>
            <InternCategoryCard category="Human Resources" />
          </button>
          <button onClick={() => scrollToCategory(devRef)} className='flex-shrink-0'>
            <InternCategoryCard category="Software Development" />
          </button>
          <button onClick={() => scrollToCategory(marketingRef)} className='flex-shrink-0'>
            <InternCategoryCard category="Marketing" />
          </button>
          <button onClick={() => scrollToCategory(financeRef)} className='flex-shrink-0'>
            <InternCategoryCard category="Finance" />
          </button>
          <button onClick={() => scrollToCategory(opsRef)} className='flex-shrink-0'>
            <InternCategoryCard category="Operations" />
          </button>
        </div>
      </div>

      {/* Category Sections */}
      <div ref={hrRef} className='mt-8'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4'>Human Resources Internships</h2>
        <CarouselSliderIntern />
      </div>

      <div ref={devRef} className='mt-12'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4'>Software Development Internships</h2>
        <CarouselSliderIntern />
      </div>

      <div ref={marketingRef} className='mt-12'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4'>Marketing Internships</h2>
        <CarouselSliderIntern />
      </div>

      <div ref={financeRef} className='mt-12'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4'>Finance Internships</h2>
        <CarouselSliderIntern />
      </div>

      <div ref={opsRef} className='mt-12 mb-12 sm:mb-20'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4'>Operations Internships</h2>
        <CarouselSliderIntern />
      </div>
    </div>
  )
}

export default Internship