// app/courses/page.tsx
"use client";
import { useRef } from "react";
import { CarouselSliderCourse } from "@/components/shared/cards/sliders/carouselslider-course";
import CourseCategoryCard from "@/components/shared/cards/coursecategorycard";
import Link from "next/link";


const Courses = () => {
  const techRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const artsRef = useRef<HTMLDivElement>(null);
  const scienceRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);

  // Technology Courses
  const techCourses = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      tutors: "Dr. Smith, Prof. Johnson",
      email: "ml-course@example.com",
      phone: "+1 (555) 123-4567",
      courseType: "B.Tech",
      specialization: "AI & Machine Learning",
      duration: "4 Months",
      description: "Learn the core concepts of machine learning including supervised and unsupervised learning, neural networks, and model evaluation techniques. Hands-on projects with real-world datasets.",
      coverImage: "/L.avif",
      enrolled: 245,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      tutors: "Alex Chen, Sarah Williams",
      email: "webdev@example.com",
      phone: "+1 (555) 987-6543",
      courseType: "B.Sc",
      specialization: "Computer Science",
      duration: "3 Months",
      description: "Master modern web development with HTML5, CSS3, JavaScript, React, and Node.js. Build portfolio-ready projects and deploy them to the cloud.",
      coverImage: "/L.avif",
      enrolled: 312,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Advanced Data Structures",
      tutors: "Dr. Emily White",
      email: "ds-course@example.com",
      phone: "+1 (555) 234-5678",
      courseType: "M.Tech",
      specialization: "Computer Science",
      duration: "3 Months",
      description: "Deep dive into advanced data structures like B-trees, red-black trees, graph algorithms, and their real-world applications in system design.",
      coverImage: "/L.avif",
      enrolled: 156,
      rating: 4.6,
    },
  ];

  // Business Courses
  const businessCourses = [
    {
      id: 3,
      title: "Financial Markets & Analysis",
      tutors: "Prof. Robert Brown",
      email: "finance-course@example.com",
      phone: "+1 (555) 456-7890",
      courseType: "MBA",
      specialization: "Finance",
      duration: "2 Months",
      description: "Understand financial markets, investment strategies, and risk management. Learn to analyze stocks, bonds, and derivatives.",
      coverImage: "/L.avif",
      enrolled: 178,
      rating: 4.9,
    },
    {
      id: 5,
      title: "Digital Marketing Masterclass",
      tutors: "Mark Taylor, Lisa Ray",
      email: "marketing@example.com",
      phone: "+1 (555) 345-6789",
      courseType: "MBA",
      specialization: "Marketing",
      duration: "2 Months",
      description: "Learn SEO, social media marketing, content strategy, and analytics to build effective digital marketing campaigns.",
      coverImage: "/L.avif",
      enrolled: 289,
      rating: 4.5,
    }
  ];

  // Arts & Design Courses
  const artsCourses = [
    {
      id: 6,
      title: "Graphic Design Principles",
      tutors: "Jessica Lee",
      email: "design@example.com",
      phone: "+1 (555) 567-8901",
      courseType: "BFA",
      specialization: "Graphic Design",
      duration: "3 Months",
      description: "Master the fundamentals of typography, color theory, and layout design to create visually compelling graphics.",
      coverImage: "/L.avif",
      enrolled: 198,
      rating: 4.7,
    }
  ];

  // Science Courses
  const scienceCourses = [
    {
      id: 7,
      title: "Quantum Physics Basics",
      tutors: "Dr. Alan Turing",
      email: "physics@example.com",
      phone: "+1 (555) 678-9012",
      courseType: "M.Sc",
      specialization: "Physics",
      duration: "4 Months",
      description: "Introduction to quantum mechanics, wave-particle duality, and quantum computing fundamentals.",
      coverImage: "/L.avif",
      enrolled: 132,
      rating: 4.8,
    }
  ];

  // Health Courses
  const healthCourses = [
    {
      id: 8,
      title: "Nutrition Science",
      tutors: "Dr. Sarah Miller",
      email: "nutrition@example.com",
      phone: "+1 (555) 789-0123",
      courseType: "B.Sc",
      specialization: "Nutrition",
      duration: "3 Months",
      description: "Learn about macronutrients, micronutrients, and how to create balanced meal plans for different health goals.",
      coverImage: "/L.avif",
      enrolled: 210,
      rating: 4.6,
    }
  ];

  const scrollToCategory = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const appBarHeight = 96;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - appBarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

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
            Discover courses from top institutions and industry experts to gain new skills, 
            advance your career, and achieve your professional goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={'/courses/find-courses'} className="bg-blue-950 text-white flex items-center justify-center h-10 sm:text-xl border border-white hover:bg-white hover:border hover:border-blue-950 hover:text-black rounded-full p-4 sm:p-6 transition-all duration-100">
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
      <div ref={techRef} className="mt-12 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Technology Courses
        </h2>
        <CarouselSliderCourse courses={techCourses} />
      </div>

      <div ref={businessRef} className="mt-16 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Business Courses
        </h2>
        <CarouselSliderCourse courses={businessCourses} />
      </div>

      <div ref={artsRef} className="mt-16 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Arts & Design Courses
        </h2>
        <CarouselSliderCourse courses={artsCourses} />
      </div>

      <div ref={scienceRef} className="mt-16 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Science Courses
        </h2>
        <CarouselSliderCourse courses={scienceCourses} />
      </div>

      <div ref={healthRef} className="mt-16 py-8 mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Health Courses
        </h2>
        <CarouselSliderCourse courses={healthCourses} />
      </div>
    </div>
  );
};

export default Courses;