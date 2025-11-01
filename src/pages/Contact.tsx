import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

//Schema
const formSchema = z.object({
  email: z.email({
    message: "Por favor, ingresa un email válido",
  }),
   telephone: z
     .string()
     .min(10, { message: "Debe tener al menos 10 caracteres" })
     .regex(/^[0-9]+$/, { message: "El teléfono solo debe contener números"
    }),
    descripcion: z.string()
    .max(500, {message: "Tu mensaje no puede superar los 500 caracteres"})
});

export function Contact(){

    //Validacion con Zod
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        telephone: "",
        descripcion: "",
      },
    });
  
    type ContactFormValues = z.infer<typeof formSchema>;
  
    function onSubmit(values: ContactFormValues) {
      console.log("Datos validados", values);
    }
  return (
     <div className="flex items-center justify-center min-h-screen mt-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Contacto</CardTitle>
          <CardDescription className="text-center">
            Ingresá tu consulta y te responderamos a la brevedad.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="351 1234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name= "descripcion"
                render={({ field }) =>(
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea
                      placeholder="Escribí tu consulta aquí..."
                      className="resize-none"
                      rows={5}
                      {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
             />
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                Enviar Mensaje
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}