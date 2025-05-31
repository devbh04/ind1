"use client"
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GlobeAltIcon, LockClosedIcon, QuestionMarkCircleIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';

const HostHackathon = () => {
  const [logo, setLogo] = useState('data:image/png;base64,iVBOR');
  const [visibilityOption, setVisibilityOption] = useState('public');
  const [eventMode, setEventMode] = useState('online');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [registrationDeadline, setRegistrationDeadline] = useState<Date>();

  return (
    <div className="min-h-screen">
      <Head>
        <title>Host a Hackathon | Unstop</title>
        <meta name="description" content="Create a new hackathon on Unstop" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl font-semibold text-green-800 mb-8">Hackathon Details</h1>
          
          {/* Hackathon logo */}
          <div className="mb-10">
            <label className="block mb-2 font-medium">
              Hackathon Logo <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center">
              <img 
                src={logo} 
                alt="Hackathon Logo" 
                className="w-32 h-32 object-contain mb-4"
              />
              <button 
                className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() => {}}
              >
                Upload Logo
              </button>
            </div>
          </div>
          
          {/* Date Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {/* Start Date */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Start Date*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-10 sm:h-11",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div>
              <Label className="text-sm font-medium mb-2 block">End Date*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-10 sm:h-11",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    fromDate={startDate} // Ensures end date can't be before start date
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Registration Deadline */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Registration Deadline*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-10 sm:h-11",
                      !registrationDeadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {registrationDeadline ? format(registrationDeadline, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={registrationDeadline}
                    onSelect={setRegistrationDeadline}
                    initialFocus
                    toDate={startDate} // Ensures registration deadline is before start date
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mb-10">
            <h3 className="text-sm font-medium">Contact Information*</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Contact Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    type="email" 
                    placeholder="contact@company.com" 
                    className="h-10 sm:h-11 pl-10" 
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Contact Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    type="tel" 
                    placeholder="+1 (555) 123-4567" 
                    className="h-10 sm:h-11 pl-10" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rest of the existing form fields... */}
          {/* Hackathon Type */}
          <div className="mb-10">
            <label className="block mb-2 font-medium">
              Hackathon Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select 
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none appearance-none pl-3 pr-10 py-4"
              >
                <option value="" disabled>Select Hackathon type</option>
                <option value="allcategories">All Categories</option>
                <option value="coding">Coding Hackathon</option>
                <option value="innovation">Innovation Challenge</option>
                <option value="ai_ml">AI/ML Hackathon</option>
                <option value="blockchain">Blockchain Hackathon</option>
                <option value="cybersecurity">Cybersecurity Hackathon</option>
                <option value="data_science">Data Science Hackathon</option>
                <option value="iot">IoT Hackathon</option>
                <option value="game_dev">Game Development Hackathon</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Hackathon Title */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="font-medium">Hackathon Title<span className="text-red-500">*</span></label>
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 ml-1" />
            </div>
            <input 
              type="text" 
              placeholder="Enter Hackathon Title"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 focus:outline-none"
            />
            <div className="text-right text-sm text-gray-500 mt-1">(max 190 characters)</div>
          </div>

          {/* Hackathon Prize pool */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="font-medium">Hackathon Prize Pool<span className="text-red-500">*</span></label>
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 ml-1" />
            </div>
            <input 
              type="number" 
              placeholder="Enter Prize Pool Amount"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 focus:outline-none"
            />
          </div>
          
          {/* Organization */}
          <div className="mb-10">
            <div className="flex items-center mb-2">
              <label className="font-medium">Organizer<span className="text-red-500">*</span></label>
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 ml-1" />
            </div>
            <input 
              type="text" 
              placeholder="Enter Organization Name"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 focus:outline-none"
              defaultValue="Vishwakarma Institute Of Information Technology (VIIT), Pune, Maharashtra"
            />
          </div>
          
          {/* Website URL */}
          <div className="mb-10">
            <label className="block mb-1 font-medium">
              Website URL
            </label>
            <p className="text-sm text-green-900 mb-2">The URL can be your organization's website or hackathon website.</p>
            <div className="flex rounded-md shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500 p-3">
              <span className="text-green-600">
                https://
              </span>
              <input
                type="text"
                className="flex-1 min-w-0 block w-full rounded-none rounded-r-md focus:outline-none"
              />
            </div>
          </div>
          
          {/* Mode of Event */}
          <div className="mb-10">
            <div className="flex items-center mb-2">
              <label className="font-medium">Mode of Hackathon<span className="text-red-500">*</span></label>
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 ml-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className={`border rounded-lg p-8 flex items-start cursor-pointer ${eventMode === 'online' ? 'border-green-600 bg-green-50' : 'border-gray-300'}`}
                onClick={() => setEventMode('online')}
              >
                <GlobeAltIcon className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Online Hackathon</h3>
                </div>
              </div>
              <div 
                className={`border rounded-lg p-8 flex items-start cursor-pointer ${eventMode === 'offline' ? 'border-green-600 bg-green-50' : 'border-gray-300'}`}
                onClick={() => setEventMode('offline')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="font-medium">In-Person Hackathon</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Address - Only shown if offline */}
          {eventMode === 'offline' && (
            <div className='mb-10'>
              <div className='grid grid-cols-2 gap-3'>
                  <div className='flex flex-col'>
                      <label className='text-gray-500'>Country<span className='text-red-400'>*</span></label>
                      <input type="text"
                       className='border border-gray-200 p-3 rounded-md focus:border-green-200 focus:outline-none'
                       />
                  </div>
                  <div className='flex flex-col'>
                      <label className='text-gray-500'>State<span className='text-red-400'>*</span></label>
                      <input type="text"
                       className='border border-gray-200 p-3 rounded-md focus:border-green-200 focus:outline-none'
                       />
                  </div>
                  <div className='flex flex-col'>
                      <label className='text-gray-500'>City<span className='text-red-400'>*</span></label>
                      <input type="text"
                       className='border border-gray-200 p-3 rounded-md focus:border-green-200 focus:outline-none'
                       />
                  </div>
                  <div className='flex flex-col'>
                      <label className='text-gray-500'>Venue<span className='text-red-400'>*</span></label>
                      <input type="text"
                       className='border border-gray-200 p-3 rounded-md focus:border-green-200 focus:outline-none'
                       />
                  </div>
              </div>
            </div>
          )}
          
          {/* Skills to be Assessed */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="font-medium">Technical Skills Required</label>
              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-md">Beta</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">List required technical skills to attract participants with matching abilities.</p>
            <input
              type="text"
              placeholder="Search Technical Skills (e.g., React, Python, Solidity)"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 focus:outline-none"
            />
          </div>
          
          {/* Hackathon Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <label className="font-medium">Hackathon Details<span className="text-red-500">*</span></label>
              </div>
              <span className="text-sm text-green-600">(Minimum Word Limit: 500)</span>
            </div>
            
            <textarea
                className="w-full p-3 h-80 border border-transparent rounded-md shadow-sm focus:outline-none focus:border-green-500 resize-none"
                placeholder={`Provide comprehensive details about your hackathon:

Theme & Focus:
* Describe the main theme of the hackathon
* Mention any specific problem statements or challenges
* List any preferred technologies or platforms

Rules & Guidelines:
* Team size requirements (min/max)
* Eligibility criteria (age, education, etc.)
* Code of conduct
* Intellectual property rights
* Submission requirements

Schedule & Structure:
* Timeline of the hackathon
* Judging criteria
* Prize structure
* Mentorship availability

Technical Requirements:
* Required/preferred tech stack
* APIs or datasets provided
* Development environment details
* Submission format guidelines`}
                ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between mt-6 mb-4">
            <button className="px-6 w-40 py-2 bg-green-600 text-white rounded-md">
                Submit Hackathon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostHackathon;