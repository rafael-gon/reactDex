import { Text, View } from "react-native"

function Status(props: any) {
  // 100*status/maxstatus
  const maxHP = 255
  const maxATT = 180
  const maxDEF = 230
  const maxSATT = 180
  const maxSDEF = 230
  const maxSPD = 180
  let status = 0
  let name = ''


  if (props.statName == 'hp') {
    status = Math.round(props.baseStat * 100 / maxHP)
    name = "HP"
  }
  if (props.statName == 'attack') {
    status = Math.round(props.baseStat * 100 / maxATT)
    name = "Attack"
  }
  if (props.statName == 'defense') {
    status = Math.round(props.baseStat * 100 / maxDEF)
    name = "Defense"
  }
  if (props.statName == 'special-attack') {
    status = Math.round(props.baseStat * 100 / maxSATT)
    name = "Sp. Atk"
  }
  if (props.statName == 'special-defense') {
    status = Math.round(props.baseStat * 100 / maxSDEF)
    name = "Sp. Def"
  }
  if (props.statName == 'speed') {
    status = Math.round(props.baseStat * 100 / maxSPD)
    name = "Speed"
  }
  return (
    <View>
      <Text className="text-xs font-light text-[#595959]">
        {name}
      </Text>
      
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xs font-bold" style={{color: props.type}}>
          {props.baseStat}
        </Text>
      
        <View className="h-2 bg-[#D3D3D3] w-64 rounded-full">
          <View className={`h-2 rounded-full`} style={{ width: `${status}%` , backgroundColor: props.type}} />
        </View>
      </View>

    </View>
  )
}

export default Status