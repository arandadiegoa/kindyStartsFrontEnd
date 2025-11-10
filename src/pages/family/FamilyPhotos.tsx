import { GoBackButton } from "@/components/GoBackButton";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { familyPhotosCarousel } from "@/data/carouselData";

export function FamilyPhotos() {
  return (
    <div className="flex flex-col gap-6 m-4">
      <GoBackButton />
      <CardHeader>
        <CardTitle>Nuestros momentos del día 🌞</CardTitle>
        <CardDescription>
          Te invitamos a revivir con nosotros los instantes más especiales de la
          sala, juegos, descubrimientos y mucha alegría.
        </CardDescription>
      </CardHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-5">
        {familyPhotosCarousel.map((src, i) => (
          <img
            key={i}
            src={src.imgSrc}
            alt={`Foto de ${src.imgSrc} ${i + 1}`}
            className="cursor-pointer rounded-md w-full aspect-square object-cover 
                  transition-opacity hover:opacity-80"
          />
        ))}
      </div>
    </div>
  );
}
