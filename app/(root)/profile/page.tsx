"use client";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { useState } from "react";
import Link from "next/link";
import { CarouselSliderCourse } from "@/components/shared/cards/sliders/carouselslider-course";
import { CarouselSliderHackathon } from "@/components/shared/cards/sliders/carouselslider-hackathon";
import { CarouselSliderIntern } from "@/components/shared/cards/sliders/carouselslider-intern";
import { CarouselSliderMentor } from "@/components/shared/cards/sliders/carouselslider-mentor";
import NumbersCard from "@/components/shared/cards/numberscard";
import ProfileCategoryCard from "@/components/shared/cards/profilecategorycard";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRightIcon, Pencil } from "lucide-react";

const formSchema = z
  .object({
    userType: z.enum(["candidate", "recruiter"]),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    mobile: z.string().min(10, {
      message: "Please enter a valid mobile number.",
    }),
    gender: z.string(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Profile = () => {
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

  const user = {
    userType: "recruiter",
  };

  // Refs for each section
  const coursesRef = useRef<HTMLDivElement>(null);
  const internshipsRef = useRef<HTMLDivElement>(null);
  const mentorsRef = useRef<HTMLDivElement>(null);
  const hackathonsRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const appBarHeight = 96; // Adjust based on your header height
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - appBarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: "candidate",
      username: "",
      email: "",
      mobile: "",
      gender: "male",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsEditing(false); // Disable editing after submission
  }

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24">
      <h1 className="flex justify-center pt-4 text-2xl">Only For Recruiters</h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4 items-center py-4">
        <Link
          href={user.userType === "recruiter" ? `/profile/hackathons` : "#"}
        >
          <div
            className={`w-full mt-4 py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-center flex items-center justify-center 
      ${
        user.userType === "recruiter"
          ? "border-transparent text-white bg-red-600 hover:bg-white hover:text-red-600"
          : "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
      }`}
          >
            View Hosted Hackathons
          </div>
        </Link>
        <Link
          href={user.userType === "recruiter" ? `/profile/internships` : "#"}
        >
          <div
            className={`w-full mt-4 py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-center flex items-center justify-center 
      ${
        user.userType === "recruiter"
          ? "border-transparent text-red-600 bg-white hover:bg-red-600 hover:text-white"
          : "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
      }`}
          >
            View Posted Internships
          </div>
        </Link>
      </div>
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Profile Information
            </h2>
            <Button
              type="button"
              variant={isEditing ? "destructive" : "outline"}
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        disabled={!isEditing}
                        className={`bg-gray-50 ${
                          !isEditing ? "border-none bg-gray-100" : ""
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        disabled={!isEditing}
                        className={`bg-gray-50 ${
                          !isEditing ? "border-none bg-gray-100" : ""
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile */}
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Mobile Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your mobile number"
                        {...field}
                        disabled={!isEditing}
                        className={`bg-gray-50 ${
                          !isEditing ? "border-none bg-gray-100" : ""
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Gender</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {["male", "female", "other"].map((gender) => (
                        <Button
                          key={gender}
                          type="button"
                          variant={
                            field.value === gender ? "default" : "outline"
                          }
                          disabled={!isEditing}
                          className={`rounded-full px-4 h-9 ${
                            field.value === gender
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-white hover:bg-gray-50"
                          } ${
                            !isEditing ? "opacity-70 cursor-not-allowed" : ""
                          }`}
                          onClick={() => field.onChange(gender)}
                        >
                          {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        disabled={!isEditing}
                        className={`bg-gray-50 ${
                          !isEditing ? "border-none bg-gray-100" : ""
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                        disabled={!isEditing}
                        className={`bg-gray-50 ${
                          !isEditing ? "border-none bg-gray-100" : ""
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>

      {/* Rest of your existing code... */}
      {/* Category Navigation */}
      <div className="bg-white py-4 mt-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center overflow-x-auto">
          <h1 className="text-lg font-semibold whitespace-nowrap">Jump To:</h1>
          <div className="flex gap-3 overflow-x-auto w-full pb-2">
            <button
              onClick={() => scrollToSection(coursesRef)}
              className="flex-shrink-0 focus:outline-none"
            >
              <ProfileCategoryCard category="Courses" />
            </button>
            <button
              onClick={() => scrollToSection(internshipsRef)}
              className="flex-shrink-0 focus:outline-none"
            >
              <ProfileCategoryCard category="Internships" />
            </button>
            <button
              onClick={() => scrollToSection(mentorsRef)}
              className="flex-shrink-0 focus:outline-none"
            >
              <ProfileCategoryCard category="Mentors" />
            </button>
            <button
              onClick={() => scrollToSection(hackathonsRef)}
              className="flex-shrink-0 focus:outline-none"
            >
              <ProfileCategoryCard category="Hackathons" />
            </button>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div ref={coursesRef} className="mt-12 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Featured Courses</h1>
            <p className="text-slate-400 hover:text-slate-700 transition-all duration-100">
              Learn new skills from top instructors
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-1 text-sm text-amber-600 hover:underline mt-2 sm:mt-0"
          >
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <CarouselSliderCourse courses={Courses} />
      </div>

      {/* Internships Section */}
      <div ref={internshipsRef} className="mt-16 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Internship Opportunities
            </h1>
            <p className="text-slate-400 hover:text-slate-700 transition-all duration-100">
              Gain real-world experience
            </p>
          </div>
          <Link
            href="/internship"
            className="flex items-center gap-1 text-sm text-amber-600 hover:underline mt-2 sm:mt-0"
          >
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <CarouselSliderIntern internships={Internships} />
      </div>

      {/* Mentors Section */}
      <div ref={mentorsRef} className="mt-16 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Expert Mentors</h1>
            <p className="text-slate-400 hover:text-slate-700 transition-all duration-100">
              Learn from industry professionals
            </p>
          </div>
          <Link
            href="/mentorship"
            className="flex items-center gap-1 text-sm text-amber-600 hover:underline mt-2 sm:mt-0"
          >
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <CarouselSliderMentor mentors={Mentors} />
      </div>

      {/* Hackathons Section */}
      <div ref={hackathonsRef} className="mt-16 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Upcoming Hackathons
            </h1>
            <p className="text-slate-400 hover:text-slate-700 transition-all duration-100">
              Test your skills and compete
            </p>
          </div>
          <Link
            href="/hackathon"
            className="flex items-center gap-1 text-sm text-amber-600 hover:underline mt-2 sm:mt-0"
          >
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <CarouselSliderHackathon hackathons={Hackathons} />
      </div>
    </div>
  );
};

export default Profile;
