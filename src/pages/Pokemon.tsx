import { Image, ScrollView, Text, TouchableOpacity, View, Animated } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Types from '../components/Types';
import { LinearGradient } from 'expo-linear-gradient';
import Status from '../components/Status';
import GameSelector from '../components/GameSelector';


type PokemonProps = {
  route: {
    params: {
      id: number;
    }
  }
};

export default function Pokemon({ route }: PokemonProps) {
  const { id } = route.params;
  const [pokemon, setPokemon] = useState<any>();
  const [currentId, setCurrentId] = useState<number>(id);
  const [specie, setSpecie] = useState<any>([])
  const navigation = useNavigation();
  const [games, setGames] = useState("sword-shield")
  const [method, setMethod] = useState("level-up")

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentId}`);
      setPokemon(res.data);
    }
    fetchData();
  }, [currentId]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${currentId}`);
      setSpecie(res.data);
    }
    fetchData();
  }, [currentId]);

  function handleNext() {
    ((currentId + 1) <= 1008)
      ? setCurrentId(currentId + 1)
      : null
  }

  function handlePrev() {
    ((currentId - 1) >= 1)
      ? setCurrentId(currentId - 1)
      : null
  }

  if (!pokemon || !specie) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  }

  function typeColor(type: string) {
    let color: any = "#AAA67F"

    if (type == "bug") {
      color = "#A7B723"
    }

    if (type == "dark") {
      color = "#75574C"
    }

    if (type == "dragon") {
      color = "#7037FF"
    }

    if (type == "electric") {
      color = "#F9CF30"
    }

    if (type == "fairy") {
      color = "#E69EAC"
    }

    if (type == "fighting") {
      color = "#C12239"
    }

    if (type == "fire") {
      color = "#F57D31"
    }

    if (type == "flying") {
      color = "#A891EC"
    }

    if (type == "ghost") {
      color = "#70559B"
    }

    if (type == "grass") {
      color = "#74CB48"
    }

    if (type == "ground") {
      color = "#DEC16B"
    }

    if (type == "ice") {
      color = "#9AD6DF"
    }

    if (type == "normal") {
      color = "#AAA67F"
    }

    if (type == "poison") {
      color = "#A43E9E"
    }

    if (type == "psychic") {
      color = "#FB5584"
    }

    if (type == "rock") {
      color = "#B69E31"
    }

    if (type == "steel") {
      color = "#B7B9D0"
    }

    if (type == "water") {
      color = "#6493EB"
    }

    return color
  }

  function RemoveSlash(text: string) {
    if (text == "black-2-white-2") {
      return "Black 2 / White 2"
    }
    else if (text == "omega-ruby-alpha-sapphire") {
      return "Ω Ruby / α Sapphire"
    }
    else if (text == "ultra-sun-ultra-moon") {
      return "Ultra Sun / Ultra Moon"
    }
    else if (text == "lets-go-pikachu-lets-go-eevee") {
      return "let's go pikachu / eevee"
    }
    else {
      return text.replace("-", " / ")
    }
  }

  return (
    <LinearGradient
      start={[0, 0]}
      end={[1, 0]}
      colors={
        (pokemon.types.length == 1)
          ? [typeColor(pokemon.types[0].type.name), typeColor(pokemon.types[0].type.name)]
          : [typeColor(pokemon.types[0].type.name), typeColor(pokemon.types[1].type.name)]
      }
    >
      <View className="absolute z-50 px-2 pt-6">

        <View className="flex flex-row items-center justify-between fixed top-0">
          <View className="flex flex-row gap-4 items-center">

            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Home")} className="h-8 w-8 flex items-center justify-center">
              <Icon name="arrow-left" size={32} color={"#000"} />
            </TouchableOpacity>

            <Text className="text-[#000] font-medium text-2xl capitalize ">
              {pokemon.name}
            </Text>
          </View>

          <Text className="text-[#000] font-medium text-base">
            # {pokemon.id}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between fixed">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePrev}
            className="h-48 w-11 justify-center items-center text-center"
          >
            <Icon name="chevron-left" size={32} color={((currentId) <= 1) ? "#595959" : "#D3D3D3"} />
          </TouchableOpacity>

          <Image style={{ width: 236, height: 236 }} source={{ uri: pokemon.sprites.other['official-artwork'].front_default }} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleNext}
            className="h-48 w-11 justify-center items-center text-center"
          >
            <Icon name="chevron-right" size={32} color={((currentId) >= 1008) ? "#595959" : "#D3D3D3"} />
          </TouchableOpacity>
        </View>
      </View>

      <Image source={require("../assets/PokeBall.png")}
        className={`absolute z-500`}
        style={{ marginLeft: (Math.floor(Math.random() * (110 - 0 + 1) + 0)), transform: [{ rotate: `${Math.floor(Math.random() * (90 - 0 + 1) + 0)}deg` }] }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={`px-2 pt-6 mt-48`} >

          <View className="bg-white items-center h-full rounded-t-[32px] pt-24">


            <View className="flex flex-row justify-evenly w-full px-12">
              {
                pokemon.types.map((type: { type: { name: string } }, index: number) => (
                  <Types key={index} type={type.type.name} />
                ))
              }
            </View>

            <View className="flex justify-center w-80 h-11 mt-4">
              <Text className="text-[#595959] text-xs text-center px-2">
                {
                  (specie?.flavor_text_entries.find((entry: { language: { name: string } }) => entry.language.name === "en")?.flavor_text == null)
                    ? "description not found"
                    : specie.flavor_text_entries.find((entry: { language: { name: string } }) => entry.language.name === "en").flavor_text.replace(/(?:\r\n|\r|\n|\t)/g, ' ')

                }
              </Text>
            </View>

            <View className="w-80 h-[2px] bg-[#d3d3d3] mt-4" />

            <View className="flex flex-row justify-evenly w-full mt-4">

              <View className="flex flex-col items-center justify-center w-20">

                <Icon name="weight-hanging" size={24} color={'#595959'} />

                <Text className="text-[#595959] font-regular text-xs my-3">
                  {pokemon.weight / 10}
                </Text>

                <Text className="text-[#595959] font-regular text-xs">
                  Kilos
                </Text>
              </View>
              <View className="w-[2px] h-20 bg-[#d3d3d3]" />

              <View className="flex flex-col items-center justify-center w-20">
                <Icon name="ruler-vertical" size={24} color={'#595959'} />

                <Text className="text-[#595959] font-regular text-xs my-3">
                  {pokemon.height / 10}
                </Text>

                <Text className="text-[#595959] font-regular text-xs">
                  Meters
                </Text>
              </View>
            </View>

            <View className="w-80 h-[2px] bg-[#d3d3d3] mt-4" />

            <View className="flex flex-col mt-4 w-full px-8">
              <Text className="text-sm font-bold text-[#595959] mb-2">Status</Text>
              {
                pokemon.stats.map(stat =>
                  <View>
                    <Status
                      statName={stat.stat.name}
                      baseStat={stat.base_stat}
                      type={typeColor(pokemon.types[0].type.name)}
                    />
                  </View>
                )
              }
            </View>

            <View className="w-80 h-[2px] bg-[#d3d3d3] mt-4" />

            <View className="flex flex-col mt-4 w-full px-8">
              <Text className="text-sm font-bold text-[#595959] mb-4">Abilities</Text>
              {
                pokemon.abilities.map((abilitie: { is_hidden: string, ability: { name: string } }) =>
                  (abilitie.is_hidden) ?
                    <Text className="text-[#595959] font-regular text-xs mb-4">
                      {abilitie.ability.name} - HIDDEN
                    </Text>
                    :
                    <Text className="text-[#595959] font-regular text-xs mb-4">
                      {abilitie.ability.name}
                    </Text>
                )
              }
            </View>

            <View className="w-80 h-[2px] bg-[#d3d3d3]" />

            <View className="flex flex-col mt-4 w-full">

              <Text className="text-sm font-bold text-[#595959] mb-4 px-8">Moves</Text>



              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  className="flex flex-row justify-center items-center w-full"
                  style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 32 }}
                >
                  {pokemon.moves.reduce((uniqueVersions, move) => {
                    move.version_group_details.forEach(version => {
                      const versionName = version.move_learn_method.name;
                      if (!uniqueVersions.includes(versionName)) {
                        uniqueVersions.push(versionName);
                      }
                    });
                    return uniqueVersions;
                  }, []).map((versionName: any, index: number) => (
                    <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => setMethod(versionName)} className="min-w-[96px] mx-3 text-center leading-8 rounded-full capitalize">
                      <Text
                        style={
                          (versionName == method) ? { backgroundColor: "#80ff80" } : { backgroundColor: "#D3D3D3" }
                        }
                        className="text-center leading-8 rounded-full capitalize"
                      >
                        {versionName.replace("-", " ")}
                      </Text>
                    </TouchableOpacity>

                  ))}
                </View>
              </ScrollView>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  className="flex flex-row justify-center items-center w-full mt-2"
                  style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 32 }}
                >
                  {pokemon.moves.reduce((uniqueVersions, move) => {
                    move.version_group_details.forEach(version => {
                      const versionName = version.version_group.name;
                      if (!uniqueVersions.includes(versionName)) {
                        uniqueVersions.push(versionName);
                      }
                    });
                    return uniqueVersions;
                  }, []).map((versionName: any, index: number) => (
                    <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => setGames(versionName)} className="min-w-[150px] mx-3 text-center leading-8 rounded-full capitalize">
                      <Text
                        style={
                          (versionName == games) ? { backgroundColor: "#80ff80" } : { backgroundColor: "#D3D3D3" }
                        }
                        className="text-center leading-8 rounded-full"
                      >
                        {RemoveSlash(versionName)}
                      </Text>
                    </TouchableOpacity>

                  ))}
                </View>
              </ScrollView>

              <View className="px-8 mt-6">
                {pokemon.moves
                  .filter((move: any) => {
                    const learnedInGame = move.version_group_details.some((detail: any) => detail.version_group.name === games);
                    const learnedByMethod = move.version_group_details.some((detail: any) => detail.move_learn_method.name === method);
                    return learnedInGame && learnedByMethod;
                  })
                  .sort((moveA: any, moveB: any) => {
                    const levelA = moveA.version_group_details[0].level_learned_at;
                    const levelB = moveB.version_group_details[0].level_learned_at;
                    return levelA - levelB;
                  })
                  .map((move: any) => {
                    const isLevelUp = move.version_group_details.some(detail => detail.move_learn_method.name === 'level-up');

                    if (isLevelUp) {
                      return (
                        <View className="flex flex-row items-center justify-between mb-4">
                          <View>
                            <Text className="text-[#595959] font-bold text-base capitalize">
                              {move.move.name.replace('-', ' ')}
                            </Text>
                            <Text className="text-[#595959]">
                              Learned level
                            </Text>
                          </View>
                          <Text className="text-[#595959] font-bold">
                            {move.version_group_details[0].level_learned_at}
                          </Text>
                        </View>
                      )
                    }
                    else {

                      return (
                        <View className="flex flex-row items-center justify-between mb-4">
                          <Text className="text-[#595959] font-bold text-base capitalize">
                            {move.move.name.replace('-', ' ')}
                          </Text>
                        </View>
                      );
                    }
                  })}
              </View>





            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient >

  );
}

