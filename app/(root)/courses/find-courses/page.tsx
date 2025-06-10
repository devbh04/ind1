"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import CourseCard from "@/components/shared/cards/coursecard";

const FindCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/v1/courses`);
        const data = await res.json();
        setCourses(data);
        console.log("Fetched courses:", data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    return (
      course?.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course?.tutorNames?.some((tutor) =>
        tutor.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      course?.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Courses</h1>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by course title, tutor or specialization..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {filteredCourses.length} Courses Found
            </h2>
            <div className="text-sm text-gray-500">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindCourses;
