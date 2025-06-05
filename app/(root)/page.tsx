"use client";
import OptionCard from "@/components/shared/cards/optioncard";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CarouselSliderCourse } from "@/components/shared/cards/sliders/carouselslider-course";
import { CarouselSliderHackathon } from "@/components/shared/cards/sliders/carouselslider-hackathon";
import { CarouselSliderIntern } from "@/components/shared/cards/sliders/carouselslider-intern";
import { CarouselSliderMentor } from "@/components/shared/cards/sliders/carouselslider-mentor";
import NumbersCard from "@/components/shared/cards/numberscard";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const courseRef = useRef<HTMLDivElement>(null);
  const internshipRef = useRef<HTMLDivElement>(null);
  const mentorRef = useRef<HTMLDivElement>(null);
  const hackathonRef = useRef<HTMLDivElement>(null);

  const Mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Senior AI Researcher",
      organization: "Tech Innovators Inc.",
      experience: "15+ years",
      expertise: ["Machine Learning", "Computer Vision", "Python"],
      rating: 4.9,
      sessions: 245,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Former Google AI researcher with 15+ years experience in machine learning and computer vision. Passionate about mentoring the next generation of AI engineers.",
      availability: "Online",
      languages: ["English", "Spanish"],
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Blockchain Architect",
      organization: "Crypto Foundation",
      experience: "10 years",
      expertise: ["Solidity", "Smart Contracts", "DeFi"],
      rating: 4.8,
      sessions: 180,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Blockchain expert with extensive experience in building decentralized applications. Mentor to multiple successful blockchain startups.",
      availability: "San Francisco, CA",
      languages: ["English", "Mandarin"],
    },
    {
      id: 3,
      name: "Priya Patel",
      title: "Sustainability Consultant",
      organization: "Green Earth Initiative",
      experience: "12 years",
      expertise: ["Renewable Energy", "Climate Policy", "ESG"],
      rating: 4.7,
      sessions: 150,
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      bio: "Sustainability leader with experience advising governments and corporations on climate change solutions. Passionate about mentoring young environmentalists.",
      availability: "Hybrid (New York/Online)",
      languages: ["English", "Hindi", "French"],
    },
  ];
  const Hackathons = [
    {
      id: 1,
      title: "Global AI Hackathon 2023",
      type: "AI/ML",
      organizer: "Tech Innovators Inc.",
      prizePool: "$50,000",
      startDate: "2023-11-15",
      endDate: "2023-11-17",
      registrationDeadline: "2023-11-10",
      mode: "online",
      logo: "https://via.placeholder.com/150",
      skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision"],
      participants: 1200,
      description:
        "Join the premier AI hackathon to solve real-world problems using machine learning and artificial intelligence.",
    },
    {
      id: 2,
      title: "Blockchain Builders Challenge",
      type: "Blockchain",
      organizer: "Crypto Foundation",
      prizePool: "$30,000",
      startDate: "2023-12-05",
      endDate: "2023-12-07",
      registrationDeadline: "2023-11-28",
      mode: "offline",
      location: "San Francisco, CA",
      logo: "https://via.placeholder.com/150",
      skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3"],
      participants: 850,
      description:
        "Build decentralized applications that push the boundaries of blockchain technology.",
    },
    {
      id: 3,
      title: "Climate Change Hackathon",
      type: "Sustainability",
      organizer: "Green Earth Initiative",
      prizePool: "$25,000",
      startDate: "2023-10-20",
      endDate: "2023-10-22",
      registrationDeadline: "2023-10-15",
      mode: "hybrid",
      location: "New York, NY (with online participation)",
      logo: "https://via.placeholder.com/150",
      skills: ["Data Analysis", "IoT", "Renewable Energy", "GIS"],
      participants: 1500,
      description:
        "Develop innovative solutions to combat climate change and promote sustainability.",
    },
  ];
  const Internships = [
    {
      id: "1",
      companyName: "Talent Solutions Ltd.",
      title: "HR Recruitment Intern",
      category: "Human Resources",
      workplaceType: "hybrid",
      location: "Chicago, IL",
      duration: "3 Months",
      startDate: "2023-12-01",
      stipend: {
        min: 1200,
        max: 1800,
      },
      skills: ["Recruitment", "Screening", "Interviewing"],
      benefits: {
        jobOffer: true,
        certificate: true,
        lor: true,
        insurance: false,
        stipend: true,
        equipment: false,
      },
    },
  ];
  const Courses = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      tutors: "Dr. Smith, Prof. Johnson",
      email: "ml-course@example.com",
      phone: "+1 (555) 123-4567",
      courseType: "B.Tech",
      specialization: "AI & Machine Learning",
      duration: "4 Months",
      description:
        "Learn the core concepts of machine learning including supervised and unsupervised learning, neural networks, and model evaluation techniques. Hands-on projects with real-world datasets.",
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
      description:
        "Master modern web development with HTML5, CSS3, JavaScript, React, and Node.js. Build portfolio-ready projects and deploy them to the cloud.",
      coverImage: "/L.avif",
      enrolled: 312,
      rating: 4.7,
    },
    {
      id: 3,
      title: "Advanced Data Structures",
      tutors: "Dr. Emily White",
      email: "ds-course@example.com",
      phone: "+1 (555) 234-5678",
      courseType: "M.Tech",
      specialization: "Computer Science",
      duration: "3 Months",
      description:
        "Deep dive into advanced data structures like B-trees, red-black trees, graph algorithms, and their real-world applications in system design.",
      coverImage: "/L.avif",
      enrolled: 156,
      rating: 4.6,
    },
  ];

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
      const offsetPosition = elementPosition + window.pageYOffset - appBarHeight;

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
        <CarouselSliderCourse courses={Courses} />
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
        <CarouselSliderIntern internships={Internships} />
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
        <CarouselSliderMentor mentors={Mentors} />
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
        <CarouselSliderHackathon hackathons={Hackathons} />
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
