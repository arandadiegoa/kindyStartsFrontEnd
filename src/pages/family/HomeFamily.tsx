import { CardLinks } from "@/components/CardLinks";
import { linksFamilyData } from "@/data/linksData";
import { useAuth } from "@/hook/useAuth";

export function HomeFamily() {

  const {user} = useAuth()
  const subtitle = `¡Bienvenido/a, ${user?.name}! a nuestro rincón digital.`

  return (
    <CardLinks
    title="Rincón Familiar"
    subtitle={subtitle}
    links={linksFamilyData}
    />
  );
}
