import { ActivityCard } from "@/components/ActivityCard";
import { activitiesData } from "@/data/serviceData";

export function Activities() {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-10 mt-4">Galería de Actividades</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activitiesData.map((activity, index) => (
          <ActivityCard
            key={index}
            title={activity.title}
            date={activity.date}
            description={activity.description}
            photos={activity.photos}
           />
        ))}
      </div>
    </div>
  );
}
