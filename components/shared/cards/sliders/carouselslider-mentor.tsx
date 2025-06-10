import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import MentorCard from "../mentorcard"

export function CarouselSliderMentor({mentors}) {
    
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full p-4 rounded-lg"
      >
        <CarouselContent>
          {mentors.map((mentor) => (
            <CarouselItem key={mentor._id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <MentorCard mentor={mentor} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4"/>
        <CarouselNext className="-right-4"/>
      </Carousel>
    )
}