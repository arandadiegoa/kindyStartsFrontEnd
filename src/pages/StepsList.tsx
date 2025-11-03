import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StepsList() {
  return (
    <div className="container text-center mx-auto p-4 py-8 md:py-12">
      <Card>
        <CardHeader className="flex flex-auto gap-4">
          <CardTitle>
            <h1>🌼 Cómo inscribirse en nuestro jardín</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Iniciar el jardín es un momento lleno de ilusión y nuevas
            experiencias, tanto para los niños como para sus familias. 💕
            Queremos acompañarte paso a paso en este proceso, brindándote toda
            la información necesaria para que la inscripción sea simple y clara.
          </p>
        </CardContent>
        <section className="mb-16">
          <div className="max-w-2xl mx-auto text-center text-muted-foreground">
            <h6 className="text-2xl font-bold text-center mb-6">
              Primer contacto
            </h6>
            <p className="mb-4">
              Comunicate con nosotros por teléfono, visitando el jardín o
              complentando el formulario de contacto, para recibir información
              sobre vacantes, salas y turnos disponibles.
            </p>
            <h6 className="text-2xl font-bold text-center mb-6">
              Visita al jardín
            </h6>
            <p className="mb-4">
              Coordinamos un encuentro para que puedas conocer nuestras
              instalaciones, la propuesta educativa y al equipo docente. Es un
              momento ideal para despejar dudas y conocer nuestro modo de
              trabajo.
            </p>
            <h6 className="text-2xl font-bold text-center mb-6">
              Entrega de documentación
            </h6>
            <p className="mb-4">
              Una vez confirmada la vacante, te informaremos qué documentación
              presentar (fotocopias de DNI, ficha médica, calendario de
              vacunación, etc.).
            </p>
            <h6 className="text-2xl font-bold text-center mb-6">
              Entrevista inicial
            </h6>
            <p className="mb-4">
              Realizamos una charla de conocimiento entre la familia y la
              docente, para compartir información importante sobre la adaptación
              y el desarrollo del niño/a.
            </p>
            <h6 className="text-2xl font-bold text-center mb-6">
              Confirmación de inscripción
            </h6>
            <p className="mb-4">
              Al completar los pasos anteriores, la inscripción queda
              formalizada y ¡ya formás parte de nuestra comunidad educativa!
              🌈✨.
            </p>
          </div>
        </section>
      </Card>
    </div>
  );
}
