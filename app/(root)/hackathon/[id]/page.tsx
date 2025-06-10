"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function HackathonOpp() {
  const { id } = useParams();
  const router = useRouter();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/hackathons/${id}`
        );
        const data = await response.json();
        setHackathon(data);
      } catch (error) {
        console.error("Failed to fetch hackathon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!hackathon) {
    return <div className="text-center py-8">Hackathon not found</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy, h:mm a");
  };

  return (
    <div className="mx-4 md:mx-16 lg:mx-48 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-custom-gradient text-black rounded-xl p-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {hackathon.hackathonTitle}
            </h1>
            <p className="text-slate-600 mb-1">{hackathon.organization}</p>
            <p className="text-slate-600 mb-4 capitalize">
              {hackathon.eventMode} Event
            </p>

            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <CalendarDays size={16} />
              <span>Starts on {formatDate(hackathon.startDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 mb-6">
              <CalendarDays size={16} />
              <span>Ends on {formatDate(hackathon.endDate)}</span>
            </div>

            <div className="flex gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-100"
                onClick={() => router.push(`/hackathon/hackathon-reg/${hackathon._id}`)}
              >
                Register Now
              </Button>
              <Button asChild variant="outline">
                <Link
                  href={hackathon.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Official Website
                </Link>
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Stages and Timeline</h2>
            {hackathon.stages?.map((stage, index) => (
              <Card
                key={index}
                className="mb-4 border border-slate-200 hover:border-blue-300 transition-all duration-100"
              >
                <CardContent className="p-4">
                  <p className="font-medium text-lg">{stage.title}</p>
                  <p className="text-slate-600">{stage.description}</p>
                  <p className="text-slate-600">
                    {formatDate(stage.startDate)} - {formatDate(stage.endDate)}
                  </p>
                  {stage.link && (
                    <Link
                      href={stage.link}
                      className="text-blue-600 text-sm"
                      target="_blank"
                    >
                      {stage.link}
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              All that you need to know
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: hackathon.hackathonDetails }}
            />

            {hackathon.technicalSkills?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {hackathon.technicalSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-slate-50 rounded-lg p-4 mb-8 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <p className="font-medium">Your Application Status</p>
                <p className="text-slate-500 text-sm">
                  {hackathon.registeredUsers?.length > 0
                    ? "Registered"
                    : "Not Registered Yet"}
                </p>
              </div>
              <button className="bg-green-600 rounded-lg w-fit sm:w-auto">
                <p className="p-2 text-white text-sm">Eligible</p>
              </button>
            </div>

            <div className="flex justify-between gap-2">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-500 h-12"
                onClick={() => router.push(`/hackathon/hackathon-reg/${hackathon._id}`)}
              >
                Register Now
              </Button>
            </div>

            <div className="border border-slate-300"></div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-slate-200 rounded-lg p-3 items-center flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-slate-700 text-sm sm:text-base">
                    Prize Pool
                  </p>
                  <p className="text-slate-600 text-sm sm:text-base">
                    {hackathon.prizePool}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-200 rounded-lg p-3 items-center flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-slate-700 text-sm sm:text-base">
                    Registration Deadline
                  </p>
                  <p className="text-slate-600 text-sm sm:text-base">
                    {formatDate(hackathon.registrationDeadline)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Rewards and Prizes</h2>
            <ul className="list-disc ml-6 text-slate-700 space-y-2">
              {hackathon.prizeWinner && (
                <li>Winner: {hackathon.prizeWinner}</li>
              )}
              {hackathon.prizeFirstRunnerUp && (
                <li>First Runner Up: {hackathon.prizeFirstRunnerUp}</li>
              )}
              {hackathon.prizeSecondRunnerUp && (
                <li>Second Runner Up: {hackathon.prizeSecondRunnerUp}</li>
              )}
              {hackathon.prizeParticipants && (
                <li>All Participants: {hackathon.prizeParticipants}</li>
              )}
            </ul>
          </div>

          <div className="bg-slate-100 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Contact the Organisers</h2>
            <div className="space-y-3">
              {hackathon.contactEmail && (
                <p className="text-slate-700 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  {hackathon.contactEmail}
                </p>
              )}
              {hackathon.contactPhone && (
                <p className="text-slate-700 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  {hackathon.contactPhone}
                </p>
              )}
              {(hackathon.venue || hackathon.address) && (
                <p className="text-slate-700 flex items-start gap-2">
                  <MapPin size={16} className="mt-1" />
                  {hackathon.venue && <span>{hackathon.venue}, </span>}
                  {hackathon.address}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
