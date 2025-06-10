"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Briefcase,
  Award,
  FileText,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  CalendarDays,
  User,
  GraduationCap,
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUserStore } from "@/store/signUpStore";
import { BASE_URL } from "@/utils/constants";

export default function MentorProfile() {
  const { id } = useParams(); // Assuming you're using a router that provides useParams
  // Mock data - would come from props or API in a real app
  const [mentor, setMentor] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const {currentUser} = useUserStore()

  React.useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/mentors/${id}`);
        if (!res.ok) throw new Error("Failed to fetch mentor");
        const data = await res.json();
        setMentor(data);
        console.log("Fetched mentor data:", data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Mentor not found or server error.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMentor();
  }, [id]);

  const handleRequestMentorship = async () => {
    try {
      // You'll need to get the current user's ID - this depends on your auth system
      const userId = currentUser._id; // Replace with actual user ID from your auth context

      const response = await fetch(
        `${BASE_URL}/api/v1/mentors/${id}/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();
      alert("Mentorship request sent successfully!");
      // You might want to update UI state here
    } catch (error) {
      console.error("Error requesting mentorship:", error);
      alert(error.message || "Failed to request mentorship");
    }
  };

  if (loading)
    return <div className="p-8 text-gray-600">Loading mentor profile...</div>;
  if (error || !mentor)
    return <div className="p-8 text-red-600">⚠️ {error}</div>;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const socialIcons = {
    linkedin: <Linkedin className="h-5 w-5 text-[#0077b5]" />,
    facebook: <Facebook className="h-5 w-5 text-[#4267B2]" />,
    youtube: <Youtube className="h-5 w-5 text-[#FF0000]" />,
    instagram: <Instagram className="h-5 w-5 text-[#E1306C]" />,
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/mentorship">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Mentors
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={mentor.photoUrl || "/default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {mentor.firstName} {mentor.lastName}
              </h1>
              <h2 className="text-lg sm:text-xl text-gray-700 mb-2">
                {mentor.currentRole} at {mentor.organization}
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-green-100 text-green-800 border-green-200"
                >
                  <Briefcase className="h-4 w-4 " />
                  {mentor.workExperience}+ years
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {mentor.gender}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {mentor.email}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <p className="text-sm text-gray-500">
              Member since {formatDate(mentor.joinedDate)}
            </p>
            <a href={`mailto:${mentor.email}`}>
              <Button
                className="bg-green-600 hover:bg-green-700 rounded-full px-8 py-6 text-lg"
                onClick={handleRequestMentorship}
              >
                Request Mentorship
              </Button>
            </a>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Organization</p>
              <p className="font-medium">{mentor.organization}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Availability</p>
              <p className="font-medium">{mentor.availability}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <GraduationCap className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Languages</p>
              <p className="font-medium">{mentor.languages.join(", ")}</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Headline */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Professional Headline</h3>
          <p className="text-gray-700">{mentor.headline}</p>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <div className="prose max-w-none">
            {mentor.bio.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Mentoring Approach */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Mentoring Approach</h3>
          <p className="text-gray-700">{mentor.mentoringApproach}</p>
        </div>

        {/* Areas of Expertise */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map((area, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1 bg-purple-50 text-purple-700 border-purple-200"
              >
                {area}
              </Badge>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {mentor.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Social Media */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {mentor.socialMedia &&
              (
                Object.entries(mentor.socialMedia) as [
                  keyof typeof socialIcons,
                  string
                ][]
              )
                .filter(([_, url]) => Boolean(url))
                .map(([platform, rawUrl]) => {
                  const url = rawUrl.startsWith("http")
                    ? rawUrl
                    : `https://${rawUrl}`;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {socialIcons[platform]}
                      <span className="text-sm font-medium capitalize">
                        {platform}
                      </span>
                    </a>
                  );
                })}
          </div>
        </div>

        {/* Request Button */}
        <div className="flex justify-center mt-8">
          <a href={mentor.email ? `mailto:${mentor.email}` : "#"}>
            <Button
              className="bg-green-600 hover:bg-green-700 rounded-full px-8 py-6 text-lg"
              onClick={handleRequestMentorship}
            >
              Request Mentorship
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
