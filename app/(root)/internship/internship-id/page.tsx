'use client';
import React from 'react'
import { Button } from "@/components/ui/button";
import {ChevronLeft, Briefcase, Award, FileText, Shield, BadgeDollarSign, Laptop2, Mail, Phone, MapPin, Clock, CalendarDays, User, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

export default function InternshipDetails() {
  // Mock data - in a real app this would come from props or API
  const internship = {
    id: '123',
    company: 'Tech Innovators Inc.',
    title: 'Software Development Intern',
    duration: '3 Months',
    workplaceType: 'remote',
    location: 'Remote',
    category: 'Software Development',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    eligibility: 'student',
    stipend: {
      min: 1000,
      max: 2000,
      currency: 'USD'
    },
    startDate: '2023-11-15',
    contact: {
      email: 'hr@techinnovators.com',
      phone: '+1 (555) 123-4567'
    },
    sexDiversity: true,
    benefits: {
      jobOffer: true,
      certificate: true,
      lor: true,
      insurance: false,
      stipend: true,
      equipment: false
    },
    description: `We're looking for a motivated Software Development Intern to join our team. In this role, you'll work closely with our engineering team to develop new features for our web applications, fix bugs, and participate in code reviews.
    
Responsibilities:
- Develop and maintain web applications using React and Node.js
- Collaborate with team members on feature implementation
- Write clean, maintainable, and efficient code
- Participate in daily standups and sprint planning

Requirements:
- Basic understanding of JavaScript and web development
- Familiarity with React is a plus
- Currently enrolled in a Computer Science or related program
- Strong problem-solving skills and eagerness to learn`,
    postedDate: '2023-10-01'
  };

  const benefitOptions = [
    {
      id: 'jobOffer',
      label: 'Job Offer',
      icon: <Briefcase className="h-5 w-5 text-green-600" />,
      active: internship.benefits.jobOffer
    },
    {
      id: 'certificate',
      label: 'Certificate',
      icon: <Award className="h-5 w-5 text-green-600" />,
      active: internship.benefits.certificate
    },
    {
      id: 'lor',
      label: 'LOR',
      icon: <FileText className="h-5 w-5 text-green-600" />,
      active: internship.benefits.lor
    },
    {
      id: 'insurance',
      label: 'Insurance',
      icon: <Shield className="h-5 w-5 text-green-600" />,
      active: internship.benefits.insurance
    },
    {
      id: 'stipend',
      label: 'Stipend',
      icon: <BadgeDollarSign className="h-5 w-5 text-green-600" />,
      active: internship.benefits.stipend
    },
    {
      id: 'equipment',
      label: 'Equipment Provided',
      icon: <Laptop2 className="h-5 w-5 text-green-600" />,
      active: internship.benefits.equipment
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/internship">
            <Button variant="ghost" className="flex items-center gap-2 text-green-600 hover:text-green-700">
              <ChevronLeft className="h-4 w-4" />
              Back to Internships
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-col gap-2 mb-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{internship.title}</h1>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                {internship.category}
              </Badge>
            </div>
            <h2 className="text-lg sm:text-xl text-gray-700">{internship.company}</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">Posted on {formatDate(internship.postedDate)}</p>
            <Button className="bg-green-600 hover:bg-green-700 rounded-full px-6">
              Apply Now
            </Button>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{internship.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{internship.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <CalendarDays className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{formatDate(internship.startDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <BadgeDollarSign className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Stipend</p>
              <p className="font-medium">
                {internship.stipend.min.toLocaleString()} - {internship.stipend.max.toLocaleString()} {internship.stipend.currency}/month
              </p>
            </div>
          </div>
        </div>

        {/* Workplace Type and Eligibility */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            {internship.workplaceType.charAt(0).toUpperCase() + internship.workplaceType.slice(1)}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {internship.eligibility === 'student' ? 'Students Only' : 
             internship.eligibility === 'non-student' ? 'Non-students Only' : 'Students & Non-students'}
          </Badge>
          {internship.sexDiversity && (
            <Badge variant="outline" className="flex items-center gap-1 bg-purple-100 text-purple-800 border-purple-200">
              <GraduationCap className="h-4 w-4" />
              Encourages Diversity
            </Badge>
          )}
        </div>

        <Separator className="my-6" />

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Internship Description</h3>
          <div className="prose max-w-none">
            {internship.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Skills Required</h3>
          <div className="flex flex-wrap gap-2">
            {internship.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Benefits</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {benefitOptions.map((benefit) => (
              benefit.active && (
                <div key={benefit.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {benefit.icon}
                  <span className="text-sm font-medium">{benefit.label}</span>
                </div>
              )
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{internship.contact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{internship.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex justify-center mt-8">
          <Button className="bg-green-600 hover:bg-green-700 rounded-full px-8 py-6 text-lg">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}