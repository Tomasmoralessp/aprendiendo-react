import { useEffect, useState } from "react"
import './App.css'

const CAT_END_POINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_URL = 'https://cataas.com'
export function App () {
  const [fact, setFact] = useState()
  const [imageURL, setImageURL] = useState(null)
  const [factError, setFactError] = useState()

  // Para recuperar la cita al cargar la página
  useEffect(() => {
    fetch(CAT_END_POINT_RANDOM_FACT)
      .then(response =>  response.json())
      // data devuelve todo el objeto y seleccionamos solo el fact
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
    
  },[])
 
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
  return (
    <main>
      <h1> App de Gatitos</h1>
      {fact && <p> {fact} </p>} 
      {imageURL && <img src={imageURL} alt={`Image generated using the first word retrieved from ${fact}`}/>}
    </main>
  )

}