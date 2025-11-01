import { teamData } from "@/data/activitiesData";
import { Card, CardContent } from "./ui/card";

export function Team() {
  return (
    <div className="container mx-auto p-4 py-8 md:py-2">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestro equipo</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Un equipo de profesionales que educa con el corazón, acompañando a
          cada niño con amor, respeto y alegría en cada paso de su crecimiento.
          💕
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {teamData.map((member) => (
            <Card key={member.name} className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="w-full aspect-square overflow-hidden">
                    <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-md text-primary font-medium">
                      {member.role}
                    </p>
                  </div>
                  <div style={{display:"flex", justifyContent:"center"}}>
                  <img
                    src={member.imgSrc}
                    alt={`Foto de ${member.name}`}
                    width={200}
                  />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
