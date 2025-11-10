import { GoBackButton } from "@/components/GoBackButton";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { familyPhotosCarousel } from "@/data/carouselData";
import { Edit, PlusCircle, Trash } from "lucide-react";
import { Link } from "react-router-dom";

export function PhotosClass() {
  return (
    <div className="flex flex-col gap-6 m-4">
      <GoBackButton />
      <div className="flex items-center justify-between">
         <CardHeader>
          <CardTitle className="text-xl md:text-3xl">
            Momentos que nos hacen sonreír
          </CardTitle>
          <CardDescription>
            Un espacio para crear y compartir recuerdos de nuestras actividades diarias en la sala, momentos de juego, creatividad y aprendizaje.
          </CardDescription>
        </CardHeader>
        <Button asChild>
          <Link to="#">
            <PlusCircle className="mr-2 h-4 w-4" />
            Subir fotos
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {familyPhotosCarousel.map((src, i) => (
          <div className="flex flex-col  border-t">
          <img
            key={i}
            src={src.imgSrc}
            alt={`Foto de ${src.imgSrc} ${i + 1}`}
            className="cursor-pointer rounded-md w-full aspect-square object-cover 
                  transition-opacity hover:opacity-80"
          />
            <div className="flex  border-t">
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
        ))}
      </div>
    </div>
  );
}
