import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

function GameSelector() {
  const [games, setGames] = useState<any>()

  useEffect(() => {
    async function fetchData() {
      const gamesRes = await axios.get(`https://pokeapi.co/api/v2/version-group/?offset=0&limit=999`)
      const gamesData = gamesRes.data.results
      setGame(gamesDatas)
    }
    fetchData()
  }, [])

  return (
      games.map ((game: any) =>
        <Text>
          {game.name}
        </Text>
      )
    )
}

export default GameSelector