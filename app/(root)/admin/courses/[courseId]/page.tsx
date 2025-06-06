"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

const CourseDetailsPage = ({ params }: { params: { courseId: string } }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data as fallback
  const mockUsers = [
    {
      id: "1",
      userType: "candidate",
      username: "john_doe",
      email: "john.doe@example.com",
      mobile: "9876543210",
      gender: "male",
      registrationDate: "2023-05-15",
    },
    {
      id: "2",
      userType: "candidate",
      username: "jane_smith",
      email: "jane.smith@example.com",
      mobile: "8765432109",
      gender: "female",
      registrationDate: "2023-05-16",
    },
    {
      id: "3",
      userType: "recruiter",
      username: "tech_corp",
      email: "hr@techcorp.com",
      mobile: "7654321098",
      gender: "other",
      registrationDate: "2023-05-17",
    },
    {
      id: "4",
      userType: "candidate",
      username: "alex_wong",
      email: "alex.wong@example.com",
      mobile: "6543210987",
      gender: "male",
      registrationDate: "2023-05-18",
    },
    {
      id: "5",
      userType: "candidate",
      username: "sarah_connor",
      email: "sarah.connor@example.com",
      mobile: "5432109876",
      gender: "female",
      registrationDate: "2023-05-19",
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // First try to fetch from localhost
        const response = await fetch('http://localhost:3000/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          setFilteredUsers(data);
        } else {
          // If localhost fails, use mock data
          console.log('Using mock data as fallback');
          setUsers(mockUsers);
          setFilteredUsers(mockUsers);
        }
      } catch (error) {
        console.error('Error fetching from localhost, using mock data:', error);
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.mobile.includes(searchTerm)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Registered Candidates for Course #{params["course-id"]}
        </h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search users..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8">
          <p>No users found matching your search.</p>
        </div>
      ) : (
        <Table>
          <TableCaption>A list of registered candidates for this Course.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell className="capitalize">{user.gender}</TableCell>
                <TableCell className="capitalize">{user.userType}</TableCell>
                <TableCell>{user.registrationDate}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${user.email}`}>Send Email</a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CourseDetailsPage;