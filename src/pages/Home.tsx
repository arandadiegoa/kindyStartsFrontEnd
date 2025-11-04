import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { carouselSlides } from "../data/serviceData";
import { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Educational } from "../components/Educational";
import { Team } from "@/components/Team";

export function Home() {
  const plugin = useMemo(
    () => Autoplay({ delay: 4000, stopOnInteraction: true }),
    []
  );

  const fadePlugin = useMemo(() => Fade(), []);
  return (
    <>
      <Carousel className="w-full" plugins={[plugin, fadePlugin]}>
        <CarouselContent>
          {carouselSlides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="transition-opacity duration-800 ease-in-out"
            >
              <div
                className="relative w-full
               h-[50vh] 
               md:h-[70vh] 
               lg:h-[80vh]"
              >
                <img
                  src={slide.imgSrc}
                  alt={`Foto del carousel ${index + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                />

                <div className="absolute inset-0 bg-black/40 rounded-lg" />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 text-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-2xl text-shadow">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="container mx-auto p-4">
        <Educational />
        <Team />
      </div>
    </>
  );
}
