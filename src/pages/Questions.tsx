import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Questions() {
  return (
    <div className="container text-center mx-auto p-4 py-8 md:py-12">
      <Card>
        <CardHeader className="flex flex-auto gap-4">
          <CardTitle>
            <h1>🌼 Preguntas Frecuentes</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Sabemos que el comienzo del jardín genera muchas dudas y emociones.
            💕 Por eso, reunimos aquí las preguntas más frecuentes que suelen
            hacernos las familias, para ayudarte a conocer mejor nuestro
            espacio, nuestras propuestas y cómo acompañamos a los niños en esta
            etapa tan especial.
          </p>
        </CardContent>
        <section className="mb-16">
          <div className="max-w-2xl mx-auto text-center text-muted-foreground">
            <h6 className="text-2xl font-bold text-center mb-6">
              ¿Desde qué edad pueden ingresar los niños?
            </h6>
            <p className="mb-4">
              Recibimos niños a partir desde los 12 meses a 3 años, según la
              sala correspondiente. Las edades se organizan por grupos de
              desarrollo y nivel.
            </p>
            <h6 className="text-2xl font-bold text-center mb-6">
              ¿Cuál es el horario del jardín?
            </h6>
            <p className="mb-4">
              Contamos con turno mañana, tarde y jornada completa. Los horarios
              pueden adaptarse según las necesidades de cada familia.
            </p>
            <h6 className="text-2xl font-bold text-center mb-6">
              ¿Cómo se realiza la adaptación?
            </h6>
            <p className="mb-4">
              El período de adaptación se planifica de manera gradual,
              respetando los tiempos de cada niño y acompañando a las familias
              en este proceso.
            </p>
            <h6 className="text-2xl font-bold text-center mb-6">
              ¿Qué necesito para inscribir a mi hijo/a?
            </h6>
            <p className="mb-4">
              Se solicita completar la ficha de inscripción, presentar
              fotocopias del DNI del niño y de los padres/tutores, certificado
              médico y libreta de vacunación actualizada.
            </p>
            <h6 className="text-2xl font-bold text-center mb-6">
              ¿El jardín cuenta con comedor o servicio de alimentación?
            </h6>
            <p className="mb-4">
              Si, para los niños que hacen doble jornada. Todos los alimentos
              son enviados desde casa.
            </p>
            <h6 className="text-2xl font-bold text-center mb-6">
              ¿Qué se trabaja durante el año?
            </h6>
            <p className="mb-4">
              A través del juego, la exploración y la creatividad, promovemos el
              desarrollo integral: lo emocional, social, cognitivo y motriz.
            </p>
            <h6 className="text-2xl font-bold text-center mb-6">
              ¿Debo comprar uniforme o materiales?
            </h6>
            <p className="mb-4">
              Generalmente solicitamos un uniforme cómodo y sencillo, y una
              lista reducida de materiales al inicio del ciclo.
            </p>
            <h6 className="text-2xl font-bold text-center mb-6">
              ¿Cómo puedo comunicarme con el jardín?
            </h6>
            <p className="mb-4">
              Podés enviarnos tu consulta desde el formulario de contacto, por
              teléfono, o acercarte personalmente.
            </p>
            <h6 className="text-2xl font-bold text-center mb-6">
              ¿El jardín cierra por vacaciones?
            </h6>
            <p className="mb-4">
              En Julio cerramos una semana. Y en Enero 15 días.
            </p>
                 <h6 className="text-2xl font-bold text-center mb-6">
              ¿El jardín cierra por feriados?
            </h6>
            <p className="mb-4">
              Si, se respetan feriados nacionales/provinciales.
            </p>
          </div>
        </section>
      </Card>
    </div>
  );
}
