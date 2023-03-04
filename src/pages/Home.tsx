import { StatusBar, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';


export default function Home() {
  const [pokemon, setPokemon] = useState<any>([])
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)
      const data = res.data
      const result = data.results
      const pokeData = await Promise.all(result.map(async (result: { url: string }) => {
        const res = await axios.get(result.url)
        const data = res.data
        return data
      }))
      setPokemon(pokeData)
    }
    fetchData()
  }, [])

  

  return (
    <View >
      <StatusBar barStyle={'light-content'} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row flex-wrap gap-2 justify-center py-4">
          {
            pokemon.map((pokemon: any, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate('Pokemon', { id: pokemon.id })}
                  className="bg-neutral-300 rounded-md flex flex-col items-center w-24"
                >
                  <Image
                    style={{ width: 96, height: 96 }}
                    source={{ uri: pokemon.sprites.front_default }}
                  />
                  <Text>{pokemon.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>

      </ScrollView>

      {/* <ScrollView>
        {
          pokemon ? (
            pokemon?.map((pokemon: any, index: number) => {
              return (
                <TouchableOpacity activeOpacity={0.6} key={index}>
                  <Image style={{width: 96, height: 96,}} source={{ uri: pokemon.sprites.front_default }} />
                  <Text >{pokemon.name}</Text>
                </TouchableOpacity>
              )
            })
          ) : (
            <View >
              <Text >Carregando...</Text>
            </View>
          )
        }
      </ScrollView> */}

    </View >
  );
}

