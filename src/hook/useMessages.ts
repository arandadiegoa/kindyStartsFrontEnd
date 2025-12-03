import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

export interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

const API_URL = "http://localhost:3000/api/messages"

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  //Get messages
  const fetchMessages = useCallback(async () => {
    setIsLoading(true)

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No estas logueado")
      const token = await user.getIdToken()

      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al cargar los mensajes")

      const data = await res.json()

      //Get Messages Order By Desc
      const sortedData = Array.isArray(data)
        ? data.sort(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (a: any, b: any) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        : []

      setMessages(sortedData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Error:", error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, []);

  //Read status
  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No estas logueado")
      const token = await user.getIdToken()

      //Send !status
      const updates = { read: !currentStatus }

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Error al actualizar los mensajes")

      //Update
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, read: !currentStatus } : msg
        )
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert("Error" + error.message)
    }
  };

  //Delete message
  const deleteMessage = async (id: string) => {
    if (!confirm("¿Borrar este mensaje permanentemente?")) return;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No esta logueado")
      const token = await user.getIdToken()

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al eliminar")

      //Update
      setMessages((prev) => prev.filter((msg) => msg.id !== id))

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert("Error" + error.message)
    }
  };
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchMessages();
      } else {
        setIsLoading(false)
      }
    })
    return () => unsuscribe()
  }, [fetchMessages]);

  return {
    messages,
    isLoading,
    error,
    refetch: fetchMessages,
    toggleReadStatus,
    deleteMessage,
  };
}
