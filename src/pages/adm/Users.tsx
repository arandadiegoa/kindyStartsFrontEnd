import { GoBackButton } from "@/components/GoBackButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { users } from "@/data/serviceData";
import { Edit, PlusCircle, Trash } from "lucide-react";
import { Link } from "react-router-dom";

export function Users() {
  return (
    <div className="flex flex-col gap-6 m-3">
      <GoBackButton />

      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-3xl font-bold">Gestión de Usuarios</h1>
        <Button size="sm" asChild>
          <Link to="#"> {/*TO-DO /admin/users/new */}
            Agregar
            <PlusCircle className="mr-2 h-4 w-4 mt-1" />
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-3xl">Lista de Usuarios</CardTitle>
          <CardDescription>
            Aquí puedes agregar, editar y eliminar usuarios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Rol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.mail}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "admin" ? "default" : "outline"}
                    >
                      {user.role === "admin"
                        ? "Directora"
                        : user.role === "teaching"
                        ? "Docente"
                        : "Familia"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {user.role !== "admin" && (
                      <>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" className="text-destructive hover:text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
