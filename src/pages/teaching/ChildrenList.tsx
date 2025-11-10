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
import { listHallGreen } from "@/data/authData";

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
            En este espacio podés consultar la información importante de cada niño o niña que forma parte de la sala.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">ID</TableHead>
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Apellido</TableHead>
                <TableHead className="text-center">Fecha de Nacimiento</TableHead>
                <TableHead className="text-center">Teléfono</TableHead>
                <TableHead className="text-center">Contacto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listHallGreen.map((hall) => (
                <TableRow className="text-center" key={hall.id}>
                  <TableCell className="font-medium">{hall.id}</TableCell>
                  <TableCell className="font-medium">{hall.name}</TableCell>
                   <TableCell className="font-medium">{hall.lastName}</TableCell>
                    <TableCell className="font-medium">{hall.date}</TableCell>
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
