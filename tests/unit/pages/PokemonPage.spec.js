import { shallowMount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage.vue";
import { mockPokemons } from "../mocks/pokemons.mocks";

describe("PokemonPage Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  test("should match whit snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should call mixPokemonArray on mount", () => {
    const mixPokemonArraySpy = jest.spyOn(
      PokemonPage.methods,
      "mixPokemonArray"
    );
    const wrapper = shallowMount(PokemonPage);

    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  test("should match whit the snapshot when pokemon mounted ", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: mockPokemons,
          pokemon: mockPokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
          score: 0,
        };
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("should the componentes PokemonImage and PokemonOptions", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: mockPokemons,
          pokemon: mockPokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
          score: 0,
        };
      },
    });

    const PokemonImage = wrapper.find("pokemon-image-stub");
    const PokemonOptions = wrapper.find("pokemon-options-stub");

    expect(PokemonImage.exists).toBeTruthy();
    expect(PokemonOptions.exists).toBeTruthy();

    expect(PokemonImage.attributes("pokemonid")).toEqual("1");

    expect(PokemonOptions.attributes("pokemons")).toBeTruthy();
  });

  test("testing whit checkAnswer", async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: mockPokemons,
          pokemon: mockPokemons[1],
          showPokemon: false,
          showAnswer: false,
          message: "",
          score: 0,
        };
      },
    });

    await wrapper.vm.checkAnswer(2);

    expect(wrapper.find("h2").exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBeTruthy();
    expect(wrapper.find("h2").text()).toBe(
      `Correcto, es ${mockPokemons[1].name}`
    );

    await wrapper.vm.checkAnswer(10);
    expect(wrapper.find("h2").text()).toBe(
        `Oops, era ${mockPokemons[1].name}`
      );
  });
});
