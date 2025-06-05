import { Button } from '@/components/ui/button';
import Image from 'next/image';

const CourseCard = ({ course }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      {/* Course Cover Image */}
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={course.coverImage}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Course Content */}
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{course.title}</h3>
            <p className="text-sm text-gray-500">By {course.tutors.split(', ')[0]}</p>
          </div>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {course.duration}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {course.courseType}
          </span>
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
            {course.specialization}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        {course.rating && (
          <div className="flex items-center gap-1 text-sm mb-3">
            <span className="text-yellow-500">★</span>
            <span>{course.rating}</span>
            <span className="text-gray-500">({course.enrolled} students)</span>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t">
        <Button className="w-full bg-green-600 hover:bg-green-700">
          Enroll Now
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;