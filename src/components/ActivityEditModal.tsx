import type { Activity } from "@/hook/useActivities";
import { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, Save } from "lucide-react";

interface ActivityEditModalProps {
  activity: Activity | null
  isOpen: boolean
  onClose: () => void
  onSave: (id: string, updates: Partial<Activity>) => Promise<boolean>
}

export function ActivityEditModal({ activity,isOpen,onClose,onSave}: ActivityEditModalProps) {

  const [formData, setFormData] = useState<Partial<Activity>>({})
  const [isSaving, setIsSaving] = useState(false)

  //Actualizar el formulario cada vez que cambia
  useEffect(() => {
    if(activity){
      setFormData({
        title: activity.title,
        description: activity.description
      })
    }
  }, [activity])

  const handleSaveClick = async () => {
    if(!activity) return

    setIsSaving(true)

    //Ejecutar la funcion
    const success = await onSave(activity.id, formData)
    setIsSaving(false)

    if(success) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Editar Actividad  
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value})} 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value})}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSaveClick} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ): (
              <Save className="mr-2 h-4 w-4" />
            )}
            Guardar
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}