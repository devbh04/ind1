import { Star, Briefcase, Globe, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MentorCard = ({ mentor }) => {
  const router = useRouter();
  const fullName = `${mentor.firstName} ${mentor.lastName}`;
  const expertise = mentor.expertise || [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Mentor Header */}
      <div className="bg-amber-50 p-4 flex items-center gap-4">
        <img 
          src={mentor.photoUrl || '/default-avatar.png'} 
          alt={fullName}
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{fullName}</h3>
          <p className="text-sm text-gray-600">{mentor.currentRole}</p>
        </div>
      </div>
      
      {/* Mentor Details */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{mentor.organization}</span>
        </div>
        
        {mentor.availability && (
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{mentor.availability}</span>
          </div>
        )}
        
        {/* Expertise */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Expertise</h4>
          <div className="flex flex-wrap gap-2">
            {expertise.slice(0, 3).map((skill, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {expertise.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                +{expertise.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* Bio Excerpt */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {mentor.bio}
        </p>
        
        {/* Action Button */}
        <button
          onClick={() => router.push(`/mentorship/${mentor._id}`)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Book Session</span>
        </button>
      </div>
    </div>
  );
};

export default MentorCard;
