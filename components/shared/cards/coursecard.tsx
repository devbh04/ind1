import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CourseCard = ({ course }) => {
  const router = useRouter();

  // Safe cover image URL (fallback to default)
  const coverImage =
    course.coverPhotoUrl &&
    (course.coverPhotoUrl.startsWith('http') || course.coverPhotoUrl.startsWith('/'))
      ? course.coverPhotoUrl
      : 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D';

  const tutorName = Array.isArray(course.tutorNames)
    ? course.tutorNames[0]
    : (course.tutorNames || '').split(',')[0];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      {/* Course Cover Image - Reduced height */}
      <div className="relative h-36 w-full bg-gray-100 overflow-hidden">
        <img
          src={coverImage}
          alt={course.courseTitle || 'Course Image'}
          className="object-cover w-full h-full" // Changed to object-cover
        />
      </div>

      {/* Course Content */}
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
              {course.courseTitle}
            </h3>
            <p className="text-sm text-gray-500">By {tutorName}</p>
          </div>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {course.duration || 'N/A'}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {course.beneficialFor || 'General'}
          </span>
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
            {course.specialization || 'N/A'}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.courseDetails || 'No description provided.'}
        </p>

        {/* Optional rating display */}
        {course.rating && (
          <div className="flex items-center gap-1 text-sm mb-3">
            <span className="text-yellow-500">★</span>
            <span>{course.rating}</span>
            <span className="text-gray-500">
              ({course.enrolled || 0} students)
            </span>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <Button
          onClick={() => {
            router.push(`/courses/${course._id}`);
          }}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Enroll Now
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;