import { auth } from "@/firebase";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type DateInput = string | number | Date | { seconds: number; nanoseconds?: number } | null | undefined

export const formatDate = (date: DateInput) => {
  if(date === null || date === undefined || date === "") return "-";

  try {
    const dateObj = normalizeDate(date)

    //Validate incorrect Date
    if( isNaN(dateObj.getTime())) return String(date)

     return new Intl.DateTimeFormat('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(dateObj) 

  } catch (error) {
    console.log('Error formateando fecha', date, error)
    return String(date)
  }
}

//Convert any format to YYYY-MM-DD
export const formatDateForInput = (date: DateInput) => {
  if(!date) return ""

  try {
    const d = normalizeDate(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  } catch (error) {
    console.log(error)
    return ""
  }
} 

const normalizeDate = ( date: DateInput): Date => {
  if(date instanceof Date) return date
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if(typeof date === 'object' && date !== null && 'seconds' in (date as any)) {
    return new Date((date as { seconds: number }).seconds * 1000)
  }
   // 3. string "YYYY-MM-DD" exacto (evitar conversión UTC)
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [y, m, d] = date.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  // 4. String ISO o Number
  return new Date(date as string | number);
}

export const getAuthHeaders = async () => {
  const user = auth.currentUser
  
  if(!user) throw new Error('No estas logueado')
  
  const token = await user.getIdToken()

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
    
}