import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

// 1. Definimos un tipo específico para el Timestamp de Firebase
type FirebaseTimestamp = { seconds: number; nanoseconds?: number }

// 2. Definimos los tipos aceptados para la fecha
type DateType = string | Date | FirebaseTimestamp | null | undefined

interface ActivityCardProps {
  title: string;
  date: DateType;
  description: string;
  photos: string[];
}


  //Funcion para formatear fecha, evita el error "Objects are not valid as a React child"
  const formatDate = (date:DateType): string => {
    
    if(!date) return ""

    if(typeof date === "string") return date

    try {
      //TimeStamp de Firebase viene con seconds
      if(typeof date === 'object' && 'seconds' in date) {
        return new Date(date.seconds * 1000).toLocaleDateString()
      }
      //Si es un objeto Date nativo
      if(date instanceof Date) {
        return date.toLocaleTimeString()
      }
      //Fallback para otros objetos
      return String(date)

    } catch (error) {
      console.log('Error:', error)
      return ""
    }
  }

export function ActivityCard({
  title,
  date,
  description,
  photos = []
}: ActivityCardProps) {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openDialog = (index: any) => {
    setStartIndex(index);
    setOpen(true);
  };

  
  //Asegura que siempre sea un array
  const safePhotos = Array.isArray(photos) ? photos : []


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl md:text-3xl">{title}</CardTitle>
          <CardDescription>{formatDate(date)}</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>

          <div className="grid grid-cols-4 gap-2">
            {safePhotos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Foto de ${title} ${i + 1}`}
                onClick={() => openDialog(i)}
                className="cursor-pointer rounded-md w-full aspect-square object-cover 
                  transition-opacity hover:opacity-80"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <DialogContent className="max-w-lg p-0">
        <Carousel
          opts={{
            startIndex: startIndex,
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {safePhotos.map((src, i) => (
              <CarouselItem key={i}>
                <div className="p-1">
                  <img
                    key={i}
                    src={src}
                    alt="Foto"
                    className="w-full h-auto object-contain max-h-[90vh]"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
