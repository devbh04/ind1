"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  GlobeAltIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  ChevronLeftIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowLeft,
  BadgeDollarSign,
  Contrast,
  ContrastIcon,
  DollarSign,
  IdCard,
  IdCardIcon,
  LetterText,
  Mail,
  Phone,
  Trophy,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useUserStore } from "@/store/signUpStore";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/constants";

const HostHackathon = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    logo: " ",
    visibilityOption: "public",
    eventMode: "online",
    startDate: undefined,
    endDate: undefined,
    registrationDeadline: undefined,
    stages: [
      {
        title: "",
        description: "",
        startDate: undefined,
        endDate: undefined,
        link: "",
      },
    ],
    contactEmail: "",
    contactPhone: "",
    address: "",
    prizeWinner: "",
    prizeFirstRunnerUp: "",
    prizeSecondRunnerUp: "",
    prizeParticipants: "",
    hackathonType: "",
    hackathonTitle: "",
    prizePool: "",
    organization:
      "Vishwakarma Institute Of Information Technology (VIIT), Pune, Maharashtra",
    websiteUrl: "",
    country: "",
    state: "",
    city: "",
    venue: "",
    technicalSkills: "",
    hackathonDetails: "",
  });

  const handleStageCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    const currentCount = formData.stages.length;

    if (count > currentCount) {
      const newStages = [...formData.stages];
      for (let i = currentCount; i < count; i++) {
        newStages.push({
          title: "",
          description: "",
          startDate: undefined,
          endDate: undefined,
          link: "",
        });
      }
      setFormData({ ...formData, stages: newStages });
    } else if (count < currentCount) {
      setFormData({ ...formData, stages: formData.stages.slice(0, count) });
    }
  };

  const updateStage = (index, field, value) => {
    const updatedStages = [...formData.stages];
    updatedStages[index] = {
      ...updatedStages[index],
      [field]: value,
    };
    setFormData({ ...formData, stages: updatedStages });
  };

  const removeStage = (index) => {
    if (formData.stages.length <= 1) return;
    const updatedStages = formData.stages.filter((_, i) => i !== index);
    setFormData({ ...formData, stages: updatedStages });
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const { currentUser } = useUserStore();

  const handleSubmit = async (fD) => {
    console.log("Response:", fD);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/hackathons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...fD,
          createdBy: currentUser._id, // from zustand or auth
        }),
      });

      if (!res.ok) throw new Error("Hackathon creation failed");
      const data = await res.json();
      console.log("Hackathon created:", data);
      toast.success("Hackathon created successfully!");
      setTimeout(() => {
        router.push(`/profile`);
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Error creating hackathon");
    }
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Host a Hackathon | Unstop</title>
        <meta name="description" content="Create a new hackathon on Unstop" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl font-semibold text-green-800 mb-8">
            Hackathon Details
          </h1>

          {/* Hackathon logo */}
          <div className="mb-10">
            <label className="block mb-2 font-medium">
              Hackathon Logo <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center">
              <img
                src={formData.logo}
                alt="Hackathon Logo"
                className="w-32 h-32 object-contain mb-4"
              />
            </div>
            <div className="flex justify-center my-4 md:my-6 gap-2">
              <label
                htmlFor="profilePicture"
                className="cursor-pointer pt-2 w-40 gap-2.5"
              >
                Photo Link*
              </label>
              <Input
                type="url"
                placeholder="Photo's URL"
                value={formData.logo}
                onChange={(e) => handleInputChange("logo", e.target.value)}
                className="mb-4 flex items-center justify-center"
              />
            </div>
          </div>

          {/* Date Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {/* Start Date */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Start Date*
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-10 sm:h-11",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? (
                      format(formData.startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => handleInputChange("startDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                End Date*
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-10 sm:h-11",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? (
                      format(formData.endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => handleInputChange("endDate", date)}
                    initialFocus
                    fromDate={formData.startDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Registration Deadline */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Registration Deadline*
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-10 sm:h-11",
                      !formData.registrationDeadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.registrationDeadline ? (
                      format(formData.registrationDeadline, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.registrationDeadline}
                    onSelect={(date) =>
                      handleInputChange("registrationDeadline", date)
                    }
                    initialFocus
                    toDate={formData.startDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mb-10">
            <h3 className="text-sm font-medium">Contact Information*</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Contact Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="contact@company.com"
                    value={formData.contactEmail}
                    onChange={(e) =>
                      handleInputChange("contactEmail", e.target.value)
                    }
                    className="h-10 sm:h-11 pl-10"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Contact Phone
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      handleInputChange("contactPhone", e.target.value)
                    }
                    className="h-10 sm:h-11 pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <Label className="text-sm font-medium mb-2 block">Address</Label>
              <div className="relative">
                <Textarea
                  placeholder="123 Main St, City, State, Zip Code"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="h-10 sm:h-11"
                />
              </div>
            </div>
          </div>

          {/* Prize Information */}
          <div className="space-y-4 mb-10">
            <h3 className="text-sm font-medium">Prize Pool Information*</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Winner</Label>
                <div className="relative">
                  <Trophy className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="Rs. 50,000"
                    value={formData.prizeWinner}
                    onChange={(e) =>
                      handleInputChange("prizeWinner", e.target.value)
                    }
                    className="h-10 sm:h-11 pl-10"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  1st Runner-up
                </Label>
                <div className="relative">
                  <BadgeDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="Rs. 30,000"
                    value={formData.prizeFirstRunnerUp}
                    onChange={(e) =>
                      handleInputChange("prizeFirstRunnerUp", e.target.value)
                    }
                    className="h-10 sm:h-11 pl-10"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  2nd Runner-up
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="Rs. 20,000"
                    value={formData.prizeSecondRunnerUp}
                    onChange={(e) =>
                      handleInputChange("prizeSecondRunnerUp", e.target.value)
                    }
                    className="h-10 sm:h-11 pl-10"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Participants
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Reward"
                    value={formData.prizeParticipants}
                    onChange={(e) =>
                      handleInputChange("prizeParticipants", e.target.value)
                    }
                    className="h-10 sm:h-11 pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hackathon Type */}
          <div className="mb-10">
            <label className="block mb-2 font-medium">
              Hackathon Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none appearance-none pl-3 pr-10 py-4"
                value={formData.hackathonType}
                onChange={(e) =>
                  handleInputChange("hackathonType", e.target.value)
                }
              >
                <option value="" disabled>
                  Select Hackathon type
                </option>
                <option value="allcategories">All Categories</option>
                <option value="coding">Coding Hackathon</option>
                <option value="innovation">Innovation Challenge</option>
                <option value="ai_ml">AI/ML Hackathon</option>
                <option value="blockchain">Blockchain Hackathon</option>
                <option value="cybersecurity">Cybersecurity Hackathon</option>
                <option value="data_science">Data Science Hackathon</option>
                <option value="iot">IoT Hackathon</option>
                <option value="game_dev">Game Development Hackathon</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hackathon Title */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="font-medium">
                Hackathon Title<span className="text-red-500">*</span>
              </label>
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 ml-1" />
            </div>
            <input
              type="text"
              placeholder="Enter Hackathon Title"
              value={formData.hackathonTitle}
              onChange={(e) =>
                handleInputChange("hackathonTitle", e.target.value)
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 focus:outline-none"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              (max 190 characters)
            </div>
          </div>

          {/* Hackathon Prize pool */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="font-medium">
                Hackathon Prize Pool<span className="text-red-500">*</span>
              </label>
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 ml-1" />
            </div>
            <input
              type="number"
              placeholder="Enter Prize Pool Amount"
              value={formData.prizePool}
              onChange={(e) => handleInputChange("prizePool", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 focus:outline-none"
            />
          </div>

          {/* Organization */}
          <div className="mb-10">
            <div className="flex items-center mb-2">
              <label className="font-medium">
                Organizer<span className="text-red-500">*</span>
              </label>
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 ml-1" />
            </div>
            <input
              type="text"
              placeholder="Enter Organization Name"
              value={formData.organization}
              onChange={(e) =>
                handleInputChange("organization", e.target.value)
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 focus:outline-none"
            />
          </div>

          {/* Website URL */}
          <div className="mb-10">
            <label className="block mb-1 font-medium">Website URL</label>
            <p className="text-sm text-green-900 mb-2">
              The URL can be your organization's website or hackathon website.
            </p>
            <div className="flex rounded-md shadow-sm border-gray-300 focus:border-green-500 focus:ring-green-500 p-3">
              <span className="text-green-600">https://</span>
              <input
                type="text"
                value={formData.websiteUrl.replace("https://", "")}
                onChange={(e) =>
                  handleInputChange("websiteUrl", `https://${e.target.value}`)
                }
                className="flex-1 min-w-0 block w-full rounded-none rounded-r-md focus:outline-none"
              />
            </div>
          </div>

          {/* Mode of Event */}
          <div className="mb-10">
            <div className="flex items-center mb-2">
              <label className="font-medium">
                Mode of Hackathon<span className="text-red-500">*</span>
              </label>
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 ml-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`border rounded-lg p-8 flex items-start cursor-pointer ${
                  formData.eventMode === "online"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300"
                }`}
                onClick={() => handleInputChange("eventMode", "online")}
              >
                <GlobeAltIcon className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Online Hackathon</h3>
                </div>
              </div>
              <div
                className={`border rounded-lg p-8 flex items-start cursor-pointer ${
                  formData.eventMode === "offline"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300"
                }`}
                onClick={() => handleInputChange("eventMode", "offline")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium">In-Person Hackathon</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Address - Only shown if offline */}
          {formData.eventMode === "offline" && (
            <div className="mb-10">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="text-gray-500">
                    Country<span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className="border border-gray-200 p-3 rounded-md focus:border-green-200 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-500">
                    State<span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="border border-gray-200 p-3 rounded-md focus:border-green-200 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-500">
                    City<span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="border border-gray-200 p-3 rounded-md focus:border-green-200 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-500">
                    Venue<span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => handleInputChange("venue", e.target.value)}
                    className="border border-gray-200 p-3 rounded-md focus:border-green-200 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Skills to be Assessed */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="font-medium">Technical Skills Required</label>
              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-md">
                Beta
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              List required technical skills to attract participants with
              matching abilities.
            </p>
            <input
              type="text"
              placeholder="Search Technical Skills (e.g., React, Python, Solidity)"
              value={formData.technicalSkills}
              onChange={(e) =>
                handleInputChange("technicalSkills", e.target.value)
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 focus:outline-none"
            />
          </div>

          {/* Hackathon Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <label className="font-medium">
                  Hackathon Details<span className="text-red-500">*</span>
                </label>
              </div>
              <span className="text-sm text-green-600">
                (Minimum Word Limit: 500)
              </span>
            </div>

            <textarea
              className="w-full p-3 h-80 border border-transparent rounded-md shadow-sm focus:outline-none focus:border-green-500 resize-none"
              placeholder="Describe your hackathon in detail..."
              value={formData.hackathonDetails}
              onChange={(e) =>
                handleInputChange("hackathonDetails", e.target.value)
              }
            ></textarea>
          </div>

          {/* Stages and Timeline Section */}
          <div className="mb-10 mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Hackathon Stages & Timeline
              </h2>
            </div>

            <div className="mb-6">
              <Label className="block mb-2 font-medium">
                Number of Stages <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                min="1"
                value={formData.stages.length}
                onChange={handleStageCountChange}
                className="w-24"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter how many stages your hackathon will have
              </p>
            </div>

            {formData.stages.map((stage, index) => (
              <div key={index} className="border rounded-lg p-6 mb-6 relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Stage {index + 1}</h3>
                  {formData.stages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStage(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="block mb-2 font-medium">
                      Stage Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g., Registration, Submission, Judging"
                      value={stage.title}
                      onChange={(e) =>
                        updateStage(index, "title", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label className="block mb-2 font-medium">
                      Stage Link/URL
                    </Label>
                    <Input
                      type="url"
                      placeholder="e.g., Google Form link for submission"
                      value={stage.link}
                      onChange={(e) =>
                        updateStage(index, "link", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Label className="block mb-2 font-medium">
                    Stage Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    placeholder="Describe what happens in this stage, any requirements, etc."
                    value={stage.description}
                    onChange={(e) =>
                      updateStage(index, "description", e.target.value)
                    }
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Start Date*
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal h-10 sm:h-11",
                            !stage.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {stage.startDate ? (
                            format(stage.startDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={stage.startDate}
                          onSelect={(date) =>
                            updateStage(index, "startDate", date)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      End Date*
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal h-10 sm:h-11",
                            !stage.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {stage.endDate ? (
                            format(stage.endDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={stage.endDate}
                          onSelect={(date) =>
                            updateStage(index, "endDate", date)
                          }
                          initialFocus
                          fromDate={stage.startDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            ))}

            {/* Preview of stages timeline */}
            {formData.stages.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Timeline Preview</h3>
                <div className="space-y-4">
                  {formData.stages.map((stage, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-green-500 pl-4 py-2 relative"
                    >
                      <div className="absolute -left-2 top-3 h-4 w-4 rounded-full bg-green-500"></div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="font-medium">
                          {stage.title || `Stage ${index + 1}`}
                        </h4>
                        <div className="text-sm text-gray-500">
                          {stage.startDate && stage.endDate
                            ? `${format(stage.startDate, "MMM d")} - ${format(
                                stage.endDate,
                                "MMM d, yyyy"
                              )}`
                            : "Dates not set"}
                        </div>
                      </div>
                      {stage.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {stage.description}
                        </p>
                      )}
                      {stage.link && (
                        <a
                          href={stage.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green-600 hover:underline mt-1 block"
                        >
                          Stage Link
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-between mt-6 mb-4">
            <button
              className="px-6 w-40 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              onClick={() => {
                handleSubmit(formData);
              }}
            >
              Submit Hackathon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostHackathon;
