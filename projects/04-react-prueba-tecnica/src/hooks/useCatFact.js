import { getRandomFact } from "../services/facts"
import { useState, useEffect } from "react"

export const useCatFact = () => {
  const [fact, setFact] = useState()
  
  const refreshFact = () => {
     getRandomFact().then(setFact)
  } 

  useEffect(refreshFact, [])
 
  return {fact, refreshFact}
}