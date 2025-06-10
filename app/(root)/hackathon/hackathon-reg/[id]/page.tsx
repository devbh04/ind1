'use client';

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserStore } from "@/store/signUpStore"; // Ensure correct path to Zustand store
import { toast } from "sonner";

export default function HackathonReg() {
  const router = useRouter();
  const { currentUser } = useUserStore(); // From Zustand store
  const {id}  = useParams()

  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [type, setType] = useState("college students");
  const [institute, setInstitute] = useState("");
  const [course, setCourse] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [duration, setDuration] = useState("");
  const [country, setCountry] = useState("");
  const [agreed, setAgreed] = useState(false);


  const hackathonId = id; // Replace with actual hackathon ID

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please log in first.");
      return;
    }

    if (!agreed) {
      alert("You must agree to the terms.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/v1/hackathoncandidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: currentUser._id,
          hackathon: hackathonId,
          teamName,
          teamMembers,
          email,
          mobile,
          firstName,
          lastName,
          gender,
          type,
          institute,
          course,
          specialization,
          graduationYear,
          duration,
          country,
        }),
      });

      if (!res.ok) throw new Error("Failed to register");

      const data = await res.json();
      console.log("Registration successful:", data);
      toast.success("Registration successful!");
      setTimeout(() => {
        router.push(`/hackathon/${hackathonId}`);
      }, 1000);
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold">Candidate Details</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Team Name*</Label>
                <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
              </div>
              <div>
                <Label>Team Members*</Label>
                <Textarea value={teamMembers} onChange={(e) => setTeamMembers(e.target.value)} required />
              </div>
              <div>
                <Label>Email*</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label>Mobile*</Label>
                <Input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>First Name*</Label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div>
                <Label>Last Name*</Label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>

            <div>
              <Label>Gender*</Label>
              <div className="flex flex-wrap gap-2">
                {["Female", "Male", "Transgender", "Non-binary", "Prefer not to say"].map((g) => (
                  <Button
                    key={g}
                    type="button"
                    variant={gender === g.toLowerCase() ? "default" : "outline"}
                    onClick={() => setGender(g.toLowerCase())}
                    className="rounded-full text-xs px-3 h-8"
                  >
                    {g}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Institute Name*</Label>
              <Input value={institute} onChange={(e) => setInstitute(e.target.value)} required />
            </div>

            <div>
              <Label>Type*</Label>
              <div className="flex flex-wrap gap-2">
                {["College Students", "Professional", "Fresher", "Recruiter"].map((t) => (
                  <Button
                    key={t}
                    type="button"
                    variant={type === t.toLowerCase() ? "default" : "outline"}
                    onClick={() => setType(t.toLowerCase())}
                    className="rounded-full text-xs px-3 h-8"
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Course*</Label>
                <Select onValueChange={setCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
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
                <Label>Specialization*</Label>
                <Select onValueChange={setSpecialization}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aiml">AI & ML</SelectItem>
                    <SelectItem value="cse">Computer Science</SelectItem>
                    <SelectItem value="ece">Electronics</SelectItem>
                    <SelectItem value="mech">Mechanical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Graduation Year*</Label>
              <div className="flex flex-wrap gap-2">
                {["2024", "2025", "2026", "2027", "2028"].map((year) => (
                  <Button
                    key={year}
                    type="button"
                    variant={graduationYear === year ? "default" : "outline"}
                    onClick={() => setGraduationYear(year)}
                    className="rounded-full text-xs px-3 h-8"
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Course Duration*</Label>
              <Select onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4year">4 Years</SelectItem>
                  <SelectItem value="3year">3 Years</SelectItem>
                  <SelectItem value="2year">2 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Country*</Label>
              <Select onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="terms" checked={agreed} onCheckedChange={checked => setAgreed(checked === true)} />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                By registering, you agree to our
                <span className="text-green-600 cursor-pointer ml-1 hover:underline">Privacy Policy</span>.
              </Label>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 px-6 h-11 rounded-full">
              Save & Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
