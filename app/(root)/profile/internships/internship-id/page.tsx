"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useState } from "react";

// Mock data - replace with actual API calls
const registeredCandidates = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    mobile: "9876543210",
    gender: "Male",
    institute: "IIT Bombay",
    type: "College Student",
    course: "B.Tech",
    specialization: "Computer Science",
    graduationYear: "2025",
    courseDuration: "4 Years",
    diffAbled: false,
    country: "India",
    resumeLink: "https://example.com/resume/john_doe",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    mobile: "8765432109",
    gender: "Female",
    institute: "NIT Delhi",
    type: "College Student",
    course: "B.Sc",
    specialization: "Data Science",
    graduationYear: "2024",
    courseDuration: "3 Years",
    diffAbled: true,
    country: "India",
    resumeLink: "https://example.com/resume/jane_smith",
  },
  // Add more mock data as needed
];

export default function InternshipCandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidates = registeredCandidates.filter(
    (candidate) =>
      candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Registered Candidates for Internship XYZ
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage all candidates who have applied for this internship
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search candidates..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Candidates Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Education</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium">
                      {candidate.firstName} {candidate.lastName}
                      <div className="text-sm text-gray-500">
                        {candidate.gender} • {candidate.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{candidate.email}</span>
                        <span className="text-sm text-gray-500">
                          {candidate.mobile}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{candidate.institute}</span>
                        <span className="text-sm text-gray-500">
                          {candidate.course} ({candidate.specialization})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>Graduation: {candidate.graduationYear}</span>
                        <span className="text-sm text-gray-500">
                          {candidate.courseDuration} • {candidate.country}
                        </span>
                        <span className="text-sm">
                          Differently Abled: {candidate.diffAbled ? "Yes" : "No"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end gap-2">
                        <a
                          href={`mailto:${candidate.email}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          <Button variant="outline" size="sm">
                            Send Email
                          </Button>
                        </a>
                        <a
                          href={candidate.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          <Button variant="outline" size="sm">
                            View Resume
                          </Button>
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No candidates found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination would go here */}
        <div className="flex justify-end mt-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}