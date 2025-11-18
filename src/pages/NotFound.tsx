import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hook/useAuth";
import { useEffect } from "react";

export function NotFound() {

  const { user } = useAuth()
  const navigate = useNavigate()

  const role = user?.role
  
  useEffect(() => {
    if(role) {
      let redirectPath = ''

      switch (role) {
        case 'admin':
          redirectPath = '/adm/dashboard'
          break;
        case 'teaching':
          redirectPath = '/teaching/mi-sala'
          break;
      case 'family':
          redirectPath = '/family/mi-portal'
          break;
        default:
          redirectPath = '/'
          break;
      }
      navigate(redirectPath, {replace:true})
    }
  }, [role, navigate])

  if(role){
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl text-muted-foreground">Redirigiendo a tu panel...</p>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 mt-2">
      <h1 className="text-8xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">¡Página No Encontrada!</h2>
      <p className="text-lg text-muted-foreground mb-8">
        La ruta a la que intentaste acceder no existe en nuestro jardín.
      </p>
      <Button asChild size="lg">
        <Link to="/">Volver al Inicio</Link>
      </Button>
    </div>
  );
}