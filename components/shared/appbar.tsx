"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Bell, User, Search, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/utils/constants";

const AppBar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    courses: [],
    hackathons: [],
    internships: [],
    mentors: [],
  });
  const searchTimeoutRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const getSearchBarWidth = () => {
    if (windowWidth >= 1020 && windowWidth <= 1120) {
      return isSearchFocused ? "w-56" : "w-52";
    }
    return isSearchFocused ? "w-96" : "w-64";
  };

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults({
        courses: [],
        hackathons: [],
        internships: [],
        mentors: [],
      });
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/search?query=${encodeURIComponent(query)}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const renderSearchResults = () => (
    <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
      {/* Search header */}
      <div className="px-4 py-3 bg-gray-50 border-b">
        <p className="text-sm font-medium text-gray-600">
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : "Start typing to search..."}
        </p>
      </div>

      {/* Results container */}
      <div className="max-h-[400px] overflow-y-auto">
        {/* Courses results */}
        {searchResults.courses.length > 0 && (
          <div className="border-b border-gray-100 last:border-b-0">
            <div className="px-4 py-2 bg-gray-50">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Courses
              </p>
            </div>
            <ul className="divide-y divide-gray-100">
              {searchResults.courses.map((course) => (
                <li
                  key={course._id}
                  className="px-4 py-3 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSearchDialog(false);
                    router.push(`/courses/${course._id}`);
                  }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {course.courseTitle}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        By {course.tutorNames.join(", ")}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {course.specialization}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hackathons results */}
        {searchResults.hackathons.length > 0 && (
          <div className="border-b border-gray-100 last:border-b-0">
            <div className="px-4 py-2 bg-gray-50">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Hackathons
              </p>
            </div>
            <ul className="divide-y divide-gray-100">
              {searchResults.hackathons.map((hackathon) => (
                <li
                  key={hackathon._id}
                  className="px-4 py-3 hover:bg-green-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSearchDialog(false);
                    router.push(`/hackathon/${hackathon._id}`);
                  }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-green-100 flex items-center justify-center text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {hackathon.hackathonTitle}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {hackathon.city}, {hackathon.country}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {hackathon.technicalSkills.slice(0, 3).map((skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Internships results */}
        {searchResults.internships.length > 0 && (
          <div className="border-b border-gray-100 last:border-b-0">
            <div className="px-4 py-2 bg-gray-50">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Internships
              </p>
            </div>
            <ul className="divide-y divide-gray-100">
              {searchResults.internships.map((internship) => (
                <li
                  key={internship._id}
                  className="px-4 py-3 hover:bg-purple-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSearchDialog(false);
                    router.push(`/internship/${internship._id}`);
                  }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center text-purple-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {internship.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {internship.companyName} • {internship.workLocation}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {internship.skillsRequired.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mentors results */}
        {searchResults.mentors.length > 0 && (
          <div className="border-b border-gray-100 last:border-b-0">
            <div className="px-4 py-2 bg-gray-50">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Mentors
              </p>
            </div>
            <ul className="divide-y divide-gray-100">
              {searchResults.mentors.map((mentor) => (
                <li
                  key={mentor._id}
                  className="px-4 py-3 hover:bg-orange-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSearchDialog(false);
                    router.push(`/mentorship/${mentor._id}`);
                  }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 overflow-hidden">
                      {mentor.photoUrl ? (
                        <img
                          src={mentor.photoUrl}
                          alt={`${mentor.firstName} ${mentor.lastName}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium">
                          {mentor.firstName.charAt(0)}
                          {mentor.lastName.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {mentor.firstName} {mentor.lastName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {mentor.currentRole} at {mentor.organization}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {mentor.expertise.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Empty state */}
        {Object.values(searchResults).every((arr) => arr.length === 0) &&
          searchQuery && (
            <div className="px-4 py-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No results found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                We couldn't find anything matching "{searchQuery}". Try a
                different search term.
              </p>
            </div>
          )}

        {!searchQuery && (
          <div className="px-4 py-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Start searching
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Type in opportunities, mentors, courses, or hackathons to find
              what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Footer with view all results */}
      {searchQuery &&
        Object.values(searchResults).some((arr) => arr.length > 0) && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
            <button
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
              onClick={() => {
                // Handle view all results click
                router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                setSearchQuery("");
                setShowSearchDialog(false);
              }}
            >
              View all results for "{searchQuery}"
            </button>
          </div>
        )}
    </div>
  );

  return (
    <>
      <div className="p-4 bg-white flex justify-between items-center border-b shadow-xs sticky top-0 z-30">
        {/* Left section: Logo + Search bar */}
        <div className="flex items-center flex-grow space-x-4 lg:space-x-6">
          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => {
              setMobileMenuOpen(true);
              setSearchFocused(false);
            }}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <p className="text-xl text-green-900">N</p>
            <img src="/unstop-logo.png" alt="Logo" className="w-16" />
          </Link>

          {/* Search bar (visible only on lg+) */}
          <div
            className={`hidden lg:flex relative items-center border border-slate-300 rounded-full px-4 transition-all duration-300 ${getSearchBarWidth()}`}
          >
            <Search className="h-5 w-5" />
            <Input
              placeholder="Search Opportunity..."
              className="border-none shadow-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[0px] w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setIsSearchFocused(true);
                setShowSearchDialog(true);
              }}
              onBlur={() =>
                setTimeout(() => {
                  setIsSearchFocused(false);
                  setShowSearchDialog(false);
                }, 200)
              }
            />

            {/* Search dropdown dialog */}
            {showSearchDialog && renderSearchResults()}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Nav links (lg+) */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link
              href="/internship"
              className="text-black hover:bg-slate-50 hover:border border border-white hover:border-slate-200 p-2 rounded-full"
            >
              Internships
            </Link>
            <Link
              href="/courses"
              className="text-black hover:bg-slate-50 hover:border border border-white hover:border-slate-200 p-2 rounded-full"
            >
              Courses
            </Link>
            <Link
              href="/hackathon"
              className="text-black hover:bg-slate-50 hover:border border border-white hover:border-slate-200 p-2 rounded-full"
            >
              Hackathons
            </Link>
            <Link
              href="/mentorship"
              className="text-black hover:bg-slate-50 hover:border border border-white hover:border-slate-200 p-2 rounded-full"
            >
              Mentorships
            </Link>
            <div className="border-solid border-l border-slate-300 h-10"></div>
          </div>

          {/* Icons */}
          <Link href={"/profile"}>
            <User className="h-6 w-6 lg:h-8 lg:w-8" />
          </Link>

          {/* Mobile search icon */}
          <div className="lg:hidden">
            <Search
              className="h-5 w-5"
              onClick={() => setSearchFocused(true)}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu and sliding panel */}
      <div className={`fixed inset-0 z-40 lg:hidden pointer-events-none`}>
        {/* Backdrop overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-20 pointer-events-auto" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Slide-in mobile menu */}
        <div
          className={`
          absolute top-0 left-0 h-full w-64 bg-white shadow-lg z-50 
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          pointer-events-auto
        `}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <p className="text-xl text-green-900">N</p>
              <img src="/unstop-logo.svg" alt="Logo" className="w-16" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            <Link
              href="/internship"
              className="text-black hover:bg-slate-50 p-3 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Internships
            </Link>
            <Link
              href="/courses"
              className="text-black hover:bg-slate-50 p-3 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/hackathon"
              className="text-black hover:bg-slate-50 p-3 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hackathons
            </Link>
            <Link
              href="/mentorship"
              className="text-black hover:bg-slate-50 p-3 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mentorships
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchFocused && (
        <div className="fixed top-16 left-0 right-0 z-50 lg:hidden bg-transparent px-4">
          <div className="flex items-center w-full bg-white rounded-full shadow-md border border-slate-300 px-4 py-2">
            <Search className="h-5 w-5 mr-2" />
            <Input
              placeholder="Search Opportunity..."
              className="border-none shadow-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[0px] w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              onFocus={() => setShowSearchDialog(true)}
              onBlur={() =>
                setTimeout(() => {
                  setSearchFocused(false);
                  setShowSearchDialog(false);
                }, 200)
              }
            />
            <X
              className="h-6 w-6 mx-2 text-gray-500"
              onClick={() => {
                setSearchFocused(false);
                setShowSearchDialog(false);
              }}
            />
          </div>

          {/* Suggestions dropdown below mobile search */}
          {showSearchDialog && renderSearchResults()}
        </div>
      )}
    </>
  );
};

export default AppBar;
