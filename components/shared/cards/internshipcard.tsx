'use client'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Briefcase, Award, FileText, Shield, BadgeDollarSign, Laptop2, MapPin, CalendarDays } from 'lucide-react';


const InternshipCard = ({ internship }) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/internship/${internship._id}`);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="border border-gray-200 hover:border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Company Header */}
      <div className="bg-blue-50 p-4 flex items-center gap-4">
        <div className="w-16 h-16 bg-white rounded-lg border-2 border-white shadow-sm flex items-center justify-center">
          <img 
            src="/homepage/person.svg" 
            alt={internship.companyName} 
            className="w-12 h-12 object-contain"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{internship.companyName}</h3>
          <p className="text-sm text-gray-600">{internship.title}</p>
        </div>
      </div>
      
      {/* Internship Details */}
      <div className="p-4 space-y-3">
        {/* Category and Type */}
        <div className="flex justify-between items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {internship.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {internship.workplaceType === 'on-site' ? 'On-site' : 
             internship.workplaceType === 'hybrid' ? 'Hybrid' : 'Remote'}
          </span>
        </div>
        
        {/* Location */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-gray-700">
            {internship.workplaceType === 'remote' ? 'Remote' : internship.workLocation || 'Not specified'}
          </span>
        </div>
        
        {/* Duration */}
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays className="h-4 w-4 text-gray-500" />
          <span className="text-gray-700">
            {internship.duration} • Starts {formatDate(internship.startDate)}
          </span>
        </div>
        
        {/* Stipend */}
        {internship.benefits.stipend && (
          <div className="flex items-center gap-2 text-sm">
            <BadgeDollarSign className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">
              ${internship.minStipend?.toLocaleString() || '0'} - ${internship.maxStipend?.toLocaleString() || '0'}
            </span>
          </div>
        )}
        
        {/* Skills */}
        <div className="pt-2">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {internship.skillsRequired?.slice(0, 4).map((skill, index) => (
              <span 
                key={index} 
                className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {internship.skillsRequired?.length > 4 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                +{internship.skillsRequired.length - 4}
              </span>
            )}
          </div>
        </div>
        
        {/* Benefits */}
        <div className="pt-2">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Benefits</h4>
          <div className="flex flex-wrap gap-2">
            {internship.benefits.jobOffer && (
              <span className="flex items-center gap-1 text-xs text-gray-700">
                <Briefcase className="h-3 w-3 text-green-600" /> Job Offer
              </span>
            )}
            {internship.benefits.certificate && (
              <span className="flex items-center gap-1 text-xs text-gray-700">
                <Award className="h-3 w-3 text-green-600" /> Certificate
              </span>
            )}
            {internship.benefits.lor && (
              <span className="flex items-center gap-1 text-xs text-gray-700">
                <FileText className="h-3 w-3 text-green-600" /> LOR
              </span>
            )}
            {internship.benefits.insurance && (
              <span className="flex items-center gap-1 text-xs text-gray-700">
                <Shield className="h-3 w-3 text-green-600" /> Insurance
              </span>
            )}
            {internship.benefits.equipment && (
              <span className="flex items-center gap-1 text-xs text-gray-700">
                <Laptop2 className="h-3 w-3 text-green-600" /> Equipment
              </span>
            )}
          </div>
        </div>
        
        {/* CTA Button */}
        <Button 
          onClick={handleClick}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default InternshipCard;