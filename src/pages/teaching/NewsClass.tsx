import { ActivityCard } from "@/components/activities/ActivityCard";
import { GoBackButton } from "@/components/GoBackButton";
import { NewsCreateModal } from "@/components/news/NewsCreateModal";
import { NewsEditModal } from "@/components/news/NewsEditModal";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNews, type News } from "@/hook/useNews";
import { AlertCircle, Edit, Loader2, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";

export function NewsClass() {
  const { news, isLoading, error, deleteNews, updateNews, createNews } =
    useNews();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editNews, setEditNews] = useState<News | null>(null);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">
          Cargando novedades...
        </span>
      </div>
    );
  }

  if (error) {
    return (
    <div className="flex h-50[vh] w-full flex-col items-center justify-center gap-2 text-destructive">
      <AlertCircle className="h-8 w-8" />
      <p>Error: {error}</p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Reintentar
      </Button>
    </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 m-3">
      <GoBackButton />

      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="text-xl md:text-3xl">Mis novedades</CardTitle>
          <CardDescription>
            En este espacio vas a poder agregar, editar o eliminar las novedades
            relacionadas con la propuesta desarrollada.
          </CardDescription>
        </CardHeader>
        <Button onClick={() => setIsCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {news.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground py-10">
            ¡No existen novedades registradas en el día de hoy!
          </p>
        ) : (
          news.map((item) => (
            <div key={item.id} className="flex flex-col">
              <ActivityCard
                key={item.id}
                title={item.title}
                date={item.date}
                description={item.description}
                photos={[]}
              />
              <div className="flex  border-t">
                <Button variant="ghost" size="icon" onClick={() => setEditNews(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => deleteNews(item.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <NewsCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={createNews}
      />

      <NewsEditModal
        isOpen={!!editNews}
        news={editNews}
        onClose={() => setEditNews(null)}
        onSave={updateNews}
      />
    </div>
  );
}
