import { ActivityCard } from "@/components/ActivityCard";
import { GoBackButton } from "@/components/GoBackButton";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { newsData } from "@/data/contentData";

export function FamilyNews() {
  return (
    <div className="flex flex-col gap-6 m-3">
      <GoBackButton />

      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="text-xl md:text-3xl">
            Lo nuevo en nuestra sala 🌈
          </CardTitle>
          <CardDescription>
            Compartimos las novedades y momentos especiales que vivimos junto a
            los niños y niñas. ¡Te invitamos a acompañar su día a día en el
            jardín!
          </CardDescription>
        </CardHeader>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-5">
        {newsData.map((news, index) => (
          <div className="flex flex-col">
            <ActivityCard
              key={index}
              title={news.title}
              date={""}
              description={news.description}
              photos={[]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
