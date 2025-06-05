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
import { Pencil } from "lucide-react";

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
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
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
                        className={`bg-gray-50 ${!isEditing ? "border-none bg-gray-100" : ""}`}
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
                        className={`bg-gray-50 ${!isEditing ? "border-none bg-gray-100" : ""}`}
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
                    <FormLabel className="text-gray-700">Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your mobile number"
                        {...field}
                        disabled={!isEditing}
                        className={`bg-gray-50 ${!isEditing ? "border-none bg-gray-100" : ""}`}
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
                            field.value === gender
                              ? "default"
                              : "outline"
                          }
                          disabled={!isEditing}
                          className={`rounded-full px-4 h-9 ${
                            field.value === gender
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-white hover:bg-gray-50"
                          } ${!isEditing ? "opacity-70 cursor-not-allowed" : ""}`}
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
                        className={`bg-gray-50 ${!isEditing ? "border-none bg-gray-100" : ""}`}
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
                    <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                        disabled={!isEditing}
                        className={`bg-gray-50 ${!isEditing ? "border-none bg-gray-100" : ""}`}
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
        <CarouselSliderCourse />
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
        <CarouselSliderIntern />
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
        <CarouselSliderMentor />
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
        <CarouselSliderHackathon />
      </div>

      {/* Numbers Section */}
      <div ref={numbersRef} className="mt-16 pt-4 pb-16">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Our Impact in Numbers
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <NumbersCard number={"200"} abb={"K+"} text={"Active Users"} />
          <NumbersCard number={"5"} abb={"K+"} text={"Opportunities"} />
          <NumbersCard number={"50"} abb={"K+"} text={"Assessments"} />
          <NumbersCard number={"500"} abb={"+"} text={"Partners"} />
          <NumbersCard number={"100"} abb={"+"} text={"Countries"} />
        </div>
      </div>
    </div>
  );
};

export default Profile;