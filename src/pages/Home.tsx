import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { carouselPhotos } from '../hooks/useCarouselPhotos'

export function Home(){

  return (
    // Centramos el carrusel en la página para este ejemplo
    <div className="flex justify-center w-full p-10">
      
      {/* 2. Este es el contenedor principal del carrusel */}
      {/* - w-full: hace que ocupe todo el ancho de su contenedor padre
        - max-w-sm: limita el ancho máximo a "small" (puedes cambiarlo)
      */}
      <Carousel className="w-full max-w-screen-xl">
        
        {/* 3. Aquí va el contenido (las diapositivas) */}
        <CarouselContent>
          
          {/* 4. Cada diapositiva es un CarouselItem */}
          {/* Usamos Array.from para crear 5 diapositivas de ejemplo */}
          {carouselPhotos.map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                {/* Usamos un componente Card de shadcn para el estilo */}
                <Card>
                  {/* Damos una altura fija para que se vea bien */}
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
        
        {/* 5. (Opcional) Agrega los botones de navegación */}
        <CarouselPrevious />
        <CarouselNext />

      </Carousel>
    </div>
  )
}