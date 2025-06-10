"use client";
import { useEffect, useMemo } from 'react';
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
import { Search, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from 'sonner';

interface Candidate {
  _id: string;
  username: string;
  email: string;
  mobile: string;
  gender: string;
  userType: string;
  mentorshipCount: number;
}

export default function MentorshipCandidatesPage() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/mentors/${id}/registered-users`
        );
        
        if (response.data.success) {
          setCandidates(response.data.data);
        } else {
          setError(response.data.error || 'Failed to fetch registered users');
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || 
                           err.message || 
                           'Failed to fetch registered users';
        setError(errorMessage);
        toast.error("Error",{
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredUsers();
  }, [id, toast]);
  
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        candidate.username.toLowerCase().includes(searchLower) ||
        candidate.email.toLowerCase().includes(searchLower) ||
        (candidate.mobile && candidate.mobile.includes(searchTerm))
      );
    });
  }, [candidates, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading registered users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">
          <div className="text-red-600 flex flex-col items-center py-8">
            <span className="text-lg font-medium">Error loading candidates</span>
            <p className="text-sm text-gray-600 mt-2">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Registered Candidates for Mentorship
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {filteredCandidates.length} of {candidates.length} candidates
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email or phone..."
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
                <TableHead className="w-[200px]">User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <TableRow key={candidate._id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{candidate.username}</span>
                        <span className="text-sm text-gray-500 capitalize">
                          {candidate.gender}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <a 
                          href={`mailto:${candidate.email}`} 
                          className="text-blue-600 hover:underline"
                        >
                          {candidate.email}
                        </a>
                        {candidate.mobile && (
                          <span className="text-sm text-gray-500">
                            {candidate.mobile}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="capitalize">{candidate.userType}</span>
                        <span className="text-sm text-gray-500">
                          {candidate.mentorshipCount} mentorships
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                        >
                          <a href={`mailto:${candidate.email}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </a>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <div className="flex flex-col items-center text-gray-500">
                      <Search className="h-8 w-8 mb-2" />
                      No candidates found matching your search.
                      {searchTerm && (
                        <Button 
                          variant="ghost" 
                          className="mt-2"
                          onClick={() => setSearchTerm('')}
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
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