import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { users } from "@/data/authData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hook/useAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

//Schema
const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, ingresa un email válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  //Validacion con Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  type LoginFormValues = z.infer<typeof formSchema>;

  function onSubmit(values: LoginFormValues) {
    const foundUser = users.find(
      (user) => user.mail === values.email && user.pass === values.password
    );

    if (foundUser) {
      const userToLogin = {
        name: foundUser.name,
        role: foundUser.role
      }

      login(userToLogin);

      switch (foundUser.role) {
        case "admin":
          navigate("/adm/dashboard");
          break;
        case "teaching":
          navigate("/teaching/mi-sala");
          break;
        case "family":
          navigate("/family/mi-portal");
          break;
        default:
          navigate("/");
      }
    } else {
      form.setError("root", {
        message: "Email o contraseña incorrecta",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">
            Ingresa tu email y contraseña para acceder a tu cuenta
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <Alert variant="destructive">
                  <AlertTitle className="text-center" />
                  <AlertDescription>
                    {form.formState.errors.root.message}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Enviar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
