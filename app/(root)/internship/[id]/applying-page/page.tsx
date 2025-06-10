"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useUserStore } from "@/store/signUpStore";

export default function ApplyPage() {
  const { id } = useParams();
  console.log("Internship ID:", id);
  const router = useRouter();
  const { currentUser } = useUserStore();

  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    firstName: "",
    lastName: "",
    gender: "male",
    institute: "",
    type: "college students",
    course: "",
    specialization: "",
    graduationYear: "",
    courseDuration: "",
    diffAbled: false,
    country: "",
    resumeLink: "",
    termsAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAgreed) {
      toast.error("You must agree to the terms to apply");
      return;
    }

    try {
      const payload = {
        ...formData,
        applicant: currentUser?._id, // ✅ Add this
      };

      const { data } = await axios.post(
        `http://localhost:3001/api/v1/applications/${id}/apply`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Application submitted successfully!");
      router.push(`/internship/${id}`);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit application";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Candidate Details
            </h1>
          </div>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:gap-6">
            {/* Email and Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Email*</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 sm:h-11"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Mobile*
                </Label>
                <Input
                  name="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="h-10 sm:h-11"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  First Name*
                </Label>
                <Input
                  name="firstName"
                  placeholder="Enter first name"
                  className="h-10 sm:h-11"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Last Name*
                </Label>
                <Input
                  name="lastName"
                  placeholder="Enter last name"
                  className="h-10 sm:h-11"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Gender*</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Female",
                  "Male",
                  "Transgender",
                  "Non-binary",
                  "Prefer not to say",
                ].map((g) => (
                  <Button
                    key={g}
                    type="button"
                    variant={
                      formData.gender === g.toLowerCase()
                        ? "default"
                        : "outline"
                    }
                    className={`rounded-full px-3 sm:px-4 h-8 sm:h-9 text-xs sm:text-sm ${
                      formData.gender === g.toLowerCase()
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      handleSelectChange("gender", g.toLowerCase())
                    }
                  >
                    {g}
                  </Button>
                ))}
              </div>
            </div>

            {/* Institute */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Institute Name*
              </Label>
              <Input
                name="institute"
                placeholder="Enter your institute name"
                className="h-10 sm:h-11"
                value={formData.institute}
                onChange={handleChange}
                required
              />
            </div>

            {/* Type */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Type*</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  "College Students",
                  "Professional",
                  "Fresher",
                  "Recruiter",
                ].map((t) => (
                  <Button
                    key={t}
                    type="button"
                    variant={
                      formData.type === t.toLowerCase() ? "default" : "outline"
                    }
                    className={`rounded-full px-3 sm:px-4 h-8 sm:h-9 text-xs sm:text-sm ${
                      formData.type === t.toLowerCase()
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => handleSelectChange("type", t.toLowerCase())}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>

            {/* Course Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Course*
                </Label>
                <Select
                  value={formData.course}
                  onValueChange={(value) => handleSelectChange("course", value)}
                >
                  <SelectTrigger className="h-10 sm:h-11">
                    <SelectValue placeholder="Select your course" />
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
                  value={formData.specialization}
                  onValueChange={(value) =>
                    handleSelectChange("specialization", value)
                  }
                >
                  <SelectTrigger className="h-10 sm:h-11">
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aiml">AI & Machine Learning</SelectItem>
                    <SelectItem value="cse">Computer Science</SelectItem>
                    <SelectItem value="ece">Electronics</SelectItem>
                    <SelectItem value="mech">Mechanical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Graduation Year */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Graduating Year*
              </Label>
              <div className="flex flex-wrap gap-2">
                {["2024", "2025", "2026", "2027", "2028"].map((year) => (
                  <Button
                    key={year}
                    type="button"
                    variant={
                      formData.graduationYear === year ? "default" : "outline"
                    }
                    className={`rounded-full px-3 sm:px-4 h-8 sm:h-9 text-xs sm:text-sm ${
                      formData.graduationYear === year
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => handleSelectChange("graduationYear", year)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            {/* Course Duration */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Course Duration*
              </Label>
              <Select
                value={formData.courseDuration}
                onValueChange={(value) =>
                  handleSelectChange("courseDuration", value)
                }
              >
                <SelectTrigger className="h-10 sm:h-11">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4year">4 Years</SelectItem>
                  <SelectItem value="3year">3 Years</SelectItem>
                  <SelectItem value="2year">2 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Differently Abled */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Differently Abled*
              </Label>
              <div className="flex gap-2 sm:gap-4">
                <Button
                  type="button"
                  variant={!formData.diffAbled ? "default" : "outline"}
                  className={`rounded-full px-4 sm:px-6 h-8 sm:h-9 text-xs sm:text-sm ${
                    !formData.diffAbled
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => handleSelectChange("diffAbled", false)}
                >
                  No
                </Button>
                <Button
                  type="button"
                  variant={formData.diffAbled ? "default" : "outline"}
                  className={`rounded-full px-4 sm:px-6 h-8 sm:h-9 text-xs sm:text-sm ${
                    formData.diffAbled
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => handleSelectChange("diffAbled", true)}
                >
                  Yes
                </Button>
              </div>
            </div>

            {/* Country */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Country of Residence*
              </Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleSelectChange("country", value)}
              >
                <SelectTrigger className="h-10 sm:h-11">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">
                Resume Link*
              </Label>
              <Input
                name="resumeLink"
                type="text"
                placeholder="Provide your Resume Link"
                className="h-10 sm:h-11"
                value={formData.resumeLink}
                onChange={handleChange}
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2 sm:pt-4">
              <Checkbox
                id="terms"
                className="mt-1"
                checked={formData.termsAgreed}
                onCheckedChange={(checked) =>
                  handleSelectChange("termsAgreed", checked)
                }
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
