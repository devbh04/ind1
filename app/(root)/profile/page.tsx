"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { CarouselSliderCourse } from "@/components/shared/cards/sliders/carouselslider-course";
import { CarouselSliderHackathon } from "@/components/shared/cards/sliders/carouselslider-hackathon";
import { CarouselSliderIntern } from "@/components/shared/cards/sliders/carouselslider-intern";
import { CarouselSliderMentor } from "@/components/shared/cards/sliders/carouselslider-mentor";
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
import { ArrowRightIcon, Pencil, LogOut } from "lucide-react";
import { useUserStore } from "@/store/signUpStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";

// Updated form schema without password fields
const formSchema = z.object({
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
});

const Profile = () => {
  const { currentUser, updateUser, logout } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [mentors, setMentors] = useState([]);

  // Refs for each section
  const coursesRef = useRef(null);
  const internshipsRef = useRef(null);
  const mentorsRef = useRef(null);
  const hackathonsRef = useRef(null);
  const numbersRef = useRef(null);

  // Wait until after hydration to show the UI
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const scrollToSection = (ref) => {
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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: "candidate",
      username: "",
      email: "",
      mobile: "",
      gender: "male",
    },
  });

  // Update form values when currentUser changes
  useEffect(() => {
    if (currentUser) {
      form.reset({
        userType: currentUser.userType,
        username: currentUser.username,
        email: currentUser.email,
        mobile: currentUser.mobile,
        gender: currentUser.gender,
      });
    }
  }, [currentUser, form]);

  async function onSubmit(values) {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/users/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      // Update store with new user data
      updateUser({
        ...currentUser,
        ...data.user,
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Update failed", {
        description: error.message,
      });
    } finally {
      setIsUpdating(false);
    }
  }

  // Replace the existing internships useEffect with this:
  useEffect(() => {
    const fetchPostedInternships = async () => {
      if (!currentUser?._id) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/v1/users/${currentUser._id}/internships`
        );
        setInternships(response.data);
      } catch (error) {
        console.error("Error fetching posted internships:", error);
        toast.error("Failed to load posted internships");
      } finally {
        setLoading(false);
      }
    };

    fetchPostedInternships();
  }, [currentUser]);

  // Add this state for registered internships
  const [registeredInternships, setRegisteredInternships] = useState([]);

  // Add this useEffect to fetch registered internships
  useEffect(() => {
    const fetchRegisteredInternships = async () => {
      if (!currentUser?._id) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/v1/users/${currentUser._id}/registered-internships`
        );
        setRegisteredInternships(response.data);
      } catch (error) {
        console.error("Error fetching registered internships:", error);
        toast.error("Failed to load registered internships");
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredInternships();
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    router.push("/signin");
    toast.success("Logged out successfully!");
  };

  const handleCancel = () => {
    if (currentUser) {
      form.reset({
        userType: currentUser.userType,
        username: currentUser.username,
        email: currentUser.email,
        mobile: currentUser.mobile,
        gender: currentUser.gender,
      });
    }
    setIsEditing(false);
    toast.info("Changes discarded");
  };
  useEffect(() => {
    const fetchMentors = async () => {
      if (!currentUser?._id) return;

      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/mentors/user/${currentUser._id}`
        );
        setMentors(response.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        toast.error("Failed to load mentors");
      }
    };

    fetchMentors();
  }, [currentUser]);

  const [registeredMentorships, setRegisteredMentorships] = useState([]);

  // Fetch registered mentorships
  useEffect(() => {
    const fetchRegisteredMentorships = async () => {
      if (!currentUser?._id) return;

      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/users/${currentUser._id}/registered-mentorships`
        );
        setRegisteredMentorships(response.data);
      } catch (error) {
        console.error("Error fetching registered mentorships:", error);
        toast.error("Failed to load registered mentorships");
      }
    };

    fetchRegisteredMentorships();
  }, [currentUser]);

  const [registeredCourses, setRegisteredCourses] = useState([]);

  useEffect(() => {
    if (!currentUser?._id) return;

    axios
      .get(
        `${BASE_URL}/api/v1/users/${currentUser._id}/registered-courses`
      )
      .then((res) => {
        setRegisteredCourses(res.data); // Already populated
      })
      .catch((err) => {
        console.error("Error fetching registered courses:", err);
        toast.error("Could not load registered courses");
      });
  }, [currentUser]);

  const [postedHackathons, setPostedHackathons] = useState([]);
  const [registeredHackathons, setRegisteredHackathons] = useState([]);

  // Add these useEffect hooks to fetch hackathons data
  useEffect(() => {
    const fetchPostedHackathons = async () => {
      if (!currentUser?._id) return;

      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/users/${currentUser._id}/posted-hackathons`
        );
        setPostedHackathons(response.data);
      } catch (error) {
        console.error("Error fetching posted hackathons:", error);
        toast.error("Failed to load posted hackathons");
      }
    };

    const fetchRegisteredHackathons = async () => {
      if (!currentUser?._id) return;

      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/users/${currentUser._id}/registered-hackathons`
        );
        setRegisteredHackathons(response.data);
      } catch (error) {
        console.error("Error fetching registered hackathons:", error);
        toast.error("Failed to load registered hackathons");
      }
    };

    fetchPostedHackathons();
    fetchRegisteredHackathons();
  }, [currentUser]);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">No user logged in</h1>
        <Link href="/signin">
          <Button className="bg-green-600 hover:bg-green-700">Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24">
      {/* Logout Button - Top Right */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {(currentUser.userType === "recruiter" ||
        currentUser.userType === "admin") && (
        <>
          <h1 className="flex justify-center pt-4 text-2xl">
            Only For Recruiters
          </h1>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center py-4">
            <Link href="/profile/profile-hackathons">
              <div className="w-full mt-4 py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-center flex items-center justify-center border-transparent text-red-600 bg-white hover:bg-red-600 hover:text-white">
                View Hosted Hackathons
              </div>
            </Link>
            <Link href="/profile/profile-internships">
              <div className="w-full mt-4 py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-center flex items-center justify-center border-transparent text-white bg-red-600 hover:bg-white hover:text-red-600">
                View Posted Internships
              </div>
            </Link>
            <Link href="/profile/profile-mentorships">
              <div className="w-full mt-4 py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-center flex items-center justify-center border-transparent text-red-600 bg-white hover:bg-red-600 hover:text-white">
                View Posted Mentorships
              </div>
            </Link>
          </div>
        </>
      )}
      {currentUser.userType === "admin" && (
        <>
          <h1 className="flex justify-center pt-4 text-2xl">Only For Admins</h1>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center py-4">
            <Link href="/admin/admin-courses">
              <div className="w-full mt-4 py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-center flex items-center justify-center border-transparent text-white bg-red-600 hover:bg-white hover:text-red-600">
                View Posted Courses
              </div>
            </Link>
            <Link href="/admin/course-upload">
              <div className="w-full mt-4 py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-center flex items-center justify-center border-transparent text-red-600 bg-white hover:bg-red-600 hover:text-white">
                Post Courses
              </div>
            </Link>
          </div>
        </>
      )}

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
              {/* User Type (readonly) */}
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Account Type
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        className="border-none bg-gray-100"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

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

              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleCancel}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>

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
            <h1 className="text-2xl md:text-3xl font-bold">
              Registered Courses
            </h1>
            <p className="text-slate-400 hover:text-slate-700 transition-all duration-100">
              Learn new skills from top instructors
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-1 text-sm text-amber-600 hover:underline mt-2 sm:mt-0"
          >
            View all
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        {registeredCourses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              You haven't registered for any courses yet.
            </p>
            <Link href="/courses">
              <Button className="mt-4 bg-green-600 hover:bg-green-700">
                Browse Courses
              </Button>
            </Link>
          </div>
        )}
        {registeredCourses.length > 0 && (
          <CarouselSliderCourse courses={registeredCourses} />
        )}
      </div>

      <div ref={internshipsRef} className="mt-16 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Your Registered Internships
            </h1>
            <p className="text-slate-400 hover:text-slate-700 transition-all duration-100">
              Internships you've applied for
            </p>
          </div>
          <Link
            href="/internship"
            className="flex items-center gap-1 text-sm text-amber-600 hover:underline mt-2 sm:mt-0"
          >
            View all
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        {registeredInternships.length > 0 ? (
          <CarouselSliderIntern internships={registeredInternships} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              You haven't registered for any internships yet.
            </p>
            <Link href="/internship">
              <Button className="mt-4 bg-green-600 hover:bg-green-700">
                Browse Internships
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* // And update the posted internships section to be more specific */}
      <div className="mt-16 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Your Posted Internships
            </h1>
            <p className="text-slate-400 hover:text-slate-700 transition-all duration-100">
              Internships you've created
            </p>
          </div>
          <Link
            href="/profile/profile-internships"
            className="flex items-center gap-1 text-sm text-amber-600 hover:underline mt-2 sm:mt-0"
          >
            View all
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        {internships.length > 0 ? (
          <CarouselSliderIntern internships={internships} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              You haven't posted any internships yet.
            </p>
            <Link href="/internship/internship-publishing">
              <Button className="mt-4 bg-green-600 hover:bg-green-700">
                Post an Internship
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Posted Mentorships Section (for mentors) */}
      {(currentUser.userType === "recruiter" ||
        currentUser.userType === "admin") && (
        <div ref={mentorsRef} className="mt-16 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Your Posted Mentorships
              </h1>
              <p className="text-slate-400 hover:text-slate-700 transition-all duration-100">
                Mentorship programs you've created
              </p>
            </div>
            <Link
              href="/mentorship/mentor-publishing"
              className="flex items-center gap-1 text-sm text-amber-600 hover:underline mt-2 sm:mt-0"
            >
              Create New
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          {mentors.length > 0 ? (
            <CarouselSliderMentor mentors={mentors} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                You haven't posted any mentorships yet.
              </p>
              <Link href="/mentorship/mentor-publishing">
                <Button className="mt-4 bg-green-600 hover:bg-green-700">
                  Create a Mentorship
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Registered Mentorships Section */}
      <div className="mt-16 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Your Registered Mentorships
            </h1>
            <p className="text-slate-400 hover:text-slate-700 transition-all duration-100">
              Mentorship programs you've joined
            </p>
          </div>
          <Link
            href="/mentorship"
            className="flex items-center gap-1 text-sm text-amber-600 hover:underline mt-2 sm:mt-0"
          >
            Browse More
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        {registeredMentorships.length > 0 ? (
          <CarouselSliderMentor mentors={registeredMentorships} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              You haven't registered for any mentorships yet.
            </p>
            <Link href="/mentorship">
              <Button className="mt-4 bg-green-600 hover:bg-green-700">
                Browse Mentorships
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Posted Hackathons Section (for recruiters) */}
      {(currentUser.userType === "recruiter" ||
        currentUser.userType === "admin") && (
        <div ref={hackathonsRef} className="mt-16 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Your Posted Hackathons
              </h1>
              <p className="text-slate-400 hover:text-slate-700 transition-all duration-100">
                Hackathons you've created
              </p>
            </div>
            <Link
              href="/hackathon/hackathon-publishing"
              className="flex items-center gap-1 text-sm text-amber-600 hover:underline mt-2 sm:mt-0"
            >
              View all
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          {postedHackathons.length > 0 ? (
            <CarouselSliderHackathon hackathons={postedHackathons} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                You haven't posted any hackathons yet.
              </p>
              <Link href="/hackathon/hackathon-publishing">
                <Button className="mt-4 bg-green-600 hover:bg-green-700">
                  Create a Hackathon
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Registered Hackathons Section */}
      <div className="mt-16 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Your Registered Hackathons
            </h1>
            <p className="text-slate-400 hover:text-slate-700 transition-all duration-100">
              Hackathons you've registered for
            </p>
          </div>
          <Link
            href="/hackathon"
            className="flex items-center gap-1 text-sm text-amber-600 hover:underline mt-2 sm:mt-0"
          >
            View all
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        {registeredHackathons.length > 0 ? (
          <CarouselSliderHackathon hackathons={registeredHackathons} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              You haven't registered for any hackathons yet.
            </p>
            <Link href="/hackathon">
              <Button className="mt-4 bg-green-600 hover:bg-green-700">
                Browse Hackathons
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
