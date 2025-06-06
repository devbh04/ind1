"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Search } from "lucide-react";
import CourseCard from "@/components/shared/cards/coursecard";
import Link from "next/link";

const courses = [
  {
    id: "1",
    title: "Machine Learning Fundamentals",
    tutors: "Dr. Smith, Prof. Johnson",
    courseType: "B.Tech",
    specialization: "AI & Machine Learning",
    category: "Technology",
    duration: "4 Months",
    description:
      "Learn the core concepts of machine learning including supervised and unsupervised learning, neural networks, and model evaluation techniques.",
    coverImage: "/L.avif",
    enrolled: 245,
    rating: 4.8,
  },
  {
    id: "2",
    title: "Web Development Bootcamp",
    tutors: "Alex Chen, Sarah Williams",
    courseType: "B.Sc",
    specialization: "Computer Science",
    category: "Technology",
    duration: "3 Months",
    description:
      "Master modern web development with HTML5, CSS3, JavaScript, React, and Node.js. Build portfolio-ready projects.",
    coverImage: "/L.avif",
    enrolled: 312,
    rating: 4.7,
  },
  {
    id: "3",
    title: "Financial Markets & Analysis",
    tutors: "Prof. Robert Brown",
    courseType: "MBA",
    specialization: "Finance",
    category: "Business",
    duration: "2 Months",
    description:
      "Understand financial markets, investment strategies, and risk management. Learn to analyze stocks, bonds, and derivatives.",
    coverImage: "/L.avif",
    enrolled: 178,
    rating: 4.9,
  },
  {
    id: "4",
    title: "Digital Marketing Masterclass",
    tutors: "Mark Taylor, Lisa Ray",
    courseType: "MBA",
    specialization: "Marketing",
    category: "Business",
    duration: "2 Months",
    description:
      "Learn SEO, social media marketing, content strategy, and analytics to build effective digital marketing campaigns.",
    coverImage: "/L.avif",
    enrolled: 289,
    rating: 4.5,
  },
  {
    id: "5",
    title: "Graphic Design Principles",
    tutors: "Emily Chen, David Wilson",
    courseType: "Diploma",
    specialization: "Design",
    category: "Arts & Design",
    duration: "6 Weeks",
    description:
      "Master the fundamentals of graphic design including typography, color theory, and composition.",
    coverImage: "/L.avif",
    enrolled: 156,
    rating: 4.6,
  },
  {
    id: "6",
    title: "Data Science Essentials",
    tutors: "Dr. Sarah Johnson",
    courseType: "M.Tech",
    specialization: "Data Science",
    category: "Technology",
    duration: "3 Months",
    description:
      "Learn data analysis, visualization, and machine learning techniques using Python and R.",
    coverImage: "/L.avif",
    enrolled: 420,
    rating: 4.7,
  },
];

const FindCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tutors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.specialization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category)),
  ];

  return (
    <div className="container mx-auto px-4 py-14">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
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

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
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
              <div key={course.id} className="border p-4 rounded-lg">
                <CourseCard key={course.id} course={course} />
                <div className="flex mt-4 py-2 px-4 space-x-1">
                  <Link
                    href={`/admin/courses/course-id`}
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
    </div>
  );
};

export default FindCourses;
