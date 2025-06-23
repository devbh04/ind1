import Link from "next/link";
import {
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  TrophyIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const HackathonCard = ({ hackathon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Logo */}
      <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        {hackathon.logo ? (
          <img
            src={
              hackathon.logo?.startsWith("http")
                ? hackathon.logo
                : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
            }
            alt={hackathon.logo}
            className="h-24 w-24 object-contain bg-white p-2 rounded-full"
          />
        ) : (
          <span className="text-white text-lg">No Logo</span>
        )}
      </div>

      <div className="p-6">
        {/* Type and Mode */}
        <div className="flex justify-between items-center mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {{
              allcategories: "All Categories",
              coding: "Coding Hackathon",
              innovation: "Innovation Challenge",
              ai_ml: "AI/ML Hackathon",
              blockchain: "Blockchain Hackathon",
              cybersecurity: "Cybersecurity Hackathon",
              data_science: "Data Science Hackathon",
              iot: "IoT Hackathon",
              game_dev: "Game Development Hackathon",
            }[hackathon.hackathonType] || "Unknown Type"}
          </span>

          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {hackathon.eventMode === "online"
              ? "Online"
              : hackathon.eventMode === "offline"
              ? "In-Person"
              : "Hybrid"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {hackathon.hackathonTitle}
        </h3>

        {/* Organizer */}
        <p className="text-sm text-gray-500 mb-3">
          Hosted by{" "}
          <span className="font-medium text-gray-700">
            {hackathon.organization}
          </span>
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {hackathon.hackathonDetails}
        </p>

        {/* Prize Pool */}
        {hackathon.prizePool && (
          <div className="flex items-center mb-3">
            <TrophyIcon className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-900">
              {hackathon.prizePool}
            </span>
            <span className="text-sm text-gray-500 ml-1">prize pool</span>
          </div>
        )}

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-start">
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Starts</p>
              <p className="text-sm font-medium">
                {formatDate(hackathon.startDate)}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Ends</p>
              <p className="text-sm font-medium">
                {formatDate(hackathon.endDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Registration Deadline */}
        <div className="flex items-center mb-4">
          <ClockIcon className="h-5 w-5 text-red-400 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Register by</p>
            <p className="text-sm font-medium text-red-600">
              {formatDate(hackathon.registrationDeadline)}
            </p>
          </div>
        </div>

        {/* Location */}
        {hackathon.eventMode !== "online" && (
          <div className="flex items-center mb-4">
            <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
            <p className="text-sm text-gray-600">
              {[
                hackathon.venue,
                hackathon.city,
                hackathon.state,
                hackathon.country,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        )}

        {/* Participants */}
        <div className="flex items-center mb-4">
          <UsersIcon className="h-5 w-5 text-gray-400 mr-2" />
          <p className="text-sm text-gray-600">
            {(hackathon.registeredUsers?.length || 0).toLocaleString()}{" "}
            participants
          </p>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Skills:</p>
          <div className="flex flex-wrap gap-1">
            {hackathon.technicalSkills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
              >
                {skill}
              </span>
            ))}
            {hackathon.technicalSkills.length > 4 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                +{hackathon.technicalSkills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <Link href={`/hackathon/${hackathon._id}`}>
          <div className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-center flex items-center justify-center">
            View Details <ArrowRightIcon className="h-4 w-4 ml-2" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HackathonCard;
