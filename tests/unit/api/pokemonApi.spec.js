import pokemonApi from "@/api/pokemonApi";

describe("PokemonAPI", () => {
  test("axios should configured whit pokemon API", () => {
    // console.log(pokemonApi);

    expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon')
  });
});
