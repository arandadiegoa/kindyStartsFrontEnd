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

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hook/useAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";
import { auth, db } from "@/firebase";

//Schema
const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, ingresa un email válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  //Mejorar la carga y errores
  const [isLoading, setIsloading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  //Validacion con Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsloading(true);
    setServerError(null);

    try {
      console.log('Autenticando con Firebase..')
      
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )

      const uid = userCredential.user.uid
        //Si respuesta.ok
      console.log("Login exitoso, usuario registrado", uid);

      const userDocRef = doc(db, "users", uid)
      const userDocSnap = await getDoc(userDocRef)

      //Verifiar respuesta
      if (!userDocSnap.exists()) {
        throw new Error("Error al iniciar sesión, el usuario no tiene permisos");
      }

      const userData = userDocSnap.data()
      console.log("Datos obtenidos desde firebase", userData);

      const finalUsers = {
        uid: uid,
        email: userCredential.user.email,
        role: userData.role,
        name: userData.name,
        ...userData
      }

      login(finalUsers)

      switch (finalUsers.role) {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log("Error:", error.code, error.message)
      let msg = "Error al iniciar sessión"
      if(error.code === 'auth/invalid-credential' || error.code === 'auth/worg-password') {
        msg = "Credenciales incorrectas"
      } else if(error.code === 'auth/user-not-found'){
        msg = "Usuario no encontrado"
      }
      setServerError(msg)
    }finally {
      setIsloading(false)
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
              {serverError && (
                <Alert variant="destructive">
                  <AlertTitle className="text-center" />
                  <AlertDescription>
                    {serverError}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validando...
                  </>
                ): (
                  "Ingresar"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
