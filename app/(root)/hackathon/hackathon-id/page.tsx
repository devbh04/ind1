
'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarDays, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HackathonOpp() {
  const router = useRouter()

  return (
    <div className='mx-4 md:mx-16 lg:mx-48 py-8'>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='w-full lg:w-2/3'>
          <div className='bg-custom-gradient text-black rounded-xl p-6 mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold mb-2'>Code π-racy</h1>
            <p className='text-slate-600 mb-1'>Delhi Technological University (DTU), New Delhi</p>
            <p className='text-slate-600 mb-4'>Offline Event</p>
            
            <div className='flex items-center gap-2 text-slate-600 mb-1'>
              <CalendarDays size={16} />
              <span>Starts on Apr 12, 2025, 12:00 AM IST</span>
            </div>
            <div className='flex items-center gap-2 text-slate-600 mb-6'>
              <CalendarDays size={16} />
              <span>Ends on Apr 21, 2025, 12:00 AM IST</span>
            </div>
            
            <div className='flex gap-4'>
              <Button 
                className='bg-blue-600 hover:bg-blue-700 transition-all duration-100'
                onClick={() => router.push('/register')}
              >
                Register Now
              </Button>
              <Button variant="outline" className='border-blue-600 text-blue-600 hover:bg-blue-50'>
                Save for Later
              </Button>
            </div>
          </div>

          <div className='mb-8'>
            <h2 className='text-2xl font-bold mb-4'>Stages and Timeline</h2>
            <Card className='mb-4 border border-slate-200 hover:border-blue-300 transition-all duration-100'>
              <CardContent className='p-4'>
                <p className='font-medium text-lg'>Submission Round (via Unstop), Offline at DTU</p>
                <p className='text-slate-600'>Starts: Apr 12, 2025 | Ends: Apr 20, 2025</p>
              </CardContent>
            </Card>
            <Card className='border border-slate-200 hover:border-blue-300 transition-all duration-100'>
              <CardContent className='p-4'>
                <p className='font-medium text-lg'>Finals Round at Microsoft Office, Gurgaon</p>
                <p className='text-slate-600'>Date: Apr 21, 2025</p>
              </CardContent>
            </Card>
          </div>

          <div className='mb-8'>
            <h2 className='text-2xl font-bold mb-4'>All that you need to know</h2>
            <ul className='list-disc ml-6 text-slate-700 space-y-2'>
              <li>A team of a maximum of 3 members is allowed to participate.</li>
              <li>Make sure to register with official emails only.</li>
              <li>There will be a submission round.</li>
              <li>Top teams from submission round will move to finals.</li>
              <li>Finals round will be held offline at Microsoft Office, Gurgaon.</li>
              <li>Only shortlisted teams will be allowed for participation in the final round.</li>
              <li>Bring your college ID cards at the time of finals.</li>
            </ul>
          </div>
        </div>

        <div className='w-full lg:w-1/3'>
          <div className='bg-slate-50 rounded-lg p-4 mb-8 shadow-sm space-y-4'>
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

          <div className='bg-slate-100 rounded-xl p-6 mb-8'>
            <h2 className='text-2xl font-bold mb-4'>Rewards and Prizes</h2>
            <ul className='list-disc ml-6 text-slate-700 space-y-2'>
              <li>Winner: Gift Hampers + Internship Opportunity</li>
              <li>First Runner Up: Gift Hampers</li>
              <li>Second Runner Up: Gift Hampers</li>
              <li>All Finalists: Exclusive Swag Kits</li>
            </ul>
          </div>

          <div className='bg-slate-100 rounded-xl p-6'>
            <h2 className='text-2xl font-bold mb-4'>Contact the Organisers</h2>
            <div className='space-y-3'>
              <p className='text-slate-700 flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                team@codepiracy.in
              </p>
              <p className='text-slate-700 flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                +91 9876543210
              </p>
              <p className='text-slate-700 flex items-start gap-2'>
                <MapPin size={16} className="mt-1" />
                Delhi Technological University, Shahbad Daulatpur, Main Bawana Road, Delhi - 110042
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}