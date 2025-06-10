"use client";
import { useRef, useState, useEffect } from "react";
import InternCategoryCard from "@/components/shared/cards/interncategorycard";
import { CarouselSliderIntern } from "@/components/shared/cards/sliders/carouselslider-intern";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useUserStore } from "@/store/signUpStore";

const Internship = () => {
  const hrRef = useRef<HTMLDivElement>(null);
  const devRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);
  const financeRef = useRef<HTMLDivElement>(null);
  const opsRef = useRef<HTMLDivElement>(null);

  const {currentUser} = useUserStore();

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all internships
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
  // Filter internships by category
  const hrInternships = internships.filter(
    (internship) => internship.category === "Human Resources"
  );
  const devInternships = internships.filter((internship) =>
    ["Software Development", "Blockchain"].includes(internship.category)
  );
  const marketingInternships = internships.filter(
    (internship) => internship.category === "Marketing"
  );
  const financeInternships = internships.filter(
    (internship) => internship.category === "Finance"
  );
  const opsInternships = internships.filter(
    (internship) => internship.category === "Operations"
  );

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-20">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 py-12">
        <div className="flex flex-col gap-3 w-full lg:w-3/5">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <h1 className="text-green-600 text-3xl sm:text-4xl md:text-5xl font-extrabold">
              Internship
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              To Learn
            </h1>
          </div>
          <p className="p-2 text-slate-400 w-full lg:w-3/4 hover:text-slate-700 transition-all duration-100">
            Explore opportunities from across the globe to grow, showcase
            skills, gain CV points & get hired by your dream company.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/internship/find-internship"
              className="bg-green-950 h-10 flex items-center sm:text-xl border border-white text-white hover:bg-white hover:border hover:border-green-950 hover:text-black rounded-full p-4 sm:p-6 transition-all duration-100"
            >
              Find Internships
            </Link>
            {(currentUser.userType === "recruiter" || currentUser.userType === "admin") &&
              <Link
              href={"/internship/internship-publishing"}
              className="bg-white flex items-center h-10 sm:text-xl text-black border border-green-950 hover:bg-green-950 hover:border hover:border-white hover:text-white rounded-full p-4 sm:p-6 transition-all duration-100"
              >
              + Post Internships
            </Link>
            }
          </div>
        </div>
        <img
          src="/internpage/internpageimg.webp"
          alt="Internship illustration"
          className="w-full lg:w-2/5 mt-6 lg:mt-0"
        />
      </div>

      {/* Category Navigation */}
      <div className="bg-white py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <h1 className="text-lg sm:text-xl font-semibold whitespace-nowrap">
            Internship Category:
          </h1>
          <div className="flex gap-2 sm:gap-4 pb-2 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => scrollToCategory(hrRef)}
              className="flex-shrink-0"
            >
              <InternCategoryCard category="Human Resources" />
            </button>
            <button
              onClick={() => scrollToCategory(devRef)}
              className="flex-shrink-0"
            >
              <InternCategoryCard category="Software Development" />
            </button>
            <button
              onClick={() => scrollToCategory(marketingRef)}
              className="flex-shrink-0"
            >
              <InternCategoryCard category="Marketing" />
            </button>
            <button
              onClick={() => scrollToCategory(financeRef)}
              className="flex-shrink-0"
            >
              <InternCategoryCard category="Finance" />
            </button>
            <button
              onClick={() => scrollToCategory(opsRef)}
              className="flex-shrink-0"
            >
              <InternCategoryCard category="Operations" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Sections */}
      {hrInternships.length > 0 && (
        <div ref={hrRef} className="mt-12 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Human Resources Internships
          </h2>
          <CarouselSliderIntern internships={hrInternships} />
        </div>
      )}

      {devInternships.length > 0 && (
        <div ref={devRef} className="mt-16 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Development Internships
          </h2>
          <CarouselSliderIntern internships={devInternships} />
        </div>
      )}

      {marketingInternships.length > 0 && (
        <div ref={marketingRef} className="mt-16 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Marketing Internships
          </h2>
          <CarouselSliderIntern internships={marketingInternships} />
        </div>
      )}

      {financeInternships.length > 0 && (
        <div ref={financeRef} className="mt-16 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Finance Internships
          </h2>
          <CarouselSliderIntern internships={financeInternships} />
        </div>
      )}

      {opsInternships.length > 0 && (
        <div ref={opsRef} className="mt-16 py-8 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Operations Internships
          </h2>
          <CarouselSliderIntern internships={opsInternships} />
        </div>
      )}
    </div>
  );
};

export default Internship;
