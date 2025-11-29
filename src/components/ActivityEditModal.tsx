import type { Activity } from "@/hook/useActivities";
import { useEffect, useState, type ChangeEvent } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, Save } from "lucide-react";
import { storage } from "@/firebase";
import { getDownloadURL, uploadBytes } from "firebase/storage";

interface ActivityEditModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Activity>) => Promise<boolean>;
}

export function ActivityEditModal({
  activity,
  isOpen,
  onClose,
  onSave,
}: ActivityEditModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  //Estado del formulario
  const [formData, setFormData] = useState<Partial<Activity>>({});

  //Url fotos existentes
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);

  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  //Actualizar el formulario cada vez que cambia
  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title,
        description: activity.description,
      });
      setExistingPhotos(Array.isArray(activity.photos) ? activity.photos : []); //validar que sea un array
      //Resetear lo nuevo
      setNewFiles([]);
      setNewPreviews([]);
    }
  }, [activity]);

  //Archivos nuevos
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);

      //Validar todas las fotos, nuevas, viejas
      const totalCount =
        existingPhotos.length + newFiles.length + selected.length;

      if (totalCount > 4) {
        alert(
          `Límite exedido. Tienes ${existingPhotos.length} guardadas y ${newFiles.length} nuevas.`
        );
        e.target.value = "";
        return;
      }

      //Generar Previews
      const urls = selected.map((file) => URL.createObjectURL(file));
      setNewPreviews((prev) => [...prev, ...urls]);
    }
  };

  //Borrar fotos ya subidas
  const removeExistingPhotos = (urlToRemove: string) => {
    setExistingPhotos((prev) => prev.filter((url) => url !== urlToRemove));
  };

  //Borrar foto nueva
  const removeNewFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  //Subida a Firebase
  const uploadImageToStorage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `activities/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  //Guardar cambios

  const handleSaveClick = async () => {
    if (!activity) return;

    setIsSaving(true);
    setUploadProgress("Procesando imagenes");

    try {
      let newPhotoUrls: string[] = [];
      if (newFiles.length > 0) {
        setUploadProgress(`Subiendo ${newFiles.length} fotos nuevas`);
        newPhotoUrls = await Promise.all(
          newFiles.map((file) => uploadImageToStorage(file))
        );
      }

      //Combinar las fotos anteriores + nuevas
      const finalPhotos = [...existingPhotos, ...newPhotoUrls];

      setUploadProgress("Actualizando base de datos");

      //Ejecutar la funcion
      const success = await onSave(activity.id, {
        ...formData,
        photos: finalPhotos,
      });
      setIsSaving(false);

      if (success) {
        onClose();
      }
    } catch (error) {
      console.error(error)
      alert('Error al guardar los cambios')
    } finally {
      setIsSaving(false)
      setUploadProgress("")
    }
  };

  //Calcular el final de fotos
  const currentTotalPhotos = existingPhotos.length + newFiles.length

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Actividad</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/*SECCION FOTOS*/}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSaveClick} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
