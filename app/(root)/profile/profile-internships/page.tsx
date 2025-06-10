"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Search } from "lucide-react";
import InternshipCard from "@/components/shared/cards/internshipcard";
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

const FindInternship = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUserStore();

  // State for AlertDialog control
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchPostedInternships = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/api/v1/users/${currentUser._id}/internships`
        );
        setInternships(response.data);
        console.log("Posted Internships:", response.data);
      } catch (error) {
        console.error("Error fetching internships:", error);
        toast.error("Failed to fetch internships");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?._id) {
      fetchPostedInternships();
    }
  }, [currentUser?._id]);

  const confirmDeleteInternship = async () => {
    if (!deleteId) return;
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/v1/users/${currentUser._id}/internships/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setInternships((prev) =>
          prev.filter((intern) => intern._id !== deleteId)
        );
        toast.success("Internship deleted successfully");
      }
    } catch (error) {
      console.error("Delete error:", error);
      if (error.response?.status === 403) {
        toast.error("You don't have permission to delete this internship");
      } else if (error.response?.status === 404) {
        toast.error("Internship not found");
      } else {
        toast.error("Failed to delete internship");
      }
    } finally {
      setDeleteId(null);
    }
  };

  const filteredInternships = internships.filter((internship) => {
    return (
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.workplaceType
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (internship.location &&
        internship.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search your posted internships..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {filteredInternships.length}{" "}
          {filteredInternships.length === 1 ? "Internship" : "Internships"}{" "}
          Posted
        </h2>

        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => (
              <div key={internship._id} className="border p-4 rounded-lg">
                <InternshipCard internship={internship} />
                <div className="flex mt-4 py-2 px-4 space-x-2">
                  <Link
                    href={`/profile/profile-internships/${internship._id}`}
                    className="flex-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-center flex items-center justify-center py-2"
                  >
                    <div className="flex items-center justify-center">
                      View Candidates{" "}
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </div>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => setDeleteId(internship._id)}
                  >
                    Delete
                  </Button>
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
              No internships posted yet
            </h3>
            <p className="text-gray-500">Create your first internship posting</p>
            <Link href="/internship/internship-publishing">
              <Button className="mt-4">Post an Internship</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently delete the
              internship post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteInternship}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FindInternship;
