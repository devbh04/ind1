"use client"
import { useState } from 'react';
import Head from 'next/head';
import { Search, Star, Briefcase, GraduationCap, Globe, MessageSquare } from 'lucide-react';
import MentorCard from '@/components/shared/cards/mentorcard';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const MentorList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample mentor data
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Senior AI Researcher",
      organization: "Tech Innovators Inc.",
      experience: "15+ years",
      expertise: ["Machine Learning", "Computer Vision", "Python"],
      rating: 4.9,
      sessions: 245,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Former Google AI researcher with 15+ years experience in machine learning and computer vision. Passionate about mentoring the next generation of AI engineers.",
      availability: "Online",
      languages: ["English", "Spanish"]
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Blockchain Architect",
      organization: "Crypto Foundation",
      experience: "10 years",
      expertise: ["Solidity", "Smart Contracts", "DeFi"],
      rating: 4.8,
      sessions: 180,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Blockchain expert with extensive experience in building decentralized applications. Mentor to multiple successful blockchain startups.",
      availability: "San Francisco, CA",
      languages: ["English", "Mandarin"]
    },
    {
      id: 3,
      name: "Priya Patel",
      title: "Sustainability Consultant",
      organization: "Green Earth Initiative",
      experience: "12 years",
      expertise: ["Renewable Energy", "Climate Policy", "ESG"],
      rating: 4.7,
      sessions: 150,
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      bio: "Sustainability leader with experience advising governments and corporations on climate change solutions. Passionate about mentoring young environmentalists.",
      availability: "Hybrid (New York/Online)",
      languages: ["English", "Hindi", "French"]
    },
    {
      id: 4,
      name: "David Kim",
      title: "Product Management Director",
      organization: "Unstop",
      experience: "8 years",
      expertise: ["Product Strategy", "UX Design", "Agile"],
      rating: 4.8,
      sessions: 120,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      bio: "Product leader with experience at multiple tech unicorns. Specializes in helping early-career professionals transition into product roles.",
      availability: "Online",
      languages: ["English", "Korean"]
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      title: "Startup Founder",
      organization: "Venture Labs",
      experience: "7 years",
      expertise: ["Entrepreneurship", "Fundraising", "Growth"],
      rating: 4.9,
      sessions: 95,
      avatar: "https://randomuser.me/api/portraits/women/85.jpg",
      bio: "Serial entrepreneur with two successful exits. Dedicated to helping first-time founders navigate the startup journey.",
      availability: "Miami, FL",
      languages: ["English", "Spanish"]
    },
    {
      id: 6,
      name: "James Wilson",
      title: "Data Science Lead",
      organization: "Data Insights Co.",
      experience: "11 years",
      expertise: ["Data Analysis", "SQL", "Business Intelligence"],
      rating: 4.7,
      sessions: 210,
      avatar: "https://randomuser.me/api/portraits/men/91.jpg",
      bio: "Data science leader with expertise in transforming raw data into business value. Mentors aspiring data professionals.",
      availability: "Online",
      languages: ["English"]
    }
  ];

  // Filter mentors based on search query
  const filteredMentors = mentors.filter(mentor => {
    return mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           mentor.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
           mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Mentors | Find Your Perfect Mentor</title>
        <meta name="description" content="Browse and connect with expert mentors" />
      </Head>

      {/* Hero Section */}
      <div className="text-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-3 w-full lg:w-3/5">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <h1 className="text-amber-600 text-3xl sm:text-4xl md:text-5xl font-extrabold">
                Mentors
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
                To Guide You
              </h1>
            </div>
            <p className="p-2 text-black/80 w-full lg:w-3/4">
              Connect with industry experts who can help you grow your skills and advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={'/mentorship/mentor-registeration'} className="bg-amber-600 flex items-center h-10 sm:text-xl text-white border border-white hover:bg-white hover:border-amber-600 hover:text-amber-600 rounded-full p-4 sm:p-6 transition-all duration-100">
                + Become Mentor
              </Link>
            </div>
          </div>
          <img
            src="/mentor.webp" // Update with your actual image path
            alt="Mentor illustration"
            className="w-full lg:w-2/5 mt-6 lg:mt-0"
          />
        </div>

        {/* Search Bar - Moved below the hero section */}
        <div className="max-w-2xl mx-auto relative mt-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-black" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-full leading-5 bg-gray-700/20 placeholder-black focus:outline-none focus:ring-2 focus:ring-black focus:border-white sm:text-sm"
            placeholder="Search mentors by name, skills, or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Rest of the content remains the same */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-lg font-medium text-gray-900">
            {filteredMentors.length} {filteredMentors.length === 1 ? 'Mentor' : 'Mentors'} Available
          </h2>
        </div>

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>

        {/* Empty State */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No mentors found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search query to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorList;