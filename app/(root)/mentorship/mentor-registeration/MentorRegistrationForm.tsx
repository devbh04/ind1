"use client";
import React, { useState } from "react";
import { UserCircle, ArrowLeft, Camera, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUserStore } from "@/store/signUpStore";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/constants";

const MentorRegistrationForm = () => {
  const router = useRouter();
  const {currentUser} = useUserStore();
  const [url, setURL] = useState(
    "https://cdn.unstop.com/uploads/images/unstop/avatar_mentor.svg"
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    organization: "",
    currentRole: "",
    workExperience: "",
    headline: "",
    bio: "",
    languages: "",
    availability: "",
    expertise: "",
    skills: "",
    linkedin: "",
    facebook: "",
    youtube: "",
    instagram: "",
    mentoringApproach: "",
  });

  const handleSubmit = async () => {
    const processedData = {
      ...formData,
      languages: formData.languages
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item),
      expertise: formData.expertise
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item),
      skills: formData.skills
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item),
    };

    const data = {
      userId: currentUser._id,
      photoUrl: url,
      firstName: processedData.firstName,
      lastName: processedData.lastName,
      email: processedData.email,
      gender: processedData.gender,
      organization: processedData.organization,
      currentRole: processedData.currentRole,
      workExperience: Number(processedData.workExperience),
      headline: processedData.headline,
      bio: processedData.bio,
      languages: processedData.languages,
      availability: processedData.availability,
      expertise: processedData.expertise,
      skills: processedData.skills,
      socialMedia: {
        linkedin: processedData.linkedin,
        facebook: processedData.facebook,
        youtube: processedData.youtube,
        instagram: processedData.instagram,
      },
      mentoringApproach: processedData.mentoringApproach,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/v1/mentors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data)

      if (res.ok) {
        toast.success("Mentor registered successfully!");
        setTimeout(() => {
          router.push('/profile');
        }, 1000);
      } else {
        const err = await res.json();
        toast.error("Error: " + err.error);
      }
    } catch (error) {
      toast.error("Submission failed. Please try again.");
      console.error("Failed to register:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="rounded-lg shadow-sm p-4 md:p-6 mb-6 border border-yellow-100">
        <div className="bg-amber-100 p-4 md:p-7 pb-1 mb-4 md:mb-7 border border-amber-500 rounded-xl w-full">
          <h1 className="text-xl md:text-2xl font-semibold text-green-900 mb-4 md:mb-6">
            Become a Mentor!
          </h1>
          <h2 className="text-base md:text-lg font-medium text-green-900 mb-2 md:mb-4">
            Enter your details
          </h2>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="relative">
            <div className="w-20 h-20 md:w-30 md:h-30 bg-gray-100 rounded-full flex items-center justify-center">
              <img className="w-10 md:w-20" src={url} alt="Profile" />
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-4 md:mb-6 gap-2">
          <label
            htmlFor="profilePicture"
            className="cursor-pointer pt-2 w-40 gap-2.5"
          >
            Photo Link*
          </label>
          <Input
            type="url"
            placeholder="Photo's URL"
            onChange={(e) => {
              setURL(e.target.value);
            }}
            className="mb-4 flex items-center justify-center"
          />
        </div>

        {/* Name Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2 text-sm md:text-base">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
              }}
              className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-sm md:text-base">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
              }}
              className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
              placeholder="Last Name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Email<span className="text-green-500">*</span>
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
              name="email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              className="flex-grow border border-gray-300 rounded-r-md p-2 md:p-3 text-sm md:text-base"
              placeholder="Email"
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Gender<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {[
              {
                label: "Male",
                icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/form-step/Male.svg",
              },
              {
                label: "Female",
                icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/form-step/Female.svg",
              },
              {
                label: "Transgender",
                icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/form-step/Transgender.svg",
              },
              {
                label: "Intersex",
                icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/form-step/Intersex.svg",
              },
              {
                label: "Non-binary",
                icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/form-step/Non-binary.svg",
              },
              {
                label: "Others",
                icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/form-step/Others.svg",
              },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                aria-pressed={formData.gender === option.label}
                onClick={() =>
                  setFormData({ ...formData, gender: option.label })
                }
                className={`flex items-center gap-2 md:gap-5 border p-2 md:p-5 rounded-xl text-xs md:text-sm transition-all duration-200 ${
                  formData.gender === option.label
                    ? "border-green-600 bg-green-50 font-semibold"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <img
                  className="h-4 md:h-6"
                  src={option.icon}
                  alt={option.label}
                />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Organization */}
        <div className="mt-4 mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Current Organisation/Institute
            <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <input
              type="text"
              name="organization"
              onChange={(e) => {
                setFormData({ ...formData, organization: e.target.value });
              }}
              className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
              placeholder="Current Organization"
            />
          </div>
        </div>

        {/* Current Role */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Current Role<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="currentRole"
            onChange={(e) => {
              setFormData({ ...formData, currentRole: e.target.value });
            }}
            className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
            placeholder="Current Role"
          />
        </div>

        {/* Work Experience */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Work Experience (years)<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="workExperience"
            onChange={(e) => {
              setFormData({
                ...formData,
                workExperience: e.target.value,
              });
            }}
            className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
            placeholder="Total years of work experience"
          />
        </div>

        {/* Headline */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Professional Headline<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="headline"
            onChange={(e) => {
              setFormData({ ...formData, headline: e.target.value });
            }}
            className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
            placeholder="Example: Tech Innovators Inc. | Senior Software Engineer | Mentor | Open Source Contributor"
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Bio/About you<span className="text-red-500">*</span>
          </label>
          <textarea
            name="bio"
            className="resize-none w-full p-2 h-32 md:h-40 mb-4 outline-none border border-green-200 rounded-sm text-sm md:text-base"
            onChange={(e) => {
              setFormData({ ...formData, bio: e.target.value });
            }}
            placeholder="Tell us about yourself, your experience, and why you want to mentor..."
          ></textarea>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Availability<span className="text-red-500">*</span>
          </label>
          <textarea
            name="availability"
            className="resize-none w-full p-2 h-20 mb-4 outline-none border border-green-200 rounded-sm text-sm md:text-base"
            onChange={(e) => {
              setFormData({ ...formData, availability: e.target.value });
            }}
            placeholder="Example: Flexible (Weekdays after 6pm, Weekends)"
          ></textarea>
        </div>

        {/* Areas of Expertise */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Areas of Expertise (comma separated)
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="expertise"
            onChange={(e) => {
              setFormData({ ...formData, expertise: e.target.value });
            }}
            className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
            placeholder="Example: Frontend Development, Backend Development, System Design"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate multiple expertise areas with commas
          </p>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Skills (comma separated)<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="skills"
            onChange={(e) => {
              setFormData({ ...formData, skills: e.target.value });
            }}
            className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
            placeholder="Example: JavaScript, React, Node.js, TypeScript, Mentoring"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate multiple skills with commas
          </p>
        </div>

        {/* Mentoring Approach */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Mentoring Approach<span className="text-red-500">*</span>
          </label>
          <textarea
            name="mentoringApproach"
            className="resize-none w-full p-2 h-32 mb-4 outline-none border border-green-200 rounded-sm text-sm md:text-base"
            onChange={(e) => {
              setFormData({ ...formData, mentoringApproach: e.target.value });
            }}
            placeholder="Describe your mentoring style and approach..."
          ></textarea>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Languages you're fluent in (comma separated)
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="languages"
            onChange={(e) => {
              setFormData({ ...formData, languages: e.target.value });
            }}
            className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
            placeholder="Example: English, Spanish, French"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate multiple languages with commas
          </p>
        </div>

        {/* Social Media */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Social Media Handles
          </label>
          {[
            {
              name: "linkedin",
              placeholder: "https://linkedin.com/in/yourprofile",
              icon: "/linkedin.png",
            },
            {
              name: "facebook",
              placeholder: "https://facebook.com/yourprofile",
              icon: "/facebook.png",
            },
            {
              name: "youtube",
              placeholder: "https://youtube.com/yourchannel",
              icon: "/youtube.png",
            },
            {
              name: "instagram",
              placeholder: "https://instagram.com/yourprofile",
              icon: "/instagram.png",
            },
          ].map((social) => (
            <div key={social.name} className="mb-3">
              <div className="flex items-center border border-gray-200 rounded-md">
                <div className="p-1 md:p-2 rounded mr-2 ml-3">
                  <img
                    className="h-4 md:h-5"
                    src={social.icon}
                    alt={social.name}
                  />
                </div>
                <input
                  type="text"
                  name={`socialMedia.${social.name}`}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [social.name]: e.target.value,
                    });
                  }}
                  className="w-full rounded-md p-2 md:p-3 border border-transparent focus:outline-none text-sm md:text-base"
                  placeholder={social.placeholder}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse md:flex-row justify-between gap-3 mt-6 mb-10 md:mb-20">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white rounded-md text-sm md:text-base hover:bg-green-700 transition-colors"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
};

export default MentorRegistrationForm;
