"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Search, Loader2 } from "lucide-react";

import Link from "next/link";
import { useUserStore } from "@/store/signUpStore";
import axios from "axios";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import MentorCard from "@/components/shared/cards/mentorcard";

const FindMentorship = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { currentUser } = useUserStore();

  // State for AlertDialog control
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchPostedMentorships = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/api/v1/mentors/user/${currentUser._id}`
        );
        setMentorships(response.data);
      } catch (error) {
        console.error("Error fetching Mentorship:", error);
        toast.error("Failed to fetch Mentorship");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?._id) {
      fetchPostedMentorships();
    }
  }, [currentUser?._id]);

  const confirmDeleteMentorship = async () => {
    if (!deleteId) return;
    
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `http://localhost:3001/api/v1/mentors/${deleteId}`
      );
      
      if (response.data.success) {
        toast.success("Mentorship deleted successfully");
        // Remove the deleted mentorship from state
        setMentorships(mentorships.filter(mentor => mentor._id !== deleteId));
      } else {
        toast.error("Failed to delete mentorship");
      }
    } catch (error) {
      console.error("Error deleting mentorship:", error);
      toast.error(error.response?.data?.error || "Failed to delete mentorship");
    } finally {
      setIsDeleting(false);
      setDeleteId(null); // Close the dialog
    }
  };

  const filteredMentors = mentorships.filter((mentor) => {
    const name = mentor.firstName + ' ' + mentor.lastName;
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mentor.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (mentor.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (mentor.expertise?.some(
        (skill) => skill?.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? false)
    );
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-12 w-12 text-gray-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="text-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-3 w-full lg:w-3/5">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <h1 className="text-amber-600 text-3xl sm:text-4xl md:text-5xl font-extrabold">Mentorships Posted</h1>
            </div>
          </div>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            <div key={mentor._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <MentorCard mentor={mentor} />
              <div className="flex mt-4 py-2 px-4 space-x-2">
                <Link
                  href={`/profile/profile-mentorships/${mentor._id}`}
                  className="flex-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-center flex items-center justify-center py-2"
                >
                  <div className="flex items-center justify-center">
                    View Candidates{" "}
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </div>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteId(mentor._id)}
                  disabled={isDeleting}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && filteredMentors.length === 0 && (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No mentors found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 
                "Try adjusting your search query to find what you're looking for." : 
                "You haven't posted any mentorships yet."}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the mentorship and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteMentorship}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FindMentorship;