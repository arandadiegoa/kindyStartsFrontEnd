import { GoBackButton } from "@/components/GoBackButton";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listHallGreen } from "@/data/serviceData";

export function ChildrenList() {
  return (
    <div className="flex flex-col gap-6 m-3">
      <GoBackButton />

      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-3xl font-bold bg-green-300">Sala Verde</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-3xl">“Los peques de la Sala 🌼”</CardTitle>
          <CardDescription>
            Aquí puedes ver la Información importante de cada niño/a
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Edad</TableHead>
                 <TableHead>Teléfono</TableHead>
                  <TableHead>Contacto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listHallGreen.map((hall) => (
                <TableRow key={hall.id}>
                  <TableCell className="font-medium">{hall.id}</TableCell>
                  <TableCell className="font-medium">{hall.name}</TableCell>
                   <TableCell className="font-medium">{hall.lastName}</TableCell>
                    <TableCell className="font-medium">{hall.age}</TableCell>
                    <TableCell className="font-medium">{hall.telephone}</TableCell>
                  <TableCell className="font-medium">{hall.contact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
