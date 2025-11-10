import { CardLinks } from "@/components/CardLinks";
import { linksTeachData } from "@/data/linksData";
import { useAuth } from "@/hook/useAuth";

export function MyClass() {
  const { user } = useAuth();
  const subtitle = `¡Bienvenida, ${user?.name}! a tu espacio de trabajo digital.`;
  return (
    <CardLinks title="Mi Sala" subtitle={subtitle} links={linksTeachData} />
  );
}
