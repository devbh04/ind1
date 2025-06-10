"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Briefcase,
  Award,
  FileText,
  Shield,
  BadgeDollarSign,
  Laptop2,
  Mail,
  Phone,
  MapPin,
  Clock,
  CalendarDays,
  User,
  GraduationCap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { BASE_URL } from "@/utils/constants";

export default function InternshipDetails() {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleclick = () => {
    router.push(`/internship/${internship._id}/applying-page`);
  };

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/v1/internships/${id}`
        );
        setInternship(response.data);
      } catch (error) {
        console.error("Error fetching internship:", error);
        toast.error("Failed to load internship details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInternship();
    }
  }, [id]);

  const benefitOptions = [
    {
      id: "jobOffer",
      label: "Job Offer",
      icon: <Briefcase className="h-5 w-5 text-green-600" />,
      active: internship?.benefits?.jobOffer,
    },
    {
      id: "certificate",
      label: "Certificate",
      icon: <Award className="h-5 w-5 text-green-600" />,
      active: internship?.benefits?.certificate,
    },
    {
      id: "lor",
      label: "LOR",
      icon: <FileText className="h-5 w-5 text-green-600" />,
      active: internship?.benefits?.lor,
    },
    {
      id: "insurance",
      label: "Insurance",
      icon: <Shield className="h-5 w-5 text-green-600" />,
      active: internship?.benefits?.insurance,
    },
    {
      id: "stipend",
      label: "Stipend",
      icon: <BadgeDollarSign className="h-5 w-5 text-green-600" />,
      active: internship?.benefits?.stipend,
    },
    {
      id: "equipment",
      label: "Equipment Provided",
      icon: <Laptop2 className="h-5 w-5 text-green-600" />,
      active: internship?.benefits?.equipment,
    },
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="text-center py-12">
        <h1 className="text-xl font-semibold mb-4">Internship not found</h1>
        <Link href="/internship">
          <Button variant="outline">Back to Internships</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/internship">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Internships
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-col gap-2 mb-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {internship.title}
              </h1>
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 border-green-200"
              >
                {internship.category}
              </Badge>
            </div>
            <h2 className="text-lg sm:text-xl text-gray-700">
              {internship.companyName}
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">
              Posted on {formatDate(internship.createdAt)}
            </p>
            <Button
              onClick={handleclick}
              className="bg-green-600 hover:bg-green-700 rounded-full px-6"
            >
              Apply Now
            </Button>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">
                {internship.workLocation || "Not specified"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">
                {internship.duration || "Not specified"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <CalendarDays className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{formatDate(internship.startDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <BadgeDollarSign className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Stipend</p>
              <p className="font-medium">
                {internship.minStipend || internship.maxStipend
                  ? `${internship.minStipend?.toLocaleString()} - ${internship.maxStipend?.toLocaleString()} / month`
                  : "Unpaid"}
              </p>
            </div>
          </div>
        </div>

        {/* Workplace Type and Eligibility */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            {internship.workplaceType?.charAt(0).toUpperCase() +
              internship.workplaceType?.slice(1) || "Not specified"}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {internship.eligibility === "student"
              ? "Students Only"
              : internship.eligibility === "non-student"
              ? "Non-students Only"
              : "Not specified"}
          </Badge>
          {internship.sexDiversity && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-purple-100 text-purple-800 border-purple-200"
            >
              <GraduationCap className="h-4 w-4" />
              Encourages Diversity
            </Badge>
          )}
        </div>

        <Separator className="my-6" />

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Internship Description</h3>
          <div className="prose max-w-none">
            {internship.description ? (
              internship.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))
            ) : (
              <p>No description provided</p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Skills Required</h3>
          <div className="flex flex-wrap gap-2">
            {internship.skillsRequired?.length > 0 ? (
              internship.skillsRequired.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <p>No specific skills required</p>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Benefits</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {benefitOptions.map(
              (benefit) =>
                benefit.active && (
                  <div
                    key={benefit.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    {benefit.icon}
                    <span className="text-sm font-medium">{benefit.label}</span>
                  </div>
                )
            )}
            {benefitOptions.filter((b) => b.active).length === 0 && (
              <p>No benefits specified</p>
            )}
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
                <p className="font-medium">
                  {internship.contactEmail || "Not specified"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">
                  {internship.contactPhone || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleclick}
            className="bg-green-600 hover:bg-green-700 rounded-full px-8 py-6 text-lg"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
