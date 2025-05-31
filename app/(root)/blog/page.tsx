'use client'
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const blogPosts = [
  {
    title: "Apprenticeship vs. Internship: Key Differences, Benefits, & Impact",
    tag: "Resource Centre",
    image: "/Images/1.png",
    date: "May 15, 2024"
  },
  {
    title: "Fellowship vs. Internship: Differences, Benefits, & Career Impact",
    tag: "Resource Centre",
    image: "/Images/2.png",
    date: "May 10, 2024"
  },
  {
    title: "What is a Remote Internship? Benefits, Skills, & How to Find One",
    tag: "Resource Centre",
    image: "/Images/3.png",
    date: "May 5, 2024"
  },
  {
    title: "How to Write an Internship Report? Structure, Tips, and Samples",
    tag: "Resource Centre",
    image: "/Images/1.png",
    date: "April 28, 2024"
  },
  {
    title: "7 Best Ways to Find Internships! Best Ways + Tips",
    tag: "Resource Centre",
    image: "/Images/2.png",
    date: "April 20, 2024"
  },
  {
    title: "ADA Recruitment 2025 | 137 Openings | High Compensation– Apply Now!",
    tag: "Newsroom",
    image: "/Images/1.png",
    date: "April 15, 2024"
  },
  {
    title: "Coming Soon Blog 1",
    tag: "Resource Centre",
    image: "/Images/3.png",
    date: "Coming Soon"
  },
  {
    title: "Coming Soon Blog 2",
    tag: "Resource Centre",
    image: "/Images/1.png",
    date: "Coming Soon"
  },
  {
    title: "Coming Soon Blog 3",
    tag: "Newsroom",
    image: "/Images/2.png",
    date: "Coming Soon"
  },
];

export default function BlogPage() {
  return (
    <div className='mx-4 sm:mx-12 lg:mx-24 xl:mx-48'>
      {/* Page Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-end mt-6 mb-8'>
        <div>
          <div className='flex gap-3 items-center'>
            <h1 className='text-green-600 text-3xl sm:text-4xl md:text-5xl font-extrabold'>Unstop</h1>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold'>Blog</h1>
          </div>
          <p className='p-2 text-slate-400 w-full sm:w-3/4 hover:text-slate-700 transition-all duration-100'>
            Latest articles and resources for your career growth
          </p>
        </div>
        <Link href='/blog/create' className='hidden sm:block'>
          <Button className='bg-green-600 text-white hover:bg-green-700 transition-all duration-100'>
            Write a Blog
          </Button>
        </Link>
      </div>

      {/* Blog Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogPosts.map((post, index) => (
          <Card
            key={index}
            className='overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
          >
            {/* Image Container */}
            <div className='relative aspect-video w-full'>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className='object-cover'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                priority={index < 6}
              />
            </div>

            {/* Card Content */}
            <CardContent className='p-4 sm:p-6'>
              <div className='flex justify-between items-start mb-2'>
                <Badge variant='outline' className='text-xs bg-gray-100'>
                  {post.tag}
                </Badge>
                <span className='text-xs text-slate-400'>{post.date}</span>
              </div>
              <h2 className='text-lg font-semibold leading-6 text-gray-900 line-clamp-2'>
                {post.title}
              </h2>
              <div className='mt-4 flex items-center text-sm text-green-600 hover:text-green-800 transition-all duration-100'>
                <Link href={`/blog/${index}`} className='flex items-center'>
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-1 h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className='mt-12 flex justify-center'>
        <Button className='bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition-all duration-100'>
          Load more articles
        </Button>
      </div>

      {/* Mobile Create Button */}
      <div className='fixed bottom-6 right-6 sm:hidden'>
        <Link href='/blog/create'>
          <Button className='rounded-full bg-green-600 text-white hover:bg-green-700 transition-all duration-100 p-4 shadow-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );
}