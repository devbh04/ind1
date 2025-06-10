"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { ArrowRightIcon, Search } from "lucide-react";
import HackathonCard from "@/components/shared/cards/hackathoncard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useUserStore } from "@/store/signUpStore";

const HackathonList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const { currentUser } = useUserStore();
  const [hackathons, setHackathons] = useState([]);

  // Add these useEffect hooks to fetch hackathons data
  useEffect(() => {
    const fetchPostedHackathons = async () => {
      if (!currentUser?._id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/api/v1/hackathons/${currentUser._id}/all`
        );
        setHackathons(response.data);
        console.log("Posted Hackathons:", response.data);
      } catch (error) {
        console.error("Error fetching posted hackathons:", error);
        toast.error("Failed to load posted hackathons");
      } finally {
        setLoading(false);
      }
    };

    fetchPostedHackathons();
  }, [currentUser]);

  const filteredHackathons = hackathons.filter((hackathon) => {
    const query = searchQuery.toLowerCase();
    return (
      (hackathon.hackathonTitle &&
        hackathon.hackathonTitle.toLowerCase().includes(query)) ||
      (hackathon.organization &&
        hackathon.organization.toLowerCase().includes(query)) ||
      (hackathon.hackathonType &&
        hackathon.hackathonType.toLowerCase().includes(query)) ||
      hackathon.technicalSkills?.some(
        (skill) => skill && skill.toLowerCase().includes(query)
      )
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

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto relative mt-12 px-4">
        <div className="absolute inset-y-0 left-4 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-black" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-full leading-5 bg-gray-700/20 placeholder-black focus:outline-none focus:ring-2 focus:ring-black sm:text-sm"
          placeholder="Search hackathons by name, skills, or organizer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Hackathon Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center text-gray-500">Loading hackathons...</div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                {filteredHackathons.length}{" "}
                {filteredHackathons.length === 1 ? "Hackathon" : "Hackathons"}{" "}
                Available
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHackathons.map((hackathon) => (
                <div key={hackathon._id} className="border p-4 rounded-lg">
                  <HackathonCard hackathon={hackathon} />
                  <div className="flex mt-4 py-2 px-4 space-x-1">
                    <Link
                      href={`/profile/profile-hackathons/${hackathon._id}`}
                      className="w-full border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-center flex items-center justify-center"
                    >
                      <div className="flex items-center justify-center">
                        View Registered Candidates{" "}
                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                      </div>
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        if (
                          !window.confirm(
                            "Are you sure you want to delete this hackathon?"
                          )
                        )
                          return;

                        try {
                          await axios.delete(
                            `http://localhost:3001/api/v1/hackathons/delete/${hackathon._id}`
                          );
                          toast.success("Hackathon deleted");

                          // Optionally remove it from UI without re-fetching
                          setHackathons((prev) =>
                            prev.filter((h) => h._id !== hackathon._id)
                          );
                        } catch (error) {
                          console.error("Delete failed:", error);
                          toast.error("Failed to delete hackathon");
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredHackathons.length === 0 && (
              <div className="text-center py-16">
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No hackathons found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search query to find what you're looking
                  for.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HackathonList;
