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
import { messagesData as initialMessage } from "@/data/messageData";
import { cn } from "@/lib/utils";
import { Archive, Check, Mail, Trash } from "lucide-react";
import { useState } from "react";

export function Messages() {
  const [messages, setMessages] = useState(initialMessage);

  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    messages[0]?.id || null
  );

  const selectedMessage = messages.find((msg) => msg.id === selectedMessageId);

  const handleSelectMessage = (id: number) => {
    setSelectedMessageId(id);
  };

  //Cambiar el estado de los mensajes
  const handleStatusMessage = (id: number) => {
    setMessages((prevMsg) =>
      prevMsg.map((msg) => {
        if (msg.id === id) {
          return { ...msg, estado: "Leido" };
        }
        return msg;
      })
    );
  };

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full ">
        {/*Lista de Mensajes*/}
        <Card className="md:col-span-1 h-full">
          <CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {messages.map((msg) => (
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
                      <p className="font-semibold">{msg.nombre}</p>
                      {msg.estado === "Pendiente" ? (
                        <Badge variant="destructive">Nuevo</Badge>
                      ) : (
                        <Badge variant="default">Leido</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {msg.descripcion}
                    </p>
                  </button>
                ))}
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
                    {selectedMessage.nombre}
                  </CardTitle>
                  <CardDescription>
                    {selectedMessage.email} | {selectedMessage.telefono}
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  {selectedMessage.estado === "Pendiente" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStatusMessage(selectedMessage.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-base whitespace-pre-wrap">
                  {selectedMessage.descripcion}
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
