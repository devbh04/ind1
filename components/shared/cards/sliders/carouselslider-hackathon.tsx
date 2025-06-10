// components/shared/cards/sliders/carouselslider-hackathon.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HackathonCard from "../hackathoncard";

export function CarouselSliderHackathon({ hackathons }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full p-4 rounded-lg"
    >
      <CarouselContent>
        {hackathons.map((hackathon) => (
          <CarouselItem key={hackathon._id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <div className="p-1">
              <HackathonCard hackathon={hackathon} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4"/>
      <CarouselNext className="-right-4"/>
    </Carousel>
  );
}