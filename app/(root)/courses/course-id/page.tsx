"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, User, BookOpen, BarChart2, Award, Mail, Phone, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

export default function CourseDetails() {
  // Mock data - would come from props or API in a real app
  const course = {
    id: 'course123',
    title: 'Advanced Machine Learning with Python',
    tutors: ['Dr. Sarah Johnson', 'Prof. Michael Chen'],
    description: `This comprehensive course covers advanced machine learning techniques using Python. Designed for intermediate to advanced learners, the curriculum includes hands-on projects with real-world datasets.

Key Topics:
- Deep Learning with TensorFlow and PyTorch
- Ensemble Methods and Model Optimization
- Natural Language Processing
- Computer Vision Applications
- Model Deployment and Serving

What You'll Learn:
✓ Build and train complex neural networks
✓ Implement state-of-the-art ML algorithms
✓ Optimize model performance
✓ Deploy models to production environments
✓ Work with unstructured data (text, images)

By the end of this course, you'll have a portfolio of projects demonstrating your mastery of advanced ML concepts and be prepared for professional ML engineering roles.`,
    duration: '4 Months',
    level: 'Advanced',
    specialization: 'AI & Machine Learning',
    beneficialFor: ['B.Tech/B.E.', 'M.Tech', 'B.Sc', 'M.Sc'],
    prerequisites: ['Python programming', 'Basic statistics', 'Intro to ML concepts'],
    learningOutcomes: [
      'Master advanced ML algorithms',
      'Build production-ready models',
      'Work with real-world datasets',
      'Deploy ML solutions',
      'Optimize model performance'
    ],
    contact: {
      email: 'ml-course@tech.edu',
      phone: '+1 (555) 987-6543'
    },
    startDate: '2023-11-15',
    postedDate: '2023-10-01',
    coverPhoto: '/L.avif'
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/courses">
            <Button variant="ghost" className="flex items-center gap-2 text-green-600 hover:text-green-700">
              <ChevronLeft className="h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>

        {/* Cover Photo */}
        <div className="mb-8">
          <div className="w-full h-48 sm:h-64 lg:h-80 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={course.coverPhoto} 
              alt="Course Cover" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-col gap-2 mb-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{course.title}</h1>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                {course.specialization}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <User className="h-4 w-4" />
              <span>Tutors: {course.tutors.join(', ')}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500">Posted on {formatDate(course.postedDate)}</p>
            <Button className="bg-green-600 hover:bg-green-700 rounded-full px-6">
              Enroll Now
            </Button>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{course.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <BookOpen className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Level</p>
              <p className="font-medium">{course.level}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <CalendarDays className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{formatDate(course.startDate)}</p>
            </div>
          </div>
        </div>

        {/* Beneficial For */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Beneficial For</h3>
          <div className="flex flex-wrap gap-2">
            {course.beneficialFor.map((program, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
                {program}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Course Description</h3>
          <div className="prose max-w-none">
            {course.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Learning Outcomes</h3>
          <ul className="space-y-2">
            {course.learningOutcomes.map((outcome, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prerequisites */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Prerequisites</h3>
          <div className="flex flex-wrap gap-2">
            {course.prerequisites.map((prereq, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1 bg-purple-50 text-purple-700 border-purple-200">
                {prereq}
              </Badge>
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
                <p className="font-medium">{course.contact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{course.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enroll Button */}
        <div className="flex justify-center mt-8">
          <Button className="bg-green-600 hover:bg-green-700 rounded-full px-8 py-6 text-lg">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}