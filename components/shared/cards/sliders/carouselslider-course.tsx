// components/shared/cards/sliders/carouselslider-course.tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from '@/components/shared/cards/coursecard';


export function CarouselSliderCourse({ courses }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full p-4 rounded-lg"
    >
      <CarouselContent>
        {courses.map((course) => (
          <CarouselItem key={course._id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <div className="p-1 h-full">
              <CourseCard course={course} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4" />
      <CarouselNext className="-right-4" />
    </Carousel>
  );
}