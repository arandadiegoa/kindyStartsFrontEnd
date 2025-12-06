import { formatDateForInput, type formatDate } from "@/lib/utils";
import { Dialog } from "../ui/dialog";

interface MomentsCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: {imageUrl: string; date: string}) => Promise<boolean>
}
export function MomentsCreateModal({ isOpen, onClose, onCreate }: MomentsCreateModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if(file) {
      const roader = new FileReader()
      roader.onloadend = () => {
        setImagePreview(roader.result as string)
      }
    }
  }

  const handleSubmit = async () => {
    if(!imagePreview) return

    setIsSubmitting(true)
    try {
      await onCreate({
        imageUrl: imagePreview,
        date: formatDateForInput(new Date())
      })
      setImagePreview(null)
      onClose()
    } catch (error) {
      console.log(error)
      alert("Error al subir la foto")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog>

    </Dialog>
  )
}