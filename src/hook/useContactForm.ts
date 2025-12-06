import { useState } from "react";


const API_URL = 'http://localhost:3000/api/messages' 

export function useContactForm(){
  const [isSending, setIsSending] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessage = async (data:any) => {
    setIsSending(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })

      if(!response.ok) throw new Error('Error al enviar el mensaje')
      
      return true
    } catch (error) {
      console.log('Error :',error)
      alert('Hubo un problema al enviar el mensaje. Intenta nuevamente.')
      return false
    } finally {
      setIsSending(false)
    }
  }

  return { sendMessage, isSending}
}