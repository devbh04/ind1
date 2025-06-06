'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft } from "lucide-react";

export default function HackathonReg() {
  const [gender, setGender] = useState("male");
  const [type, setType] = useState("college students");
  const [diffAbled, setDiffAbled] = useState(false);
  const [graduationYear, setGraduationYear] = useState("");

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Candidate Details</h1>
          </div>
        </div>

        <form className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6">
            {/* Email and Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Team Name*</Label>
                <Input type="text" placeholder="Enter your Team name" className="h-10 sm:h-11" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Team members name*</Label>
                <Textarea placeholder="Enter your team members name separated by commas" className="h-10 sm:h-11" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Email*</Label>
                <Input type="email" placeholder="Enter your email" className="h-10 sm:h-11" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Mobile*</Label>
                <Input type="tel" placeholder="Enter your mobile number" className="h-10 sm:h-11" />
              </div>
            </div>

            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">First Name*</Label>
                <Input placeholder="Enter first name" className="h-10 sm:h-11" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Last Name*</Label>
                <Input placeholder="Enter last name" className="h-10 sm:h-11" />
              </div>
            </div>

            {/* Gender */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Gender*</Label>
              <div className="flex flex-wrap gap-2">
                {["Female", "Male", "Transgender", "Non-binary", "Prefer not to say"].map((g) => (
                  <Button
                    key={g}
                    type="button"
                    variant={gender === g.toLowerCase() ? "default" : "outline"}
                    className={`rounded-full px-3 sm:px-4 h-8 sm:h-9 text-xs sm:text-sm ${
                      gender === g.toLowerCase() ? 'bg-green-600 hover:bg-green-700' : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setGender(g.toLowerCase());
                    }}
                  >
                    {g}
                  </Button>
                ))}
              </div>
            </div>

            {/* Institute */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Institute Name*</Label>
              <Input placeholder="Enter your institute name" className="h-10 sm:h-11" />
            </div>

            {/* Type */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Type*</Label>
              <div className="flex flex-wrap gap-2">
                {["College Students", "Professional", "Fresher", "Recruiter"].map((t) => (
                  <Button
                    key={t}
                    type="button"
                    variant={type === t.toLowerCase() ? "default" : "outline"}
                    className={`rounded-full px-3 sm:px-4 h-8 sm:h-9 text-xs sm:text-sm ${
                      type === t.toLowerCase() ? 'bg-green-600 hover:bg-green-700' : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setType(t.toLowerCase());
                    }}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>

            {/* Course Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Course*</Label>
                <Select>
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
                <Label className="text-sm font-medium mb-2 block">Specialization*</Label>
                <Select>
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
              <Label className="text-sm font-medium mb-2 block">Graduating Year*</Label>
              <div className="flex flex-wrap gap-2">
                {["2024", "2025", "2026", "2027", "2028"].map((year) => (
                  <Button
                    key={year}
                    type="button"
                    variant={graduationYear === year ? "default" : "outline"}
                    className={`rounded-full px-3 sm:px-4 h-8 sm:h-9 text-xs sm:text-sm ${
                      graduationYear === year ? 'bg-green-600 hover:bg-green-700' : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setGraduationYear(year);
                    }}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            {/* Course Duration */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Course Duration*</Label>
              <Select>
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

            {/* Country */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Country of Residence*</Label>
              <Select>
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

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2 sm:pt-4">
              <Checkbox id="terms" className="mt-1" />
              <Label htmlFor="terms" className="text-xs sm:text-sm leading-snug text-gray-600">
                By registering for this opportunity, you agree to share the data mentioned in this form with the organizer. 
                <span className="text-green-600 hover:underline cursor-pointer"> Privacy Policy</span>
              </Label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4 sm:pt-6 border-t">
            <Button type="submit" className="h-10 sm:h-11 px-4 sm:px-8 rounded-full bg-green-600 hover:bg-green-700 w-full sm:w-auto">
              Save & Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}