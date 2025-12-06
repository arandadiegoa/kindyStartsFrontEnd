import { auth } from "@/firebase"
import { useCallback, useEffect, useState } from "react"

export interface Activity {
  id: string
  title: string
  description: string
  date: string
  photos: string[]
}
export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  //Crear actividad
  const createActivity = async(newActivity: Omit<Activity, 'id'>) => {
    try {

      const user = auth.currentUser

      if(!user) throw new Error("No estás logueado")

      const token = await user.getIdToken()
      
      const response = await fetch('http://localhost:3000/api/activities', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' },
        body: JSON.stringify(newActivity),
      })

      if (!response.ok) throw new Error('Error del servidor o permiso denegado')

        const responseBackend = await response.json() //id + message

        //Creamos el objeto
        const activityToDisplay = {
          ...newActivity,
          id: responseBackend.id
        }
        
        //Guardamos en el estado ese objeto completo
        setActivities(prev => [...prev, activityToDisplay])

        return true

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log('Error', error)
      alert('Error al crear actividades' + error.message)
      return false
    }
  }

  //Obtener todas las actividades
  const fecthActivities = useCallback(async () => {
    setIsloading(true)
    try {
      const res = await fetch('http://localhost:3000/api/activities')
      if(!res.ok) throw new Error('Error al cargar las actividades')
        const data = await res.json()
      setActivities(data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      setError(error.message)
    }finally {
      setIsloading(false)
    }
  }, [])

  //Borrar actividad
  const deleteActivity = async (id: string) => {
    
    if(!id){
      alert('Error el ID de la actividad no existe')
      return
    }
    
    if(!confirm("¿Seguro que desea eliminar la actividad?")) return

    try {
      const user = auth.currentUser
      if(!user) throw new Error("No estas logueado")
      const token = await user.getIdToken()

      const response = await fetch(`http://localhost:3000/api/activities/${id}`, {
         method: 'DELETE',
         headers: {
          'Authorization': `Bearer ${token}`
         } 
        })

      if(!response.ok) throw new Error("Error del servidor o permiso denegado")
        
      setActivities(prev => prev.filter(act => act.id !== id))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log("Error:", error)
      alert("Error al eliminar" + error.message)
    }
  }

  //Actualizar actividad
  const updateActivity = async (id: string, updates: Partial<Activity>) => {
      
    try {

      const user = auth.currentUser
      if(!user) throw new Error("No estás logueado")
      
      const token = await user.getIdToken()

      const response = await fetch(`http://localhost:3000/api/activities/${id}`, {
        method: 'PATCH',
        headers: {   
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(updates)
      })

      if(!response.ok) throw new Error("Error del servidor o permiso denegado")
   
    await fecthActivities();
    return true
      
    } catch (error) {
      console.log('Error', error)
      alert('Error al actualizar')
      return false
    }
  }

  useEffect(() => {
    fecthActivities()
  }, [fecthActivities])

  return {
    activities,
    isLoading,
    error,
    refetch: fecthActivities,
    deleteActivity,
    updateActivity,
    createActivity
  }
}