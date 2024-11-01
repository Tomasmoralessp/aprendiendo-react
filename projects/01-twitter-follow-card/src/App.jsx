import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App () {
  const users = [
    {
      userName: "midudev",
      name: "Miguel Ángel Durán",
      isFollowing: true,
    },
    {
      userName: "pheralb",
      name: "Pablo Heraldo",
      isFollowing: false,
    },
    {
      userName: "PacoHdez",
      name: "Paco Hernández",
      isFollowing: true,
    },
    {
      userName: "TMChein",
      name: "Tomás Morales",
      isFollowing: false,
    },
  ]
  
  // Verifica que users es un array
  console.log(Array.isArray(users)) // Debería imprimir "true"
  
  return (
    <section className="App">
      {
        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard
            key={userName} // Añade una key única aquí
            userName={userName}
            isFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}
