'use client'
import OptionCard from '@/components/shared/cards/optioncard'
import { Button } from '@/components/ui/button'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { CarouselSliderCourse } from '@/components/shared/cards/sliders/carouselslider-course'
import { CarouselSliderCompetition } from '@/components/shared/cards/sliders/carouselslider-competition'
import { CarouselSliderIntern } from '@/components/shared/cards/sliders/carouselslider-intern'
import { CarouselSliderMentor } from '@/components/shared/cards/sliders/carouselslider-mentor'
import NumbersCard from '@/components/shared/cards/numberscard'
import { useRouter } from 'next/navigation'

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    
    const sliderImages = [
        '/homepage/slider/a.webp',
        '/homepage/slider/abg.webp',
        '/homepage/slider/as.webp',
        '/homepage/slider/f.webp',
        '/homepage/slider/hp.webp',
        '/homepage/slider/l.webp',
        '/homepage/slider/w.webp',
        '/homepage/slider/wip.webp',
    ]

    useEffect(() => {
        // Check if mobile device
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        checkIfMobile()
        window.addEventListener('resize', checkIfMobile)
        
        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => 
                prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
            )
        }, 3000)

        return () => clearInterval(interval)
    }, [sliderImages.length])

    useEffect(() => {
        if (sliderRef.current) {
            const slideWidth = isMobile ? 80 : 128
            sliderRef.current.scrollTo({
                left: currentIndex * slideWidth,
                behavior: 'smooth'
            })
        }
    }, [currentIndex, isMobile])

    const router = useRouter()

    const handleClick = () => {
        router.push('/quiz')
    }

    return (
        <div className='mx-4 md:mx-1 lg:mx-1'>
            {/* Hero Section */}
            <div className='flex flex-col lg:flex-row gap-8'>
                <div className='w-full lg:w-1/2 mt-6 flex flex-col gap-4 justify-center'>
                    <div className='flex flex-col md:flex-row gap-3 items-center'>
                        <h1 className='text-green-600 text-4xl sm:text-5xl font-extrabold'>Unlock</h1>
                        <h1 className='text-4xl sm:text-5xl font-extrabold'>Your Career</h1>
                    </div>
                    <p className='p-2 text-slate-400 w-full lg:w-3/4 hover:text-slate-700 transition-all duration-100'>
                        Explore opportunities from across the globe to grow, showcase skills, gain CV points & get hired by your dream company.
                    </p>
                </div>
                <div className='w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                    <OptionCard bg={"bg-cyan-100"} title={"Internships"} description1={"Gain,"} description2={"Apply, Upskill"} asset={'/homepage/book.svg'}/>
                    <OptionCard bg={"bg-green-100"} title={"Competitions"} description1={"Battle,"} description2={"For Excellence"} asset={'/homepage/certificate.svg'}/>
                    <OptionCard bg={"bg-purple-100"} title={"Mentorships"} description1={"Guidance"} description2={"From Top Mentors"} asset={'/homepage/person.svg'}/>
                    <OptionCard bg={"bg-amber-100"} title={"Courses"} description1={"Learn,"} description2={"Do Better"} asset={'/homepage/computer.svg'}/>
                </div>
            </div>

            {/* Quiz Banner */}
            {/* <div className='flex flex-col md:flex-row justify-between bg-custom-gradient text-black rounded-xl mt-10 items-center p-4 md:p-0'>
                <div className='flex flex-col gap-2 mb-4 md:mb-0 md:ml-4'>
                    <p className='text-xl md:text-2xl font-bold'>Test Your Knowledge</p>
                    <p className='text-lg md:text-xl font-semibold'>Take our Specialized Quiz</p>
                    <Button onClick={handleClick} className='bg-green-600 w-full md:w-20 text-white justify-center hover:bg-green-700 transition-all duration-100'>
                        Take Test
                    </Button>
                </div>
                <img src="homepage/man.png" alt="man_img" className='h-40 md:h-60'/>
            </div> */}

            {/* Companies Slider */}
            {/* <div className='mt-10 flex flex-col md:flex-row items-center bg-slate-100 p-2 rounded-lg gap-2 md:gap-0'>
                <h2 className='text-lg md:text-xl font-bold whitespace-nowrap'>Companies Tied With Us</h2>
                <div 
                    ref={sliderRef}
                    className='flex items-center overflow-x-hidden space-x-4 md:space-x-10 gap-2 md:gap-4 scrollbar-hide ml-0 md:ml-4'
                >
                    {sliderImages.map((image, index) => (
                        <div 
                            key={index} 
                            className='flex-shrink-0 items-center w-20 md:w-28 h-full'
                        >
                            <img 
                                src={image} 
                                alt={`Slide ${index + 1}`}
                                className='w-full h-full object-cover rounded-lg'
                            />
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Courses Section */}
            <div className='mt-10 space-y-4'>
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-0'>
                    <div>
                        <h1 className='text-2xl md:text-3xl'>Courses</h1>
                        <p className='p-1 text-slate-400 hover:text-slate-700 transition-all duration-100'>
                            Explore the Courses that are creating a buzz among your peers!
                        </p>
                    </div>
                    <Link href={'/courses'} className='flex gap-2 underline text-slate-400 hover:text-slate-700 transition-all duration-100 sm:ml-auto items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-slate-400 h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                        View All
                    </Link>
                </div>
                <CarouselSliderCourse />
            </div>

            {/* Internships Section */}
            <div className='mt-10 space-y-4'>
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-0'>
                    <div>
                        <h1 className='text-2xl md:text-3xl'>Internships</h1>
                        <p className='p-1 text-slate-400 hover:text-slate-700 transition-all duration-100'>
                            Find the Internships that fits your career aspirations.
                        </p>
                    </div>
                    <Link href={'/courses'} className='flex gap-2 underline text-slate-400 hover:text-slate-700 transition-all duration-100 sm:ml-auto items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-slate-400 h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                        View All
                    </Link>
                </div>
                <CarouselSliderIntern />
            </div>

            {/* Mentors Section */}
            <div className='mt-10 space-y-4'>
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-0'>
                    <div>
                        <h1 className='text-2xl md:text-3xl'>Top Mentors</h1>
                        <p className='p-1 text-slate-400 hover:text-slate-700 transition-all duration-100'>
                            In search of excellence? Explore the highest-rated mentors as recognized by the learner community.
                        </p>
                    </div>
                    <Link href={'/courses'} className='flex gap-2 underline text-slate-400 hover:text-slate-700 transition-all duration-100 sm:ml-auto items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-slate-400 h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                        View All
                    </Link>
                </div>
                <CarouselSliderMentor />
            </div>

            {/* Competitions Section */}
            <div className='mt-10 space-y-4'>
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-0'>
                    <div>
                        <h1 className='text-2xl md:text-3xl'>Competitions</h1>
                        <p className='p-1 text-slate-400 hover:text-slate-700 transition-all duration-100'>
                            Explore the Competitions that are creating a buzz among your peers!
                        </p>
                    </div>
                    <Link href={'/courses'} className='flex gap-2 underline text-slate-400 hover:text-slate-700 transition-all duration-100 sm:ml-auto items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-slate-400 h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                        View All
                    </Link>
                </div>
                <CarouselSliderCompetition />
            </div>

            {/* Numbers Section */}
            <div className='mt-10 space-y-6 flex flex-col items-center'>
                <h1 className='flex justify-center text-2xl md:text-3xl text-slate-600'>Our Numbers</h1>
                <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 md:gap-4'>
                    <NumbersCard number={'200'} abb={'K+'} text={'Active Users'}/>
                    <NumbersCard number={'2'} abb={'K+'} text={'Opportunities'}/>
                    <NumbersCard number={'20'} abb={'K+'} text={'Assesments'}/>
                    <NumbersCard number={'150'} abb={'+'} text={'Brands'}/>
                    <NumbersCard number={'10'} abb={'+'} text={'Partners'}/>
                    <NumbersCard number={'120'} abb={'+'} text={'Countries'}/>
                </div>
            </div>
        </div>
    )
}

export default Home