import type { News } from "@/hook/useNews";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { formatDateForInput } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader2, Save } from "lucide-react";

interface NewsEditModalProps {
  news: News | null
  isOpen: boolean
  onClose: () => void
  onSave: (id: string, updates: Partial<News>) => Promise<boolean>
}
export function NewsEditModal({ news, isOpen, onClose, onSave }: NewsEditModalProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [uploadProgress, setUploadProgress] = useState("")

  //Form State
  const [formData, setFormData] = useState<Partial<News>>({
    title: "",
    description: "",
    date: ""
  })


  //Update Form
  useEffect(() => {
    if(news) {
      setFormData({
        title: news.title,
        description: news.description,
        date: news.date
      })
    }
  }, [news])

  const handleSaveClick = async () => {
    if(!news) return

    setIsSaving(true)
    setUploadProgress("Procesando novedades")

    try {
      setUploadProgress("Actualizando Base de datos")

      const success = await onSave(news.id, formData)

      setIsSaving(false)
      if(success){
        onClose()
      }

    } catch (error) {
      console.log(error)
      alert("Error al guardar los cambios")
    } finally {
      setIsSaving(false)
      setUploadProgress("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>Editar novedad</DialogTitle>
          <DialogDescription>
            Modificá los detalles de la novedad y no te olvides de guardar los cambios.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 pt-2 grid gap-4">
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

          <div className="grid gap-2">
            <Label>Fecha</Label>
            <Input 
              id="date"
              type="date"
              value={formatDateForInput(formData.date)}
              onChange={(e) => {
                setFormData({ ...formData, date: e.target.value})
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSaveClick} disabled={isSaving}>
            {isSaving ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {uploadProgress || "Guardando..."}
              </>
            ): (
              <>
              <Save className="mr-2 h-4 w-4" />
              Guardar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}