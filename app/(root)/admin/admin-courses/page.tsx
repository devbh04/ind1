"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Search } from "lucide-react";
import CourseCard from "@/components/shared/cards/coursecard";
import Link from "next/link";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const FindCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
        toast.error("Error loading courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async () => {
    if (!selectedCourseId) return;
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/courses/${selectedCourseId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete course");

      setCourses((prev) =>
        prev.filter((course) => course._id !== selectedCourseId)
      );
      toast.success("Course deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete course.");
    } finally {
      setSelectedCourseId(null);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tutorNames
        .join(", ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      course.specialization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) return <div>Loading courses...</div>;

  return (
    <div className="container mx-auto px-4 py-14">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-20 py-6">
            {filteredCourses.map((course) => (
              <div key={course._id} className="border p-4 rounded-lg">
                <CourseCard course={course} />
                <div className="flex mt-4 py-2 px-4 space-x-2">
                  <Link
                    href={`/admin/admin-courses/${course._id}`}
                    className="w-full border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 text-center flex items-center justify-center"
                  >
                    <div className="flex items-center">
                      View Registered candidates{" "}
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </div>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => setSelectedCourseId(course._id)}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!selectedCourseId} onOpenChange={() => setSelectedCourseId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this course?</AlertDialogTitle>
            <p className="text-sm text-muted-foreground">
              This action is permanent and cannot be undone.
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FindCourses;
