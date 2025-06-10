"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Search } from "lucide-react";
import HackathonCard from "@/components/shared/cards/hackathoncard";
import Link from "next/link";
import { useUserStore } from "@/store/signUpStore";

const HackathonList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useUserStore();

  const [hackathons, setHackathons] = useState([]);
  const [hloading, setHLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/hackathons");
        const data = await response.json();
        setHackathons(data);
      } catch (error) {
        console.error("Failed to fetch hackathons:", error);
      } finally {
        setHLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  // Filter hackathons based on search query
  const filteredHackathons = hackathons.filter((hackathon) => {
    // Skip if hackathon is null/undefined or if search query is empty
    if (!hackathon || !searchQuery) return true;

    // Safely access properties with optional chaining and provide fallbacks
    const title = hackathon.hackathonTitle?.toLowerCase() || "";
    const organizer = hackathon.organization?.toLowerCase() || "";
    const type = hackathon.hackathonType?.toLowerCase() || "";
    const skills = hackathon.technicalSkills?.map((skill) => skill?.toLowerCase()) || [];

    return (
      title.includes(searchQuery.toLowerCase()) ||
      organizer.includes(searchQuery.toLowerCase()) ||
      type.includes(searchQuery.toLowerCase()) ||
      skills.some((skill) => skill.includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Hackathons | Find Your Next Challenge</title>
        <meta
          name="description"
          content="Browse and join exciting hackathons"
        />
      </Head>

      {/* Hero Section */}
      <div className="text-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-3 w-full lg:w-3/5">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <h1 className="text-green-800 text-3xl sm:text-4xl md:text-5xl font-extrabold">
                Hackathons
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
                To Compete
              </h1>
            </div>
            <p className="p-2 text-black/80 w-full lg:w-3/4">
              Compete in exciting challenges, showcase your skills, win prizes,
              and get recognized by top companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
            {(currentUser.userType === "recruiter" || currentUser.userType === "admin") &&
              <Link
                href={"/host-opportunity"}
                className="bg-green-800 flex items-center h-10 sm:text-xl text-white border border-white hover:bg-white hover:border-green-800 hover:text-green-800 rounded-full p-4 sm:p-6 transition-all duration-100"
              >
                + Host Hackathons
              </Link>
  }
            </div>
          </div>
          <img
            src="/hack.webp" // Update with your actual image path
            alt="Hackathon illustration"
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
            placeholder="Search hackathons by name, skills, or organizer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Rest of the content remains the same */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            {filteredHackathons.length}{" "}
            {filteredHackathons.length === 1 ? "Hackathon" : "Hackathons"}{" "}
            Available
          </h2>
        </div>

        {/* Hackathon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => (
            <HackathonCard key={hackathon._id} hackathon={hackathon} />
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
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No hackathons found
            </h3>
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
