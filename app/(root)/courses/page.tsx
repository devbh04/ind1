"use client";

import { useRef, useEffect, useState } from "react";
import { CarouselSliderCourse } from "@/components/shared/cards/sliders/carouselslider-course";
import CourseCategoryCard from "@/components/shared/cards/coursecategorycard";
import Link from "next/link";
import { BASE_URL } from "@/utils/constants";

const Courses = () => {
  const techRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const artsRef = useRef<HTMLDivElement>(null);
  const scienceRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/courses`);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const scrollToCategory = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const appBarHeight = 96;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - appBarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Group courses by category
  const techCourses = courses.filter(
    (course) => course.specialization === "Technology"
  );
  const businessCourses = courses.filter(
    (course) => course.specialization === "Business"
  );
  const artsCourses = courses.filter(
    (course) => course.specialization === "Arts & Design"
  );
  const scienceCourses = courses.filter(
    (course) => course.specialization === "Science"
  );
  const healthCourses = courses.filter(
    (course) => course.specialization === "Health"
  );

  if (loading)
    return <div className="text-center py-12">Loading courses...</div>;

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-20">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 py-12">
        <div className="flex flex-col gap-3 w-full lg:w-3/5">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <h1 className="text-blue-600 text-3xl sm:text-4xl md:text-5xl font-extrabold">
              Courses
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              To Advance Your Career
            </h1>
          </div>
          <p className="p-2 text-slate-400 w-full lg:w-3/4 hover:text-slate-700 transition-all duration-100">
            Discover courses from top institutions and industry experts to gain
            new skills, advance your career, and achieve your professional
            goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={"/courses/find-courses"}
              className="bg-blue-950 text-white flex items-center justify-center h-10 sm:text-xl border border-white hover:bg-white hover:border hover:border-blue-950 hover:text-black rounded-full p-4 sm:p-6 transition-all duration-100"
            >
              Browse Courses
            </Link>
          </div>
        </div>
        <img
          src="/course.webp"
          alt="Course illustration"
          className="w-full lg:w-2/5 mt-6 lg:mt-0"
        />
      </div>

      {/* Category Navigation */}
      <div className="bg-white py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <h1 className="text-lg sm:text-xl font-semibold whitespace-nowrap">
            Course Categories:
          </h1>
          <div className="flex gap-2 sm:gap-4 pb-2 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => scrollToCategory(techRef)}
              className="flex-shrink-0"
            >
              <CourseCategoryCard category="Technology" />
            </button>
            <button
              onClick={() => scrollToCategory(businessRef)}
              className="flex-shrink-0"
            >
              <CourseCategoryCard category="Business" />
            </button>
            <button
              onClick={() => scrollToCategory(artsRef)}
              className="flex-shrink-0"
            >
              <CourseCategoryCard category="Arts & Design" />
            </button>
            <button
              onClick={() => scrollToCategory(scienceRef)}
              className="flex-shrink-0"
            >
              <CourseCategoryCard category="Science" />
            </button>
            <button
              onClick={() => scrollToCategory(healthRef)}
              className="flex-shrink-0"
            >
              <CourseCategoryCard category="Health" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Sections */}
      {techCourses.length >0 && (
        <div ref={techRef} className="mt-12 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Technology Courses
          </h2>
          <CarouselSliderCourse courses={techCourses} />
        </div>
      )}

      {businessCourses.length >0 && (
        <div ref={businessRef} className="mt-16 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Business Courses
          </h2>
          <CarouselSliderCourse courses={businessCourses} />
        </div>
      )}

      {artsCourses.length >0 && (
        <div ref={artsRef} className="mt-16 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Arts & Design Courses
          </h2>
          <CarouselSliderCourse courses={artsCourses} />
        </div>
      )}

      {scienceCourses.length >0 && (
        <div ref={scienceRef} className="mt-16 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Science Courses
          </h2>
          <CarouselSliderCourse courses={scienceCourses} />
        </div>
      )}

      {healthCourses.length >0 && (
        <div ref={healthRef} className="mt-16 py-8 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Health Courses
          </h2>
          <CarouselSliderCourse courses={healthCourses} />
        </div>
      )}
    </div>
  );
};

export default Courses;
