import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function ScrollToTop(){
  
  const { pathname } = useLocation() //obtiene la ruta actual

  useEffect(() => {
    window.scrollTo(0, 0) //ordena y lo envía arriba
  }, [pathname])
  
  return null //no renderiza nada
}