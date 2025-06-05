'use client'
import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Menu, Bell, User, Search, X } from 'lucide-react'

const AppBar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [searchFocused, setSearchFocused] = useState(false)
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener('resize', handleResize)
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])
  
  const getSearchBarWidth = () => {
    if (windowWidth >= 1020 && windowWidth <= 1120) {
      return isSearchFocused ? 'w-56' : 'w-52'
    }
    return isSearchFocused ? 'w-96' : 'w-64'
  }

  return (
    <>
      <div className='p-4 bg-white flex justify-between items-center border-b shadow-xs sticky top-0 z-30'>
        {/* Left section: Logo + Search bar */}
        <div className='flex items-center flex-grow space-x-4 lg:space-x-6'>
          {/* Mobile menu button */}
          <button 
            className='lg:hidden'
            onClick={() => {setMobileMenuOpen(true); setSearchFocused(false)}}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href='/' className='flex items-center flex-shrink-0'>
            <p className='text-xl text-green-900'>N</p>
            <img src="/unstop-logo.png" alt="Logo" className='w-16' />
          </Link>

          {/* Search bar (visible only on lg+) */}
          <div className={`hidden lg:flex items-center border border-slate-300 rounded-full px-4 transition-all duration-300 ${getSearchBarWidth()}`}>
            <Search className="h-5 w-5" />
            <Input 
              placeholder='Search Opportunity...' 
              className='border-none shadow-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[0px] w-full'
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right section */}
        <div className='flex items-center space-x-2 lg:space-x-4'>
          {/* Nav links (lg+) */}
          <div className='hidden lg:flex items-center space-x-2'>
            <Link href='/internship' className='text-black hover:bg-slate-50 hover:border border border-white hover:border-slate-200 p-2 rounded-full'>Internships</Link>
            <Link href='/courses' className='text-black hover:bg-slate-50 hover:border border border-white hover:border-slate-200 p-2 rounded-full'>Courses</Link>
            <Link href='/hackathon' className='text-black hover:bg-slate-50 hover:border border border-white hover:border-slate-200 p-2 rounded-full'>Hackathons</Link>
            <Link href='/mentorship' className='text-black hover:bg-slate-50 hover:border border border-white hover:border-slate-200 p-2 rounded-full'>Mentorships</Link>
            <div className='border-solid border-l border-slate-300 h-10'></div>
          </div>

          {/* Icons (always visible) */}
          <Link href={'/profile'}><User className="h-6 w-6 lg:h-8 lg:w-8" /></Link>

          {/* Mobile search icon */}
          <div className='lg:hidden'>
            <Search className="h-5 w-5" onClick={()=>{setSearchFocused(true)}}/>
          </div>
        </div>
      </div>

      {/* Mobile menu and sliding panel */}
      <div className={`fixed inset-0 z-40 lg:hidden pointer-events-none`}>
        {/* Backdrop overlay */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-20 pointer-events-auto' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Slide-in mobile menu */}
        <div className={`
          absolute top-0 left-0 h-full w-64 bg-white shadow-lg z-50 
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          pointer-events-auto
        `}>
          <div className="flex justify-between items-center p-4 border-b">
            <Link href='/' className='flex items-center' onClick={() => setMobileMenuOpen(false)}>
              <p className='text-xl text-green-900'>N</p>
              <img src="/unstop-logo.svg" alt="Logo" className='w-16' />
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            <Link 
              href='/internship' 
              className='text-black hover:bg-slate-50 p-3 rounded-lg'
              onClick={() => setMobileMenuOpen(false)}
            >
              Internships
            </Link>
            <Link 
              href='/courses' 
              className='text-black hover:bg-slate-50 p-3 rounded-lg'
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              href='/hackathon' 
              className='text-black hover:bg-slate-50 p-3 rounded-lg'
              onClick={() => setMobileMenuOpen(false)}
            >
              Hackathons
            </Link>
            <Link 
              href='/mentorship' 
              className='text-black hover:bg-slate-50 p-3 rounded-lg'
              onClick={() => setMobileMenuOpen(false)}
            >
              Mentorships
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile search bar - now positioned below app bar with transparent background */}
      {searchFocused && (
        <div className='fixed top-16 left-0 right-0 z-40 lg:hidden bg-transparent px-4 py-2'>
          <div className='flex items-center w-full bg-white rounded-full shadow-md border border-slate-300'>
            <Input 
              placeholder='Search Opportunity...' 
              className='border-none shadow-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[0px] w-full'
              autoFocus
            />
            <X 
              className='h-6 w-6 mx-2 text-gray-500' 
              onClick={() => setSearchFocused(false)} 
            />
          </div>
        </div>
      )}
    </>
  )
}

export default AppBar