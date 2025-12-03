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
import { useMessages } from "@/hook/useMessages";
import { cn } from "@/lib/utils";
import { Check, Loader2, Mail, MailOpen, Trash } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

export function Messages() {

  const { messages, isLoading, error, toggleReadStatus, deleteMessage } = useMessages()

  //State for selectedMessage to Panel
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)

  //Full object of the selected message
  const selectedMessage = messages.find(m => m.id === selectedMessageId)

  //Function to select
  const handleSelectMessage = (id: string) => {
    setSelectedMessageId(id)

  //Read to open
  const msg = messages.find( m => m.id === id)
  if (msg && !msg.read) toggleReadStatus(id, msg.read)

  }

  //Delete msg
  const handleMessageDelete = async (id: string) => {
    await deleteMessage(id)
    if (selectedMessageId === id) {
      setSelectedMessageId(null)
    }
  }

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
  if (error) return <div className="text-destructive p-10">Error: {error}</div>

  return (
    <div className="flex flex-col gap-6 h-full m-3">
      <GoBackButton />
      <CardHeader>
        <CardTitle>Mensajes Recibidos</CardTitle>
        <CardDescription>
          En esta sección podés visualizar los mensajes recibidos a través del
          formulario de contacto.
        </CardDescription>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/*Lista de Mensajes*/}
        <Card className="md:col-span-1 h-full">
          <CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {messages.length === 0 ? (
                  <p className="p-4 text-center text-sm text-muted-foreground">No hay mensajes.</p>
                  ): (
                  messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg.id)}
                    className={cn(
                      "flex flex-col items-start gap-1 border-b p-4 text-left",
                      "transition-colors hover:bg-muted/50",
                      selectedMessageId === msg.id && "bg-muted"
                    )}
                  >
                        <div className="flex items-center gap-2">
                      <p className="font-semibold">{msg.name}</p>
                      {!msg.read ? (
                        <Badge variant="destructive">Nuevo</Badge>
                      ) : (
                        <Badge variant="default">Leido</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {msg.message}
                    </p>
                  </button>
                  )))
                }
              </div>
            </CardContent>
          </CardHeader>
        </Card>

        {/*Panel de Lectura*/}
        <div className="md:col-span-2 h-full">
          {selectedMessage ? (
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between border-b">
                <div>
                  <CardTitle className="text-sm md:text-1xl">
                    {selectedMessage.subject}
                  </CardTitle>
                  <CardDescription className="flex flex-col gap-1" >
                    <span className="font-semibold text-foreground">{selectedMessage.name}</span>
                    <span>{selectedMessage.email}</span>
                    <span>{formatDate(selectedMessage.date)}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <Button
                      variant="ghost"
                      size="icon"
                      title={selectedMessage.read ? "Marcar como no leído" : "Marcar como leído"}
                      onClick={() => toggleReadStatus(selectedMessage.id, selectedMessage.read)}
                    >
                      {selectedMessage.read ? (
                        <MailOpen className="h-4 w-4 text-muted-foreground" />
                      ): (
                          <Check className="h-4 w-4 text-blue-600" />
                      )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    title="Eliminar"
                    onClick={() => handleMessageDelete(selectedMessage.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                 
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-base whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border-dashed bg-background p-6">
              <div className="text-center">
                <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-xl font-semibold">
                  Selecciona un mensaje
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Elige un mensaje de la lista para leer su contenido aquí.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
