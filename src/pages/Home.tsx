import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { carouselSlides } from "../data/activitiesData";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Educational } from "../components/Educational";
import { Team } from "@/components/Team";

export function Home() {
  const plugin = useRef(Autoplay({ delay: 4000 }));

  const fadePlugin = useRef(Fade());
  return (
    <>
    <div className="flex justify-center w-full">
      <Carousel
        className="w-full max-w-screen-xxl"
        plugins={[plugin.current, fadePlugin.current]}
      >
        <CarouselContent>
          {carouselSlides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="transition-opacity duration-800 ease-in-out"
            >
              <div style={{ width: "100%", height: "513px" }}>
                <img
                  src={slide.imgSrc}
                  alt={`Foto del carousel ${index + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 text-shadow-lg">{slide.title}</h2>
                  <p className="text-lg md:text-2xl text-shadow">{slide.subtitle}</p>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
    <Educational />
    <Team />
    </>
  );
}
