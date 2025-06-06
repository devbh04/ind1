"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Search } from "lucide-react";
import InternshipCard from "@/components/shared/cards/internshipcard";
import Link from "next/link";

const internships = [
  {
    id: "1",
    companyName: "Tech Innovators Inc.",
    title: "Software Development Intern",
    category: "Software Development",
    workplaceType: "remote",
    duration: "3 Months",
    startDate: "2023-11-15",
    stipend: {
      min: 1000,
      max: 2000,
    },
    skills: ["JavaScript", "React", "Node.js"],
    benefits: {
      jobOffer: true,
      certificate: true,
      lor: false,
      insurance: false,
      stipend: true,
      equipment: false,
    },
  },
  {
    id: "2",
    companyName: "Green Earth Initiative",
    title: "Sustainability Intern",
    category: "Sustainability",
    workplaceType: "hybrid",
    location: "New York, NY",
    duration: "6 Months",
    startDate: "2023-12-01",
    stipend: {
      min: 1500,
      max: 2500,
    },
    skills: ["Data Analysis", "Research", "Communication"],
    benefits: {
      jobOffer: false,
      certificate: true,
      lor: true,
      insurance: true,
      stipend: true,
      equipment: true,
    },
  },
  {
    id: "3",
    companyName: "Crypto Foundation",
    title: "Blockchain Developer Intern",
    category: "Blockchain",
    workplaceType: "on-site",
    location: "San Francisco, CA",
    duration: "2 Months",
    startDate: "2024-01-10",
    stipend: {
      min: 2000,
      max: 3000,
    },
    skills: ["Solidity", "Ethereum", "Smart Contracts"],
    benefits: {
      jobOffer: true,
      certificate: true,
      lor: true,
      insurance: false,
      stipend: true,
      equipment: false,
    },
  },
  {
    id: "4",
    companyName: "MedTech Alliance",
    title: "Healthcare Data Intern",
    category: "Healthcare",
    workplaceType: "remote",
    duration: "Flexible",
    startDate: "2023-11-20",
    stipend: {
      min: 1200,
      max: 1800,
    },
    skills: ["Python", "Data Science", "Healthcare"],
    benefits: {
      jobOffer: false,
      certificate: true,
      lor: false,
      insurance: true,
      stipend: true,
      equipment: true,
    },
  },
  {
    id: "5",
    companyName: "Digital Marketing Pro",
    title: "Social Media Intern",
    category: "Marketing",
    workplaceType: "remote",
    duration: "4 Months",
    startDate: "2023-12-15",
    stipend: {
      min: 800,
      max: 1200,
    },
    skills: ["Social Media", "Content Creation", "SEO"],
    benefits: {
      jobOffer: false,
      certificate: true,
      lor: true,
      insurance: false,
      stipend: true,
      equipment: false,
    },
  },
];

const FindInternship = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInternships = internships.filter((internship) => {
    return (
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.workplaceType
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      internship.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by job title or company..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {filteredInternships.length} Internships Found
        </h2>

        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => (
              <div key={internship.id} className="border p-4 rounded-lg">
                <InternshipCard key={internship.id} internship={internship} />
                <div className="flex mt-4 py-2 px-4 space-x-1">
                  <Link
                    href={`/profile/internships/internship-id`}
                    className="w-full border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-center flex items-center justify-center"
                  >
                    <div className="flex items-center justify-center">
                      View Registered candidates{" "}
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </div>
                  </Link>
                  <Button>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No internships found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearchTerm("")}
            >
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindInternship;
