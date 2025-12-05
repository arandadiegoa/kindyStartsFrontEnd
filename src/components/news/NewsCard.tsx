import { formatDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Dialog } from "../ui/dialog";
import { useState } from "react";

interface NewsCardProps {
  title: string;
  date: string | Date | { seconds: number } | null | undefined;
  description: string;
}

export function NewsCard({ title, date, description }: NewsCardProps) {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl md:text-3xl">{title}</CardTitle>
          <CardDescription>{formatDate(date)}</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        </CardContent>
      </Card>
    </Dialog>
  );
}
