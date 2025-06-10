// components/shared/cards/sliders/carouselslider-intern.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InternshipCard from "../internshipcard";

export function CarouselSliderIntern({ internships }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full p-4 rounded-lg"
    >
      <CarouselContent>
        {internships.map((internship) => (
          <CarouselItem
            key={internship._id}
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="p-1">
              <InternshipCard internship={internship} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4" />
      <CarouselNext className="-right-4" />
    </Carousel>
  );
}