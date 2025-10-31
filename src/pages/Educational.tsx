import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pillarsData } from "@/data/activitiesData";
import { Smile } from "lucide-react";
import { Link } from "react-router-dom";

export function Educational() {
  return (
    <div className="container mx-auto p-4 py-8 md:py-12">
      {/*Introducción*/}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Nuestra Propuesta Educativa
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Creemos en una educación que respeta los tiempos de cada niño,
          fomentando la curiosidad y el juego como los principales motores del
          aprendizaje.
        </p>
      </section>

      {/*Nuestra filosofía*/}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-6">
          Nuestra Filosofía
        </h2>
        <div className="max-w-2xl mx-auto text-center text-muted-foreground">
          <p className="mb-4">
            En nuestro jardín creemos que cada niño es único, capaz y
            protagonista de su propio aprendizaje. 🌈 A través del juego, la
            exploración y la expresión, buscamos acompañar sus primeros
            descubrimientos con respeto, amor y alegría. Fomentamos un ambiente
            donde los niños se sientan seguros, escuchados y valorados,
            promoviendo su autonomía, la curiosidad y el trabajo en grupo.
          </p>
          <p className="mb-4">
            Nuestra tarea diaria está guiada por la idea de que aprender es
            disfrutar, crear y compartir, construyendo vínculos afectivos que
            fortalecen el desarrollo integral de cada niño. Creemos en una
            educación que forma personas sensibles, solidarias y respetuosas del
            entorno, sembrando desde hoy los valores que los acompañarán toda la
            vida. 🌻✨
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Pilares de Nuestro Aprendizaje
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillarsData.map((pillar, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Smile className="w-8 h-8 text-primary" />
                <CardTitle>{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>{pillar.description}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center bg-muted p-10 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">¿Quieres saber más?</h2>
        <p className="text-lg text-muted-foreground mb-5 max-w-xl mx-auto">
          Estamos aquí para responder todas tus dudas. Agendá una entrevista y
          ven a conocer nuestro espacio.
        </p>
        <Button size="lg" asChild>
          <Link to="/contacto">Agendar una visita</Link>
        </Button>
      </section>
    </div>
  );
}
