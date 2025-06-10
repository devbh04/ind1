"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Search } from 'lucide-react';
import MentorCard from '@/components/shared/cards/mentorcard';
import Link from 'next/link';
import { BASE_URL } from '@/utils/constants';

const MentorList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/mentors`); // Change this if needed
        const data = await res.json();
        setMentors(data);
      } catch (err) {
        console.error("Failed to fetch mentors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

const filteredMentors = mentors.filter((mentor) => {
  const name = mentor.firstName + ' ' + mentor.lastName;
  return (
    name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (mentor.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    (mentor.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    (mentor.expertise?.some(
      (skill) => skill?.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? false)
  );
});


  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Mentors | Find Your Perfect Mentor</title>
        <meta name="description" content="Browse and connect with expert mentors" />
      </Head>

      {/* Hero */}
      <div className="text-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-3 w-full lg:w-3/5">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <h1 className="text-amber-600 text-3xl sm:text-4xl md:text-5xl font-extrabold">Mentors</h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">To Guide You</h1>
            </div>
            <p className="p-2 text-black/80 w-full lg:w-3/4">
              Connect with industry experts who can help you grow your skills and advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/mentorship/mentor-registeration" className="bg-amber-600 flex items-center h-10 sm:text-xl text-white border border-white hover:bg-white hover:border-amber-600 hover:text-amber-600 rounded-full p-4 sm:p-6 transition-all duration-100">
                + Become Mentor
              </Link>
            </div>
          </div>
          <img src="/mentor.webp" alt="Mentor illustration" className="w-full lg:w-2/5 mt-6 lg:mt-0" />
        </div>

        {/* Search Bar */}
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-lg font-medium text-gray-900">
            {loading ? "Loading..." : `${filteredMentors.length} ${filteredMentors.length === 1 ? 'Mentor' : 'Mentors'} Available`}
          </h2>
        </div>

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && filteredMentors.map(mentor => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>

        {/* Empty State */}
        {!loading && filteredMentors.length === 0 && (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No mentors found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search query to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorList;
