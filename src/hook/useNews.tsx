import { auth } from "@/firebase"
import { useCallback, useEffect, useState } from "react"

export interface News {
  id: string
  title: string
  description: string
  date: string
}

export function useNews() {
  const [news, setNews] = useState<News[]>([])
  const [isLoading, setIsloading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  //Create news

  const createNews = async(newNews: Omit<News, 'id'>) => {
    try {
      const user = auth.currentUser
      if(!user) throw new Error('No estas logueado')
      const token = await user.getIdToken()
      const response = await fetch('http://localhost:3000/api/news', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'},
        body: JSON.stringify(newNews)
      })

      if(!response) throw new Error('Error del servidor o permiso denegado')
      
      const responseBackend = await response.json()

      //Create Object
      const newsToDisplay = {
        ...newNews,
        id: responseBackend.id
      }

      //Save
      setNews(prev => [...prev, newsToDisplay])
      return true

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log('Error', error)
      alert('Error al crear la noticia' + error.message)
      return false
    }
  }

  //GET news
  const fetchNews = useCallback(async () => {
    setIsloading(true)

    try {
      const res = await fetch('http://localhost:3000/api/news')
      if(!res.ok) throw new Error('Error al cargar las noticias')
       const data = await res.json()
      setNews(data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      setError(error.message)
    } finally {
      setIsloading(false)
    }
  }, [])

  //Delete
  const deleteNews = async (id: string) => {

    if(!id) {
      alert('Error el ID de la noticia no existe')
      return
    }

    if(!confirm("¿Seguro desea eliminar la noticia?")) return

    try {
      const user = auth.currentUser
      if(!user) throw new Error('No estas logueado')
      const token = await user.getIdToken()
      
      const res = await fetch(`http://localhost:3000/api/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if(!res.ok) throw new Error("Error del servidor o permiso denegado")
      setNews(prev => prev.filter(news => news.id !== id))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log('Error', error)  
      alert("Error al eliminar" + error.message)
    }
  }

  //UPDATE news
  const updateNews = async (id: string, updates: Partial<News>) => {

    try {
      const user = auth.currentUser
      if(!user) throw new Error('No estas logueado')
      
      const token = await user.getIdToken()

      const res = await fetch(`http://localhost:3000/api/news/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      })

      if(!res.ok) throw new Error("Error del servidor o permiso denegado")
      
        await fetchNews()
        return true

    } catch (error) {
      console.log('Error', error)
      alert('Error al actualizar')
      return false
    }
  }

  useEffect(() => {
    fetchNews()
  },[fetchNews])

  return {
    news,
    isLoading, 
    error,
    refetch: fetchNews,
    deleteNews,
    updateNews,
    createNews
  }
}