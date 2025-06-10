"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserStore } from "@/store/signUpStore";

import { toast } from "sonner"; // Import toast from sonner
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/constants";

export default function ApplyPage() {
  const router = useRouter();
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("/L.avif"); // Replace with upload logic
  const [courseLink, setCourseLink] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [tutorNames, setTutorNames] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [beneficialFor, setBeneficialFor] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [duration, setDuration] = useState("");
  const [courseDetails, setCourseDetails] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);

  const { currentUser } = useUserStore();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!termsAgreed) {
      toast.error("You must agree to the terms.");
      return;
    }

    if (
      !coverPhotoUrl ||
      !courseLink ||
      !courseTitle ||
      !tutorNames ||
      !email ||
      !mobile ||
      !beneficialFor ||
      !specialization ||
      !duration ||
      !courseDetails
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/v1/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coverPhotoUrl,
          courseLink,
          courseTitle,
          tutorNames,
          email,
          mobile,
          beneficialFor,
          specialization,
          duration,
          courseDetails,
          termsAgreed,
          createdBy: currentUser?._id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Course created successfully!");
        setTimeout(() => {
          router.push(`/profile`);
        }, 1000);
        // Optionally reset the form here
      } else {
        toast.error(data.error || "Error creating course");
      }
    } catch (error) {
      toast.error("Network error");
      console.error(error);
    }
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Course Details
          </h1>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          {/* Course Cover Photo */}
          <div className="mb-10">
            <Label className="block mb-2 font-medium">
              Course Cover Photo <span className="text-red-500">*</span>
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center">
              <img
                src={coverPhotoUrl}
                alt="Course Cover Photo"
                className="w-32 h-32 object-contain mb-4"
              />
              <div className="flex justify-center my-4 md:my-6 gap-2">
                <label
                  htmlFor="profilePicture"
                  className="cursor-pointer pt-2 w-40 gap-2.5"
                >
                  Photo Link*
                </label>
                <Input
                  type="text"
                  placeholder="Photo's URL"
                  onChange={(e) => {
                    setCoverPhotoUrl(e.target.value);
                  }}
                  className="mb-4 flex items-center justify-center"
                />
              </div>
            </div>
          </div>

          {/* Course Link */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm md:text-base">
              Course Link<span className="text-green-500">*</span>
            </label>
            <div className="flex items-center gap-1">
              <div className="bg-green-50 p-2 md:p-3 h-10 md:h-13">
                <div className="flex items-center">
                  <div className="bg-green-900 text-white p-1 rounded-full mr-1 w-6 md:w-8 text-center">
                    <span className="text-xs md:text-base font-bold">un</span>
                  </div>
                </div>
              </div>
              <input
                type="text"
                name="courseLink"
                value={courseLink}
                onChange={(e) => setCourseLink(e.target.value)}
                className="flex-grow border border-gray-300 rounded-r-md p-2 md:p-3 text-sm md:text-base"
                placeholder="Course Link"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6">
            {/* Email and Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Course Title*
                </Label>
                <Input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="Enter your Course Title"
                  className="h-10 sm:h-11"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Course Tutor names*
                </Label>
                <Textarea
                  value={tutorNames}
                  onChange={(e) => setTutorNames(e.target.value)}
                  placeholder="Enter your Course Tutor names separated by commas"
                  className="h-10 sm:h-11"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Email*</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-10 sm:h-11"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Mobile*
                </Label>
                <Input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="h-10 sm:h-11"
                />
              </div>
            </div>

            {/* Course Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Beneficial for*
                </Label>
                <Select onValueChange={setBeneficialFor} value={beneficialFor}>
                  <SelectTrigger className="h-10 sm:h-11">
                    <SelectValue placeholder="Select the course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btech">B.Tech/B.E.</SelectItem>
                    <SelectItem value="bsc">B.Sc</SelectItem>
                    <SelectItem value="mtech">M.Tech</SelectItem>
                    <SelectItem value="mba">MBA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Specialization*
                </Label>
                <Select
                  onValueChange={setSpecialization}
                  value={specialization}
                >
                  <SelectTrigger className="h-10 sm:h-11">
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Arts & Design">Arts & Design</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Course Duration*
                </Label>
                <Select onValueChange={setDuration} value={duration}>
                  <SelectTrigger className="h-10 sm:h-11">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4months">4 Months</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="2months">2 Months</SelectItem>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="2weeks">2 Weeks</SelectItem>
                    <SelectItem value="1week">1 Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Course Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <label className="font-medium">
                    Course Details<span className="text-red-500">*</span>
                  </label>
                </div>
                <span className="text-sm text-green-600">
                  (Minimum Word Limit: 500)
                </span>
              </div>

              <Textarea
                value={courseDetails}
                onChange={(e) => setCourseDetails(e.target.value)}
                className="w-full p-3 border border-transparent rounded-md shadow-sm focus:outline-none focus:border-green-500"
                placeholder={
                  "Describe the course details, objectives, and any other relevant information. Please ensure the description is comprehensive and meets the minimum word limit of 500 words."
                }
              ></Textarea>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2 sm:pt-4">
              <Checkbox
                id="terms"
                checked={termsAgreed}
                onClick={() => setTermsAgreed(!termsAgreed)}
                className="mt-1"
              />
              <Label
                htmlFor="terms"
                className="text-xs sm:text-sm leading-snug text-gray-600"
              >
                By registering for this opportunity, you agree to share the data
                mentioned in this form with the organizer.
                <span className="text-green-600 hover:underline cursor-pointer">
                  {" "}
                  Privacy Policy
                </span>
              </Label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4 sm:pt-6 border-t">
            <Button
              type="submit"
              className="h-10 sm:h-11 px-4 sm:px-8 rounded-full bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            >
              Save & Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
