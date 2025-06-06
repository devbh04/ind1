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
const registeredTeams = [
  {
    id: 1,
    teamName: "Tech Wizards",
    teamMembers: "John Doe, Jane Smith, Alex Johnson",
    email: "john.doe@example.com",
    mobile: "9876543210",
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    institute: "IIT Bombay",
    type: "College Student",
    course: "B.Tech",
    specialization: "Computer Science",
    graduationYear: "2025",
    courseDuration: "4 Years",
    country: "India",
  },
  {
    id: 2,
    teamName: "Code Warriors",
    teamMembers: "Sarah Williams, Mike Brown, Emily Davis",
    email: "sarah.williams@example.com",
    mobile: "8765432109",
    firstName: "Sarah",
    lastName: "Williams",
    gender: "Female",
    institute: "NIT Delhi",
    type: "College Student",
    course: "B.Sc",
    specialization: "Data Science",
    graduationYear: "2024",
    courseDuration: "3 Years",
    country: "India",
  },
  // Add more mock data as needed
];

export default function HackathonParticipantsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeams = registeredTeams.filter(
    (team) =>
      team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.teamMembers.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Registered Teams for Hackathon XYZ
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage all teams who have registered for this hackathon
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search teams..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Teams Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[200px]">Team Info</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Representative</TableHead>
                <TableHead>Education</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeams.length > 0 ? (
                filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">
                      <div className="font-semibold">{team.teamName}</div>
                      <div className="text-sm text-gray-500">
                        Members: {team.teamMembers}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{team.email}</span>
                        <span className="text-sm text-gray-500">
                          {team.mobile}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{team.firstName} {team.lastName}</span>
                        <span className="text-sm text-gray-500">
                          {team.gender} • {team.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{team.institute}</span>
                        <span className="text-sm text-gray-500">
                          {team.course} ({team.specialization})
                        </span>
                        <span className="text-sm">
                          Graduation: {team.graduationYear} • {team.courseDuration}
                        </span>
                        <span className="text-sm">
                          Country: {team.country}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end gap-2">
                        <a
                          href={`mailto:${team.email}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          <Button variant="outline" size="sm">
                            Send Email
                          </Button>
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No teams found matching your search.
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