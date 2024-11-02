import { useEffect, useState } from 'react'
import './App.css'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [angle, setAngle] = useState(0)
  const radius = 50 

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
      console.log('Efecto:', { enabled })
    }

    return () => {
      console.log('cleanup position')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  useEffect(() => {
    let animationFrameId
    if (enabled) {
      const animate = () => {
        setAngle(prevAngle => prevAngle + 0.05) // Aumenta el ángulo para crear la rotación
        animationFrameId = requestAnimationFrame(animate)
      }
      animate()
    }
    return () => {
      console.log('cleanup animation')
      cancelAnimationFrame(animationFrameId)
    }
    
  }, [enabled])

  const orbitX = position.x + Math.cos(angle) * radius
  const orbitY = position.y + Math.sin(angle) * radius
  
  
  return (
    <>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'black',
          borderRadius: '50%',
          border: '1px solid #fff',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${orbitX}px, ${orbitY}px)`,
        }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} órbita
      </button>
    </>
  )
}

function App() {
  return (
    <main>
     <FollowMouse/>
    </main>
  )

  
}

export default App
