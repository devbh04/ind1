"use client"
import { GlobeAltIcon, LockClosedIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button'
import React from 'react'

const HackathonOpp = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-4 mx-4 sm:mx-8 md:mx-16 lg:mx-16 xl:mx-48'>
      {/* Left Side */}
      <div className='w-full lg:w-2/3 space-y-4'>
        {/* Hackathon Info Card */}
        <div className='bg-slate-50 rounded-lg p-4 shadow-sm'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-shrink-0'>
              <img 
                src="/unstop-logo.png" 
                alt="Hackathon Logo" 
                className='p-2 h-20 w-20 sm:h-24 sm:w-24 border-4 border-green-500 rounded-lg object-contain'
              />
            </div>
            <div>
              <h1 className='text-2xl sm:text-3xl md:text-4xl mt-0 sm:mt-4 mb-2'>CodeFest 2025</h1>
              <p className='text-slate-600'>48-hour coding marathon to build innovative solutions for real-world problems</p>
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2'>
                <div className='flex gap-2 items-center text-slate-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                  </svg>
                  <p className='text-sm sm:text-base'>Tech Innovators Association</p>
                </div>
                <div className='flex gap-2 items-center text-slate-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                  </svg>
                  <p className='font-extrabold text-slate-600 text-sm sm:text-base'>Event Dates:</p>
                  <p className='text-sm sm:text-base'>2025-07-15 to 2025-07-17</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className='bg-slate-50 rounded-lg p-4 shadow-sm space-y-4'>
          <div className='flex'>
            <div className='w-1 bg-green-700 rounded-r-xl'></div>
            <h1 className='text-xl sm:text-2xl pl-2'>Hackathon Details</h1>
          </div>
          <div className='pl-4'>
            <h2 className='text-slate-700 text-lg sm:text-xl'>48-Hour Innovation Challenge</h2>
            
            <div className='mt-4'>
              <p className='font-medium'>Theme & Focus:</p>
              <ul className='text-sm sm:text-base pl-4 text-slate-600 list-disc space-y-1 mt-2'>
                <li>Building solutions for sustainable development goals</li>
                <li>Focus areas: Education, Healthcare, and Environment</li>
                <li>Preferred technologies: AI/ML, Blockchain, IoT</li>
              </ul>
            </div>
            
            <div className='mt-4'>
              <p className='font-medium'>Event Mode:</p>
              <div className="flex items-center mt-2">
                <GlobeAltIcon className="h-5 w-5 text-green-600 mr-2" />
                <span className='text-slate-600'>Online Hackathon</span>
              </div>
            </div>
            
            <div className='mt-4'>
              <p className='font-medium'>Rules & Guidelines:</p>
              <ul className='text-sm sm:text-base pl-4 text-slate-600 list-disc space-y-1 mt-2'>
                <li>Team size: 2-4 members</li>
                <li>Open to all students and professionals</li>
                <li>All code must be written during the event</li>
                <li>Submissions must include demo video and GitHub repo</li>
              </ul>
            </div>
            
            <div className='mt-4'>
              <p className='font-medium'>Schedule:</p>
              <ul className='text-sm sm:text-base pl-4 text-slate-600 list-disc space-y-1 mt-2'>
                <li>Day 1: Opening ceremony & team formation</li>
                <li>Day 2: Coding & mentorship sessions</li>
                <li>Day 3: Submission deadline & judging</li>
              </ul>
            </div>
            
            <div className='mt-4'>
              <p className='font-medium'>Prizes:</p>
              <ul className='text-sm sm:text-base pl-4 text-slate-600 list-disc space-y-1 mt-2'>
                <li>1st Prize: ₹50,000 + Incubation Support</li>
                <li>2nd Prize: ₹30,000</li>
                <li>3rd Prize: ₹20,000</li>
                <li>Special category prizes for best AI/ML and Blockchain solutions</li>
              </ul>
            </div>
            
            <div className='mt-4'>
              <p className='font-medium'>Technical Skills Required:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Solidity</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Machine Learning</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Blockchain</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className='bg-slate-50 rounded-lg p-4 shadow-sm space-y-4'>
          <div className='flex'>
            <div className='w-1 bg-green-700 rounded-r-xl'></div>
            <h1 className='text-xl sm:text-2xl pl-2'>Contact Information</h1>
          </div>
          <div className='pl-4'>
            <p className='text-slate-800 text-lg'>Hackathon Coordinator</p>
            <p className='text-slate-600'>hackathon@techinnovators.org</p>
            <p className='text-slate-600'>+91 98765 43210</p>
            <div className="mt-2">
              <a href="https://techinnovators.org/hackathon" className="text-green-600 hover:underline">Official Website</a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='w-full lg:w-1/3'>
        <div className='bg-slate-50 rounded-lg p-4 shadow-sm space-y-4'>
          {/* Application Status */}
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
            <div>
              <p className='font-medium'>Your Application Status</p>
              <p className='text-slate-500 text-sm'>Not Registered Yet</p>
            </div>
            <button className='bg-green-600 rounded-lg w-fit sm:w-auto'>
              <p className='p-2 text-white text-sm'>Eligible</p>
            </button>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-between gap-2'>
            <Button className='flex-1 bg-white text-green-600 border border-green-600 hover:bg-green-50 h-12'>
              Save for Later
            </Button>
            <Button className='flex-1 bg-green-600 hover:bg-green-500 h-12'>
              Register Now
            </Button>
          </div>

          <div className='border border-slate-300'></div>

          {/* Stats */}
          <div className='space-y-4'>
            <div className='flex gap-4'>
              <div className='bg-slate-200 rounded-lg p-3 items-center flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <div className='flex flex-col justify-center'>
                <p className='text-slate-700 text-sm sm:text-base'>Participants</p>
                <p className='text-slate-600 text-sm sm:text-base'>1,245</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='bg-slate-200 rounded-lg p-3 items-center flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <div className='flex flex-col justify-center'>
                <p className='text-slate-700 text-sm sm:text-base'>Prize Pool</p>
                <p className='text-slate-600 text-sm sm:text-base'>₹1,50,000</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='bg-slate-200 rounded-lg p-3 items-center flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <div className='flex flex-col justify-center'>
                <p className='text-slate-700 text-sm sm:text-base'>Registration Deadline</p>
                <p className='text-slate-600 text-sm sm:text-base'>2025-07-10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HackathonOpp