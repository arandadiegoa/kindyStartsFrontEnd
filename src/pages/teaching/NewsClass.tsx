import { ActivityCard } from "@/components/ActivityCard";
import { GoBackButton } from "@/components/GoBackButton";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { newsData } from "@/data/contentData";
import { Edit, PlusCircle, Trash } from "lucide-react";
import { Link } from "react-router-dom";

export function NewsClass() {
  return (
    <div className="flex flex-col gap-6 m-3">
      <GoBackButton />

      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="text-xl md:text-3xl">
            Mis novedades
          </CardTitle>
          <CardDescription>
          En este espacio vas a poder agregar, editar o eliminar las novedades relacionadas con la propuesta desarrollada.
          </CardDescription>
        </CardHeader>
        <Button asChild>
          <Link to="#">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {newsData.map((news, index) => (
          <div className="flex flex-col">
            <ActivityCard
              key={index}
              title={news.title}
              date={""}
              description={news.description}
              photos={[]}
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
