// app/internship/page.tsx
"use client";
import { useRef } from "react";
import InternCategoryCard from "@/components/shared/cards/interncategorycard";
import { CarouselSliderIntern } from "@/components/shared/cards/sliders/carouselslider-intern";
import Link from "next/link";

const Internship = () => {
  const hrRef = useRef<HTMLDivElement>(null);
  const devRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);
  const financeRef = useRef<HTMLDivElement>(null);
  const opsRef = useRef<HTMLDivElement>(null);

  // Sample internship data by category
  const hrInternships = [
    {
      id: "6",
      companyName: "Talent Solutions Ltd.",
      title: "HR Recruitment Intern",
      category: "Human Resources",
      workplaceType: "hybrid",
      location: "Chicago, IL",
      duration: "3 Months",
      startDate: "2023-12-01",
      stipend: {
        min: 1200,
        max: 1800
      },
      skills: ["Recruitment", "Screening", "Interviewing"],
      benefits: {
        jobOffer: true,
        certificate: true,
        lor: true,
        insurance: false,
        stipend: true,
        equipment: false
      }
    }
  ];

  const devInternships = [
    {
      id: "1",
      companyName: "Tech Innovators Inc.",
      title: "Software Development Intern",
      category: "Software Development",
      workplaceType: "remote",
      duration: "3 Months",
      startDate: "2023-11-15",
      stipend: {
        min: 1000,
        max: 2000
      },
      skills: ["JavaScript", "React", "Node.js"],
      benefits: {
        jobOffer: true,
        certificate: true,
        lor: false,
        insurance: false,
        stipend: true,
        equipment: false
      }
    },
    {
      id: "3",
      companyName: "Crypto Foundation",
      title: "Blockchain Developer Intern",
      category: "Blockchain",
      workplaceType: "on-site",
      location: "San Francisco, CA",
      duration: "2 Months",
      startDate: "2024-01-10",
      stipend: {
        min: 2000,
        max: 3000
      },
      skills: ["Solidity", "Ethereum", "Smart Contracts"],
      benefits: {
        jobOffer: true,
        certificate: true,
        lor: true,
        insurance: false,
        stipend: true,
        equipment: false
      }
    }
  ];

  const marketingInternships = [
    {
      id: "7",
      companyName: "Digital Marketing Pro",
      title: "Social Media Intern",
      category: "Marketing",
      workplaceType: "remote",
      duration: "4 Months",
      startDate: "2024-01-05",
      stipend: {
        min: 800,
        max: 1500
      },
      skills: ["Social Media", "Content Creation", "Analytics"],
      benefits: {
        jobOffer: false,
        certificate: true,
        lor: true,
        insurance: false,
        stipend: true,
        equipment: true
      }
    }
  ];

  const financeInternships = [
    {
      id: "8",
      companyName: "Global Finance Corp",
      title: "Financial Analyst Intern",
      category: "Finance",
      workplaceType: "on-site",
      location: "New York, NY",
      duration: "6 Months",
      startDate: "2023-12-15",
      stipend: {
        min: 2500,
        max: 3500
      },
      skills: ["Financial Modeling", "Excel", "Data Analysis"],
      benefits: {
        jobOffer: true,
        certificate: true,
        lor: true,
        insurance: true,
        stipend: true,
        equipment: true
      }
    }
  ];

  const opsInternships = [
    {
      id: "9",
      companyName: "Logistics Solutions",
      title: "Operations Intern",
      category: "Operations",
      workplaceType: "hybrid",
      location: "Dallas, TX",
      duration: "3 Months",
      startDate: "2024-02-01",
      stipend: {
        min: 1500,
        max: 2000
      },
      skills: ["Process Improvement", "Supply Chain", "Coordination"],
      benefits: {
        jobOffer: false,
        certificate: true,
        lor: true,
        insurance: true,
        stipend: true,
        equipment: false
      }
    }
  ];

  const scrollToCategory = (ref) => {
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
            <Link href="/internship/find-internship" className="bg-green-950 h-10 flex items-center sm:text-xl border border-white text-white hover:bg-white hover:border hover:border-green-950 hover:text-black rounded-full p-4 sm:p-6 transition-all duration-100">
              Find Internships
            </Link>
            <Link href={"/internship/internship-publishing"} className="bg-white flex items-center h-10 sm:text-xl text-black border border-green-950 hover:bg-green-950 hover:border hover:border-white hover:text-white rounded-full p-4 sm:p-6 transition-all duration-100">
              + Post Internships
            </Link>
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
            <button onClick={() => scrollToCategory(hrRef)} className="flex-shrink-0">
              <InternCategoryCard category="Human Resources" />
            </button>
            <button onClick={() => scrollToCategory(devRef)} className="flex-shrink-0">
              <InternCategoryCard category="Software Development" />
            </button>
            <button onClick={() => scrollToCategory(marketingRef)} className="flex-shrink-0">
              <InternCategoryCard category="Marketing" />
            </button>
            <button onClick={() => scrollToCategory(financeRef)} className="flex-shrink-0">
              <InternCategoryCard category="Finance" />
            </button>
            <button onClick={() => scrollToCategory(opsRef)} className="flex-shrink-0">
              <InternCategoryCard category="Operations" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <div ref={hrRef} className="mt-12 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Human Resources Internships
        </h2>
        <CarouselSliderIntern internships={hrInternships} />
      </div>

      <div ref={devRef} className="mt-16 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Software Development Internships
        </h2>
        <CarouselSliderIntern internships={devInternships} />
      </div>

      <div ref={marketingRef} className="mt-16 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Marketing Internships
        </h2>
        <CarouselSliderIntern internships={marketingInternships} />
      </div>

      <div ref={financeRef} className="mt-16 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Finance Internships
        </h2>
        <CarouselSliderIntern internships={financeInternships} />
      </div>

      <div ref={opsRef} className="mt-16 py-8 mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Operations Internships
        </h2>
        <CarouselSliderIntern internships={opsInternships} />
      </div>
    </div>
  );
};

export default Internship;