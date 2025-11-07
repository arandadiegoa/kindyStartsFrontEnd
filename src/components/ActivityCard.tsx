import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

interface ActivityCardProps {
  title: string;
  date: string;
  description: string;
  photos: string[];
}

export function ActivityCard({title, date, description, photos}:ActivityCardProps ) {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openDialog = (index: any) => {
    setStartIndex(index);
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-xl md:text-3xl">{title}</CardTitle>
            <CardDescription>{date}</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {description}
            </p>

            <div className="grid grid-cols-4 gap-2">
              {photos.map((src, i) => (
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
              {photos.map((src, i) => (
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
  )
}
