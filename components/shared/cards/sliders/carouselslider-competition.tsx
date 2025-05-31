import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CompetitionCard from "../competitioncard"

export function CarouselSliderCompetition() {
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full p-4 rounded-lg"
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                  <CompetitionCard></CompetitionCard>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4"/>
        <CarouselNext className="-right-4"/>
      </Carousel>
    )
  }
  