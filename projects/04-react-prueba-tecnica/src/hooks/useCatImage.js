import { useEffect, useState} from "react"

export function useCatImage ({fact}) { 
  const [imageURL, setImageURL] = useState(null)
  // para recuperar una imagen cada vez que cambie el fact
  useEffect(() => {
    // Controlar cuando todavía no hay fact
    if (!fact) return 
    const threeFirstWords = fact.split(' ', 3).join(' ')
        // Hacer el fetch de datos con el otro endpoint
        fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&width=500&height=500`)
          .then( response => {
            const {url} = response
            setImageURL(url)
          }

          ) 
  }, [fact])
  return {imageURL}
}