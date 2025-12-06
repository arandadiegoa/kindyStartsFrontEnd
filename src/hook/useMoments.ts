import { auth, db } from "@/firebase";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export interface Moment {
  id: string;
  imageUrl: string;
  date: string;
}

//Evitar errores de TypeScript
declare const __app_id: string;

export function useMoments() {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const appId = typeof __app_id !== "undefined" ? __app_id : "teaching-photos";

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setIsloading(false);
      return;
    }

    //Buscar en la coleccion moments
    const q = query(
      collection(db, "artifacts", appId, "public", "data", "moments")
    );

    //onSnapshot actualiza solo al subir fotos
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Moment[];

        setMoments(data);
        setIsloading(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: any) => {
        console.log("Error fetching moments: ", error);
        setError("No se pudieron cargar los momentos")
      }
    );
    return () => unsubscribe()
  }, [appId]);

  //Create
  const createMoment = async (momentData: Omit<Moment, "id">) => {
    try {
      if(momentData.imageUrl.length > 1000000) {
        throw new Error("La imagen es demasiado pasada (máx 1MB).")
      }

      await addDoc(collection(db, 'artifacts', appId, 'public', 'moments'), momentData)
      return true
    } catch (error) {
      console.error("Error creating moments:" , error)
      throw error
    }
  }

  //Update
  const updateMoment = async (id: string, updates: Partial<Moment>) => {
    try {
      const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'moments', id)
      await updateDoc(docRef, updates)
      return true
    } catch (error) {
      console.log('Error updating moment:', error)
      return false      
    }
  }

  //Delete
  const deleteMoment = async (id: string) => {
    if(!confirm("¿Estás seguro de que querés borrar esta foto?")) return

    try {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'moments', id))
    } catch (error) {
      console.log("Error deleting moment", error)
    }
  }

  return { moments, isLoading, error, createMoment, updateMoment, deleteMoment}
}
