import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { carouselPhotos } from '../data/activitiesData'

export function Home(){

  return (

    <div className="flex justify-center w-full p-10">
    
      <Carousel className="w-full max-w-screen-xl">
        
        {/* 3. Aquí va el contenido (las diapositivas) */}
        <CarouselContent>
          
          {carouselPhotos.map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex h-[400px] items-center justify-center p-6">
                    <img
                      src={src}
                      alt={`Foto del carousel ${index + 1}`}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}

        </CarouselContent>
        
      </Carousel>
    </div>
  )
}