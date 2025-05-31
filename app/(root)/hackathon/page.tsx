"use client"
import { useState } from 'react';
import Head from 'next/head';
import { Search } from 'lucide-react';
import HackathonCard from '@/components/shared/cards/hackathoncard';

const HackathonList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample hackathon data
  const hackathons = [
    {
      id: 1,
      title: "Global AI Hackathon 2023",
      type: "AI/ML",
      organizer: "Tech Innovators Inc.",
      prizePool: "$50,000",
      startDate: "2023-11-15",
      endDate: "2023-11-17",
      registrationDeadline: "2023-11-10",
      mode: "online",
      logo: "https://via.placeholder.com/150",
      skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision"],
      participants: 1200,
      description: "Join the premier AI hackathon to solve real-world problems using machine learning and artificial intelligence."
    },
    {
      id: 2,
      title: "Blockchain Builders Challenge",
      type: "Blockchain",
      organizer: "Crypto Foundation",
      prizePool: "$30,000",
      startDate: "2023-12-05",
      endDate: "2023-12-07",
      registrationDeadline: "2023-11-28",
      mode: "offline",
      location: "San Francisco, CA",
      logo: "https://via.placeholder.com/150",
      skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3"],
      participants: 850,
      description: "Build decentralized applications that push the boundaries of blockchain technology."
    },
    {
      id: 3,
      title: "Climate Change Hackathon",
      type: "Sustainability",
      organizer: "Green Earth Initiative",
      prizePool: "$25,000",
      startDate: "2023-10-20",
      endDate: "2023-10-22",
      registrationDeadline: "2023-10-15",
      mode: "hybrid",
      location: "New York, NY (with online participation)",
      logo: "https://via.placeholder.com/150",
      skills: ["Data Analysis", "IoT", "Renewable Energy", "GIS"],
      participants: 1500,
      description: "Develop innovative solutions to combat climate change and promote sustainability."
    }
  ];

  // Filter hackathons based on search query
  const filteredHackathons = hackathons.filter(hackathon => {
    return hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           hackathon.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
           hackathon.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
           hackathon.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Hackathons | Find Your Next Challenge</title>
        <meta name="description" content="Browse and join exciting hackathons" />
      </Head>

      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Find Your Next Hackathon Challenge</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Compete, learn, and build amazing projects with developers from around the world.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-md leading-5 bg-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:border-white sm:text-sm"
              placeholder="Search hackathons by name, skills, or organizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            {filteredHackathons.length} {filteredHackathons.length === 1 ? 'Hackathon' : 'Hackathons'} Available
          </h2>
        </div>

        {/* Hackathon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>

        {/* Empty State */}
        {filteredHackathons.length === 0 && (
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
            <h3 className="mt-2 text-lg font-medium text-gray-900">No hackathons found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search query to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonList;