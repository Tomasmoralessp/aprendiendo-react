import { useEffect, useState } from "react"
import './App.css'
import { useCatImage } from "./hooks/useCatImage.js"
import { useCatFact } from "./hooks/useCatFact.js"

const CAT_PREFIX_URL = 'https://cataas.com'


export function App () { 
  const { fact, refreshFact} = useCatFact()
  const {imageURL} = useCatImage({fact})
  const [factError, setFactError] = useState()

  const handleClick = async () => { 
    refreshFact ()
    
  }

  return (
    <main>
      <h1> App de Gatitos</h1>
      {fact && <p> {fact} </p>} 
      {imageURL && <img src={imageURL} alt={`Image generated using the first word retrieved from ${fact}`}/>}
      <button onClick={handleClick}> Get new Fact </button>
    </main>
  )

}