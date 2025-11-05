import { Link } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight } from "lucide-react";

type LinkItem = {
  title: string;
  description: string;
  link: string;
};

interface CardLinksProps {
  title: string;
  subtitle: string;
  links: LinkItem[];
}

export function CardLinks({ title, subtitle, links }: CardLinksProps) {
  return (
    <div className="container mx-auto p-4 py-8 md:py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground mt-6">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((item) => (
          <Link
            to={item.link}
            key={item.title}
            className="block transition-transform duration-200
          hover:-translate-y-1 hover:shadow-lg
          rounded-lg
          "
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="flex-1">
                <CardTitle className="text-2xl mb-2">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <div className="flex items-center text-primary font-medium">
                  Ir ahora
                  <ArrowRight className="ml-2 h-4 w-4 mt-1" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
