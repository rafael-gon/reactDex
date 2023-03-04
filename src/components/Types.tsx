import { Text } from "react-native"

function Types(props: { type: string }) {
  let color: any = "#AAA67F"

  if (props.type == "bug") {
    color = "#A7B723"
  } if (props.type == "dark") {
    color = "#75574C"
  } if (props.type == "dragon") {
    color = "#7037FF"
  } if (props.type == "electric") {
    color = "#F9CF30"
  } if (props.type == "fairy") {
    color = "#E69EAC"
  } if (props.type == "fighting") {
    color = "#C12239"
  } if (props.type == "fire") {
    color = "#F57D31"
  } if (props.type == "flying") {
    color = "#A891EC"
  } if (props.type == "ghost") {
    color = "#70559B"
  } if (props.type == "grass") {
    color = "#74CB48"
  } if (props.type == "ground") {
    color = "#DEC16B"
  } if (props.type == "ice") {
    color = "#9AD6DF"
  } if (props.type == "normal") {
    color = "#AAA67F"
  } if (props.type == "poison") {
    color = "#A43E9E"
  } if (props.type == "psychic") {
    color = "#FB5584"
  } if (props.type == "rock") {
    color = "#B69E31"
  } if (props.type == "steel") {
    color = "#B7B9D0"
  } if (props.type == "water") {
    color = "#6493EB"
  }
  return (
    <Text
      style={{ backgroundColor: color }}
      className="font-bold capitalize text-white text-base text-center rounded-full w-24 leading-8"
    >
      {props.type}
    </Text>
  )
}

export default Types;