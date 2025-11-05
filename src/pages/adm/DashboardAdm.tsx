import { CardLinks } from "@/components/CardLinks";
import { linksAdmData } from "@/data/serviceData";

export function DashboardAdm(){
  return (
    <CardLinks 
    title="Panel de Administrador"
    subtitle="Selecciona una tarea para comenzar."
    links={linksAdmData}
    />
  )
}