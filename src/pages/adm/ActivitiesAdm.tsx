import { ActivityCard } from "@/components/ActivityCard";
import { GoBackButton } from "@/components/GoBackButton";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Edit, Loader2, PlusCircle, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { ActivityEditModal } from "@/components/ActivityEditModal";

import { useActivities, type Activity } from "@/hook/useActivities";
import { useState } from "react";

export function ActivitiesAdm() {

  const {activities, isLoading, error, deleteActivity, updateActivity} = useActivities()

  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)

  if(isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Cargando actividades...</span>
      </div>
    )
  }

  if(error){
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-2 text-destructive">
        <AlertCircle className="h-8 w-8" />
        <p>Error: {error}</p>
        <Button variant="outline" onClick={ () => window.location.reload()}>Reintentar</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 m-3">
      <GoBackButton />

      <div className="flex items-center justify-between">
        <CardHeader className="p-0">
          <CardTitle>Gestión de Actividades</CardTitle>
          <CardDescription>
            En este espacio podés crear, editar o eliminar actividades de la
            sala, y mantener actualizado el registro de propuestas realizadas.
          </CardDescription>
        </CardHeader>
        <Button asChild>
          <Link to="/admin/activities/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activities.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground py-10">
            ¡No existen actividades registradas en el día de hoy!
          </p>
        ): (
          activities.map((activity, index) => (
          <div className="flex flex-col">
            <ActivityCard
              key={index}
              title={activity.title}
              date={activity.date}
              description={activity.description}
              photos={activity.photos}
            />
          
            <div className="flex  border-t">
              {/*Solo setea el estado 'editingActivity*/}
              <Button variant="ghost" size="icon" onClick={() => setEditingActivity(activity)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => deleteActivity}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )))}
      </div>

        <ActivityEditModal
        isOpen={!!editingActivity}
        activity={editingActivity}
        onClose={() => setEditingActivity(null)}
        onSave={updateActivity}
        />

    </div>
  );
}
