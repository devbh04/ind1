"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Clock,
  User,
  BookOpen,
  CalendarDays,
  Mail,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/signUpStore";
import { toast } from "sonner";
import { BASE_URL } from "@/utils/constants";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/courses/${id}`);
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();
        setCourse({
          title: data.courseTitle,
          coverPhoto: data.coverPhotoUrl,
          courseLink: data.courseLink,
          tutors: data.tutorNames,
          postedDate: data.createdAt,
          specialization: data.specialization,
          duration: data.duration,
          level: "Beginner", // Static or dynamic if needed
          startDate: data.createdAt, // Or separate field if available
          beneficialFor:
            typeof data.beneficialFor === "string"
              ? data.beneficialFor.split(",")
              : data.beneficialFor,
          description: data.courseDetails,
          learningOutcomes: [], // If not available in schema
          prerequisites: [], // If not available in schema
          contact: {
            email: data.email,
            phone: data.mobile,
          },
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course details.");
      }
    };
    if (id) fetchCourse();
  }, [id]);

  const { currentUser } = useUserStore();

  const handleEnroll = async () => {
    if (!currentUser?._id) {
      toast.error("You need to be logged in to enroll.");
      return;
    }
    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/users/${currentUser._id}/register-course`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId: id }),
        }
      );

      if (!res.ok) throw new Error("Failed to enroll");
      toast.success("Successfully enrolled!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to enroll");
    }
  };

  if (!course) return <p className="p-8">Loading...</p>;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCourseLink = (link) => {
    if (!link) return "#";
    if (link.startsWith("http://") || link.startsWith("https://")) {
      return link;
    }
    return `https://${link}`;
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/courses">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>

        {/* Cover Photo */}
        <div className="mb-8">
          <div className="w-full h-48 sm:h-64 lg:h-80 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={course.coverPhoto}
              alt="Course Cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-col gap-2 mb-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {course.title}
              </h1>
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 border-green-200"
              >
                {course.specialization}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <User className="h-4 w-4" />
              <span>Tutors: {course.tutors.join(", ")}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">
              Posted on {formatDate(course.postedDate)}
            </p>
            <Link href={formatCourseLink(course.courseLink)} passHref legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <Button
                  onClick={handleEnroll}
                  className="bg-green-600 hover:bg-green-700 rounded-full px-6"
                >
                  Enroll Now
                </Button>
              </a>
            </Link>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{course.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <BookOpen className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Level</p>
              <p className="font-medium">{course.level}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <CalendarDays className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{formatDate(course.startDate)}</p>
            </div>
          </div>
        </div>

        {/* Beneficial For */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Beneficial For</h3>
          <div className="flex flex-wrap gap-2">
            {course.beneficialFor.map((program, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200"
              >
                {program}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Course Description</h3>
          <div className="prose max-w-none">
            {course.description.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{course.contact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{course.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enroll Button */}
        <div className="flex justify-center mt-8">
          <Link href={formatCourseLink(course.courseLink)} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer">
              <Button
                onClick={handleEnroll}
                className="bg-green-600 hover:bg-green-700 rounded-full px-6"
              >
                Enroll Now
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
