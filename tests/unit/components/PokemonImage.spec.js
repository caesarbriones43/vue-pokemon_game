import { shallowMount } from "@vue/test-utils";
import PokemonImage from "@/components/PokemonImage.vue";

describe("PokemonImage Component", () => {
  test("should match whit snapshot", () => {
    const wrapper = shallowMount(PokemonImage, {
      props: {
        pokemonId: 1,
        showPokemon: true,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should show the hidden image and the pokemon 100", () => {
    const wrapper = shallowMount(PokemonImage, {
      props: {
        pokemonId: 100,
        showPokemon: false,
      },
    });

    const [img1, img2] = wrapper.findAll("img");

    expect(img1.exists).toBeTruthy();
    expect(img2).toBe(undefined);

    expect(img1.classes("hidden-pokemon")).toBeTruthy();

    expect(img1.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')
  });

  test("should show pokemon imagen when showPokemon equals true ", () => {});

  const wrapper = shallowMount(PokemonImage, {
    props: {
      pokemonId: 100,
      showPokemon: true,
    },
  });

  const img1 = wrapper.find("img");


  expect(img1.exists).toBeTruthy();
  expect(img1.classes("hidden-pokemon")).toBe(false);
  expect(img1.classes("fade-in")).toBe(true);


});
