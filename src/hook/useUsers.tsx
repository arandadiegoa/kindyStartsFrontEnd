import { auth } from "@/firebase";
import { getAuthHeaders } from "@/lib/utils";
import { onAuthStateChanged } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

const API_URL = 'http://localhost:3000/api/users'

export interface UserData {
  uid: string
  name: string
  email: string
  role: 'admin' | 'teaching' | 'family'
  hall?: string
  parentName?: string
  phone?: string
}

export function useUsers(){
  const [users, setUsers] = useState<UserData[]>([])
  const [isLoading, setIsloading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  //Get
  const fetchUsers = useCallback(async () => {
    setIsloading(true)
    setError(null)

    try {
      const headers = await getAuthHeaders()
      const response = await fetch(API_URL, { headers })

      if(!response.ok){
        throw new Error('No se pudieron cargar los usuarios..')
      }

      const data = await response.json()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const safeData = data.map((u: any) => ({ ...u, uid: u.id || u.uid })) //usamos 'uid' como id
      setUsers(safeData)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log(error)
      setError(error.message || 'Error de conexión')
    } finally {
      setIsloading(false)
    }
  }, [])

  //Create
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createUser = async (userData: any) => {
      try {
        const headers = await getAuthHeaders()
        const res = await fetch(API_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify(userData)
        })

        if(!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.message || "Error al crear")
        }

        await fetchUsers()
        return true

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        alert(error.message)
        return false
      }
    }

    //Update
    const updateUser = async (uid: string, updates: Partial<UserData>) => {
      try {
        const headers = await getAuthHeaders()
        const res = await fetch(`${API_URL}/${uid}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(updates)
        })

        if(!res.ok) throw new Error('Error al actualizar')

        await fetchUsers()
        return true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        alert(error.message)
        return false
      }
    }
  
    //Delete users
    const deleteUser = async (uid: string) => {
      if(!confirm("¿Seguro que desea eliminar este usuario?")) return
      try {
        const headers = await getAuthHeaders()
        const res = await fetch(`${API_URL}/${uid}`, {
          method: 'DELETE',
          headers
        })

        if(!res.ok) throw new Error('Error al eliminar')
        setUsers(prev => prev.filter(u => u.uid !== uid))
        
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        alert(error.message)
      }
    }

  useEffect(() => {
    const unsuscribe = onAuthStateChanged( auth, (user) => {

      if(user) {
         fetchUsers()
      } else {
        setIsloading(false)
      }
    })
    return () => unsuscribe()
   
  }, [fetchUsers])

  return { users, isLoading, error, fetchUsers, createUser, updateUser, deleteUser }

}