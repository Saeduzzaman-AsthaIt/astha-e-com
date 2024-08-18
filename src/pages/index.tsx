import Header from "@/components/header";
import PokemonSlider from "@/components/pokemonSlider";
import ItemsSets from "./sets";

export default function Home() {
  return (
    <div>
      <Header />
      <PokemonSlider />
      <ItemsSets />
    </div>
  );
}
