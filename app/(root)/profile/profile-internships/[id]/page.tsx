"use client";
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
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
import { BASE_URL } from '@/utils/constants';

export default function InternshipCandidatesPage() {
  const { id } = useParams(); // Get internship ID from URL
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/applications/internship/${id}/applications`
        );
        setCandidates(response.data.data);
        console.log('Fetched applications:', response.data.data);
        console.log('Fetched candidates:', candidates);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);
  

  const filteredCandidates = candidates.filter((candidate) => {
  const firstName = candidate.firstName;
  const lastName = candidate.lastName;
  const email = candidate.email;
  const institute = candidate.institute;
  const course = candidate.course;

  return (
    firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.toLowerCase().includes(searchTerm.toLowerCase())
  );
});


  if (loading) return <div>Loading applications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Registered Candidates for Internship
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {filteredCandidates.length} candidates found
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
                  <TableRow key={candidate._id}>
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
                          href={`mailto:${candidate.applicant.email}`}
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
      </div>
    </div>
  );
}
