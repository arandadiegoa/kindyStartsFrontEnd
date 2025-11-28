import type { Activity } from "@/hook/useActivities";
import { useState, type ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ImageIcon, Loader2, Plus, X } from "lucide-react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";

interface ActivityCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (activity: Omit<Activity, "id">) => Promise<boolean>;
}

export function ActivityCreateModal({
  isOpen,
  onClose,
  onCreate,
}: ActivityCreateModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  //Estado inicial
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString(), //fecha de hoy por default
    photos: [] as string[],
  });

  //Estado local para manejar el archivo
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  //Manejo de archivo local
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      //Url temporal para el preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  //Limpiar la foto seleccionada
  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  //Subida a Firebase Storage
  const uploadImageStorage = async (file: File): Promise<string> => {

    //Referencia
    const storageRef = ref(storage, `activities/${Date.now()}-${file.name}`);

    //Subimos el archivo
    const snapshot = await uploadBytes(storageRef, file);

    //Obtenemos la URL pública
    const dowloadURL = await getDownloadURL(snapshot.ref);

    return dowloadURL;
  };

  //Guardar la foto
  const handleSubmit = async () => {
    if (!formData.title || !formData.description) return;

    setIsSaving(true);
    setUploadProgress("Subiendo imagen...");

    try {
      let finalPhotos = [...formData.photos];

      if (selectedFile) {
        const url = await uploadImageStorage(selectedFile);
        finalPhotos = [url];
      }

      setUploadProgress("Guardando datos...");

      //Guardar la actividad en la BD
      const success = await onCreate({
        ...formData,
        photos: finalPhotos,
      });

      if (success) {
        //Limpiar el formulario
        setFormData({
          title: "",
          description: "",
          date: new Date().toISOString(),
          photos: [],
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        onClose();
      }
    } catch (error) {
      console.log("Error en el proceso de creación", error);
      alert("Hubo un error al crear la actividad");
    } finally {
      setIsSaving(false);
      setUploadProgress("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva Actividad</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Titulo</Label>
            <Input
              id="create-title"
              placeholder="Ej: clase de musica"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">Descripción</Label>
            <Textarea
              id="create-dec"
              placeholder="Detalles de la activiadad"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/*Imagen*/}
          <div className="grid gap-2">
            <Label>Fotografia</Label>

            {!previewUrl ? (
              // DROPZONE / INPUT
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border-muted-foreground/25">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Subir foto</span>
                    </p>
                    <p className="text-xs text-muted-foreground">JPG, PNG</p>
                  </div>
                  <Input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            ) : (
              // PREVIEW
              <div className="relative rounded-lg overflow-hidden border aspect-video group">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {/* Botón para quitar la foto */}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleRemovePhoto}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving || !formData.title}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {uploadProgress || "Guardando..."}
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Crear Actividad
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
