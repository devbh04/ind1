'use client';
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Briefcase, Award, FileText, MessageSquare, Mail, Phone, MapPin, Clock, CalendarDays, User, GraduationCap, Linkedin, Youtube, Instagram, Facebook } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

export default function MentorProfile() {
  // Mock data - would come from props or API in a real app
  const mentor = {
    id: 'mentor123',
    firstName: 'Alex',
    lastName: 'Johnson',
    profileLink: 'alex-johnson',
    gender: 'Male',
    organization: 'Tech Innovators Inc.',
    industry: 'Technology',
    currentRole: 'Senior Software Engineer',
    workExperience: 8,
    headline: 'Tech Innovators Inc. | Senior Software Engineer | Mentor | Open Source Contributor',
    bio: `I'm a passionate software engineer with 8 years of experience in building scalable web applications. I specialize in JavaScript, React, and Node.js ecosystems. 

As a mentor, I focus on helping early-career professionals navigate the tech industry, improve their technical skills, and build confidence in their abilities. 

I've mentored over 50 individuals through various programs, with many going on to secure positions at top tech companies. My approach is hands-on and tailored to each mentee's unique needs and goals.

When I'm not coding or mentoring, you can find me contributing to open source projects or hiking in the mountains.`,
    languages: ['English', 'Spanish'],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/alex-johnson',
      facebook: 'https://facebook.com/alex.johnson',
      youtube: 'https://youtube.com/alexjohnsontech',
      instagram: 'https://instagram.com/alexjohnsontech'
    },
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Mentoring', 'Career Coaching', 'Technical Interviews'],
    availability: 'Flexible (Weekdays after 6pm, Weekends)',
    mentoringApproach: 'I believe in a practical, project-based approach to mentoring. We\'ll work on real-world problems and build your portfolio while developing your skills.',
    areasOfExpertise: ['Frontend Development', 'Backend Development', 'System Design', 'Technical Interview Prep', 'Career Growth'],
    joinedDate: '2022-05-15'
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const socialIcons = {
    linkedin: <Linkedin className="h-5 w-5 text-[#0077b5]" />,
    facebook: <Facebook className="h-5 w-5 text-[#4267B2]" />,
    youtube: <Youtube className="h-5 w-5 text-[#FF0000]" />,
    instagram: <Instagram className="h-5 w-5 text-[#E1306C]" />
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/mentorship">
            <Button variant="ghost" className="flex items-center gap-2 text-green-600 hover:text-green-700">
              <ChevronLeft className="h-4 w-4" />
              Back to Mentors
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="https://cdn.unstop.com/uploads/images/unstop/avatar_mentor.svg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full">
                <MessageSquare className="h-4 w-4" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{mentor.firstName} {mentor.lastName}</h1>
              <h2 className="text-lg sm:text-xl text-gray-700 mb-2">{mentor.currentRole} at {mentor.organization}</h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  {mentor.industry}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {mentor.gender}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {mentor.workExperience}+ years
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <p className="text-sm text-gray-500">Member since {formatDate(mentor.joinedDate)}</p>
            <Button className="bg-green-600 hover:bg-green-700 rounded-full px-6">
              Request Mentorship
            </Button>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Organization</p>
              <p className="font-medium">{mentor.organization}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Availability</p>
              <p className="font-medium">{mentor.availability}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <GraduationCap className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Languages</p>
              <p className="font-medium">{mentor.languages.join(', ')}</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Headline */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Professional Headline</h3>
          <p className="text-gray-700">{mentor.headline}</p>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <div className="prose max-w-none">
            {mentor.bio.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Mentoring Approach */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Mentoring Approach</h3>
          <p className="text-gray-700">{mentor.mentoringApproach}</p>
        </div>

        {/* Areas of Expertise */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {mentor.areasOfExpertise.map((area, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1 bg-purple-50 text-purple-700 border-purple-200">
                {area}
              </Badge>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {mentor.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Social Media */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(mentor.socialMedia).map(([platform, url]) => (
              url && (
                <a 
                  key={platform} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {socialIcons[platform as keyof typeof socialIcons]}
                  <span className="text-sm font-medium capitalize">{platform}</span>
                </a>
              )
            ))}
          </div>
        </div>

        {/* Request Button */}
        <div className="flex justify-center mt-8">
          <Button className="bg-green-600 hover:bg-green-700 rounded-full px-8 py-6 text-lg">
            Request Mentorship
          </Button>
        </div>
      </div>
    </div>
  );
}