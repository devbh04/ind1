"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";

export default function HackathonParticipantsPage() {
  const { id } = useParams(); // Read ID from URL
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/hackathons/participants/${id}`
        );
        const data = response.data;
        setTeams(data);
        console.log("Fetched participants:", data);
      } catch (err) {
        console.error("Failed to fetch participants", err);
      }
    };

    if (id) fetchParticipants();
  }, [id]);

  const filteredTeams = teams.filter((team) => {
    const text = searchTerm.toLowerCase();
    return (
      team.teamName?.toLowerCase().includes(text) ||
      team.institute?.toLowerCase().includes(text) ||
      team.course?.toLowerCase().includes(text) ||
      team.specialization?.toLowerCase().includes(text) ||
      team.country?.toLowerCase().includes(text)
    );
  });

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Registered Teams
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              List of participants registered for this hackathon
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search teams..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Team Info</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Education</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeams.length > 0 ? (
                filteredTeams.map((team, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <div className="font-semibold">{team.teamName}</div>
                      <div className="text-sm text-gray-500">
                        Members: {team.teamMembers?.join(", ")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{team.user?.email || "N/A"}</span>
                        <span className="text-sm text-gray-500">
                          {team.user?.mobile || "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{team.institute}</span>
                        <span className="text-sm text-gray-500">
                          {team.course} ({team.specialization})
                        </span>
                        <span className="text-sm">
                          Graduation: {team.graduationYear} • {team.duration}
                        </span>
                        <span className="text-sm">Country: {team.country}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <a
                        href={`mailto:${team.user?.email}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        <Button variant="outline" size="sm">
                          Email
                        </Button>
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No teams found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
