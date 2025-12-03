import { GoBackButton } from "@/components/GoBackButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useUsers, type UserData } from "@/hook/useUsers";
import {
  Edit,
  GraduationCap,
  Loader2,
  PlusCircle,
  Shield,
  Trash,
  User,
} from "lucide-react";
import { UserFormModal } from "@/components/UserFormModal";
import { useState } from "react";

export function Users() {
  const { users, isLoading, error, createUser, updateUser, deleteUser } =
    useUsers();

  //State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  //Open modal for Create
  const handleOpenCreate = () => {
    setEditingUser(null); //cleant for create
    setIsModalOpen(true);
  };

  //Open modal for Edit
  const handleOpenEdit = (user: UserData) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  //Save
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = async (formData: any) => {
    if (editingUser) {
      return await updateUser(editingUser.uid, formData);
    } else {
      return await createUser(formData);
    }
  };

  //Helpers
  const getRolelabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Directora";
      case "teaching":
        return "Maestra";
      default:
        return "Familia";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 mr-1 text-red-500" />;
      case "teaching":
        return <GraduationCap className="h-4 w-4 mr-1 text-blue-500" />;
      default:
        return <User className="h-4 w-4 mr-1 text-green-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 m-3">
      <GoBackButton />

      <div className="flex items-center justify-between">
        <CardHeader className="p-0">
          <CardTitle>Administración de Usuarios</CardTitle>
          <CardDescription>
            Gestioná la información de los usuarios del sistema.
          </CardDescription>
        </CardHeader>
        <Button size="sm" onClick={() => handleOpenCreate()}>
          Agregar
          <PlusCircle className="mr-2 h-4 w-4 ml-2" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Lista de Usuarios ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre / Alumno</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Sala</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground ">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Cargando usuarios...
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.uid}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="text-base">{user.name}</span>
                        {user.parentName && (
                          <span className="text-xs text-muted-foreground">Tutor: {user.parentName}</span>
                        )}
                        <span className="md:hidden text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getRoleIcon(user.role)}
                      <Badge
                        variant={user.role === "admin" ? "default" : "outline"}>
                        {getRolelabel(user.role)}
                      </Badge>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium">{user.hall || "-"}</TableCell>
                    
                    <TableCell className="text-right">
                
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEdit(user)}
                          >
                            <Edit className="h-4 w-4 text-muted-foreground hover:text-primary" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => deleteUser(user.uid)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {error && (
            <div className="mt-4">
              <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userToEdit={editingUser}
        onSave={handleSave}
      />
    </div>
  );
}
