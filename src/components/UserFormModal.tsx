import type { UserData } from "@/hook/useUsers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Save, UserPlus } from "lucide-react";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  userToEdit: UserData | null; //if null ? Create : Edit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (data: any) => Promise<boolean>;
}

const userSchema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().optional(),
  role: z.enum(["admin", "teaching", "family"]),
  parentName: z.string().optional(),
  hall: z.string().optional(),
  phone: z.string().optional(),
});

export function UserFormModal({
  isOpen,
  onClose,
  userToEdit,
  onSave,
}: UserFormModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = !!userToEdit; //convert strict boolean value

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "family",
      parentName: "",
      hall: "",
      phone: "",
    },
  });

  //isEditing
  useEffect(() => {
    if (userToEdit) {
      form.reset({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
        hall: userToEdit.hall,
        parentName: userToEdit.parentName || "",
        phone: userToEdit.phone || "",
        password: "",
      });
    } else {
      form.reset({
        name: "",
        email: "",
        password: "",
        role: "family",
        parentName: "",
        hall: "",
        phone: "",
      });
    }
  }, [userToEdit, isOpen, form]);

  const selectedRole = form.watch("role");

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    //Validate password for creation
    if (!isEditing && (!values.password || values.password.length < 6)) {
      form.setError("password", {
        message: "Contraseña requerida (min 6 caracteres)",
      });
      return;
    }
    setIsSaving(true);

    //Clean empty fields
    const dataToSend = { ...values }; //copy values
    if (dataToSend.role !== "family") delete dataToSend.parentName;
    if (isEditing) delete dataToSend.password; //Not send password for edit

    const success = await onSave(dataToSend);
    setIsSaving(false);

    if (success) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los datos del perfil."
              : "Crea una nueva cuenta de acceso."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isEditing}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="family">Familia</SelectItem>
                        <SelectItem value="teaching">Docente</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hall"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sala</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Sala Roja"
                        {...field}
                        value={field.value as string}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {selectedRole === "family"
                      ? "Nombre del alumno"
                      : "Nombre Completo"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} value={(field.value as string) || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedRole === "family" && (
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Tutor/Padre/Madre</FormLabel>
                    <FormControl>
                      <Input {...field} value={(field.value as string) || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        value={(field.value as string) || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isEditing && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          value={(field.value as string) || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            <FormField control={form.control} name="phone" render={({field}) => (
              <FormItem>
                <FormLabel>Teléfono (Opcional)</FormLabel>
                <FormControl>
                  <Input {...field} value={(field.value as string) || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (isEditing ? <Save className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4 />" />)}
              {isEditing ? "Guardar Cambios" : "Crear Usuario"}
            </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
