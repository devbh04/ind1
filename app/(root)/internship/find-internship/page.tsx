"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import InternshipCard from "@/components/shared/cards/internshipcard";
import axios from "axios";
import { toast } from "sonner";

const FindInternship = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all internships from backend
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/v1/internships');
        setInternships(response.data);
      } catch (error) {
        console.error("Error fetching internships:", error);
        toast.error("Failed to load internships");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // Filter internships based on search term
  const filteredInternships = internships.filter((internship) => {
    return (
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.workplaceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (internship.workLocation && internship.workLocation.toLowerCase().includes(searchTerm.toLowerCase()))
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
      <h1 className="text-3xl font-bold mb-6">Find Internships</h1>

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
          {filteredInternships.length} {filteredInternships.length === 1 ? "Internship" : "Internships"} Found
        </h2>

        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => (
              <InternshipCard
                key={internship._id} // Using _id from MongoDB
                internship={internship}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "No matching internships found" : "No internships available"}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? "Try adjusting your search criteria" : "Check back later for new opportunities"}
            </p>
            {searchTerm && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindInternship;