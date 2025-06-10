"use client";
import OptionCard from "@/components/shared/cards/optioncard";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CarouselSliderCourse } from "@/components/shared/cards/sliders/carouselslider-course";
import { CarouselSliderHackathon } from "@/components/shared/cards/sliders/carouselslider-hackathon";
import { CarouselSliderIntern } from "@/components/shared/cards/sliders/carouselslider-intern";
import { CarouselSliderMentor } from "@/components/shared/cards/sliders/carouselslider-mentor";
import NumbersCard from "@/components/shared/cards/numberscard";
import axios from "axios";
import { toast } from "sonner";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const courseRef = useRef<HTMLDivElement>(null);
  const internshipRef = useRef<HTMLDivElement>(null);
  const mentorRef = useRef<HTMLDivElement>(null);
  const hackathonRef = useRef<HTMLDivElement>(null);

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3001/api/v1/internships"
        );
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
  const [mentors, setMentors] = useState([]);
  const [mloading, setMLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/v1/mentors"); // Change this if needed
        const data = await res.json();
        setMentors(data);
      } catch (err) {
        console.error("Failed to fetch mentors:", err);
      } finally {
        setMLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/v1/courses");
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

  const [hackathons, setHackathons] = useState([]);
  const [hloading, setHLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/hackathons");
        const data = await response.json();
        setHackathons(data);
      } catch (error) {
        console.error("Failed to fetch hackathons:", error);
      } finally {
        setHLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const scrollToCategory = (ref) => {
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

  return (
    <div className="mx-4 md:mx-1 lg:mx-1">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 mt-6 flex flex-col gap-4 justify-center">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <h1 className="text-green-600 text-4xl sm:text-5xl font-extrabold">
              Unlock
            </h1>
            <h1 className="text-4xl sm:text-5xl font-extrabold">Your Career</h1>
          </div>
          <p className="p-2 text-slate-400 w-full lg:w-3/4 hover:text-slate-700 transition-all duration-100">
            Explore opportunities from across the globe to grow, showcase
            skills, gain CV points & get hired by your dream company.
          </p>
        </div>
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <OptionCard
            onclick={() => scrollToCategory(internshipRef)}
            bg={"bg-cyan-100"}
            title={"Internships"}
            description1={"Gain,"}
            description2={"Apply, Upskill"}
            asset={"/homepage/book.svg"}
          />
          <OptionCard
            onclick={() => scrollToCategory(hackathonRef)}
            bg={"bg-green-100"}
            title={"Hackathons"}
            description1={"Battle,"}
            description2={"For Excellence"}
            asset={"/homepage/certificate.svg"}
          />
          <OptionCard
            onclick={() => scrollToCategory(mentorRef)}
            bg={"bg-purple-100"}
            title={"Mentorships"}
            description1={"Guidance"}
            description2={"From Top Mentors"}
            asset={"/homepage/person.svg"}
          />
          <OptionCard
            onclick={() => scrollToCategory(courseRef)}
            bg={"bg-amber-100"}
            title={"Courses"}
            description1={"Learn,"}
            description2={"Do Better"}
            asset={"/homepage/computer.svg"}
          />
        </div>
      </div>

      {/* Courses Section */}
      <div ref={courseRef} className="mt-10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div>
            <h1 className="text-2xl md:text-3xl">Courses</h1>
            <p className="p-1 text-slate-400 hover:text-slate-700 transition-all duration-100">
              Explore the Courses that are creating a buzz among your peers!
            </p>
          </div>
          <Link
            href={"/courses"}
            className="flex gap-2 underline text-slate-400 hover:text-slate-700 transition-all duration-100 sm:ml-auto items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-slate-400 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
            View All
          </Link>
        </div>
        <CarouselSliderCourse courses={courses} />
      </div>

      {/* Internships Section */}
      <div ref={internshipRef} className="mt-10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div>
            <h1 className="text-2xl md:text-3xl">Internships</h1>
            <p className="p-1 text-slate-400 hover:text-slate-700 transition-all duration-100">
              Find the Internships that fits your career aspirations.
            </p>
          </div>
          <Link
            href={"/internship"}
            className="flex gap-2 underline text-slate-400 hover:text-slate-700 transition-all duration-100 sm:ml-auto items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-slate-400 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
            View All
          </Link>
        </div>
        <CarouselSliderIntern internships={internships} />
      </div>

      {/* Mentors Section */}
      <div ref={mentorRef} className="mt-10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div>
            <h1 className="text-2xl md:text-3xl">Top Mentors</h1>
            <p className="p-1 text-slate-400 hover:text-slate-700 transition-all duration-100">
              In search of excellence? Explore the highest-rated mentors as
              recognized by the learner community.
            </p>
          </div>
          <Link
            href={"/mentorship"}
            className="flex gap-2 underline text-slate-400 hover:text-slate-700 transition-all duration-100 sm:ml-auto items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-slate-400 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
            View All
          </Link>
        </div>
        <CarouselSliderMentor mentors={mentors} />
      </div>

      {/* Hackathons Section */}
      <div ref={hackathonRef} className="mt-10 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div>
            <h1 className="text-2xl md:text-3xl">Hackathons</h1>
            <p className="p-1 text-slate-400 hover:text-slate-700 transition-all duration-100">
              Explore the Hackathons that are creating a buzz among your peers!
            </p>
          </div>
          <Link
            href={"/hackathon"}
            className="flex gap-2 underline text-slate-400 hover:text-slate-700 transition-all duration-100 sm:ml-auto items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-slate-400 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
            View All
          </Link>
        </div>
        <CarouselSliderHackathon hackathons={hackathons} />
      </div>

      {/* Numbers Section */}
      <div className="mt-10 mb-10 space-y-6 flex flex-col items-center">
        <h1 className="flex justify-center text-2xl md:text-3xl text-slate-600">
          Our Numbers
        </h1>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 md:gap-4">
          <NumbersCard number={"200"} abb={"K+"} text={"Active Users"} />
          <NumbersCard number={"2"} abb={"K+"} text={"Opportunities"} />
          <NumbersCard number={"20"} abb={"K+"} text={"Assesments"} />
          <NumbersCard number={"150"} abb={"+"} text={"Brands"} />
          <NumbersCard number={"10"} abb={"+"} text={"Partners"} />
          <NumbersCard number={"120"} abb={"+"} text={"Countries"} />
        </div>
      </div>
    </div>
  );
};

export default Home;
