<template>
  <div v-if="!pokemon">
    <h1>Espere por favor ...</h1>
    <h2>{{ message }}</h2>
  </div>

  <div v-else>
    <h1>¿Quién es este Pokémon?</h1>
    <h2>Puntuación: {{ score }}</h2>
    <PokemonImage :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions
      :pokemons="pokemonArr"
      @selection="checkAnswer"
      :isDisabled="showAnswer"
    />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      
      <button class="myNewGameButton" @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>
import PokemonImage from "@/components/PokemonImage.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";
import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
  name: "PokemonPage",
  components: {
    PokemonImage,
    PokemonOptions,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
      score: 0,
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(selectedId) {
      this.showPokemon = true;
      this.showAnswer = true;
      //   console.log("Pokemon Llamado", selectedId);

      if (selectedId === this.pokemon.id) {
        this.message = `Correcto, es ${this.pokemon.name}`;
        this.score = this.score + 1;
      } else {
        this.message = `Oops, era ${this.pokemon.name}`;
        this.score = this.score - 1;
      }
    },
    newGame() {
      console.log("New Game");

      (this.pokemonArr = []),
        (this.pokemon = null),
        (this.showPokemon = false),
        (this.showAnswer = false),
        this.mixPokemonArray();
    },
  },

  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style scoped>
.myNewGameButton {
  box-shadow: inset 0px 1px 0px 0px #f7c5c0;
  background: linear-gradient(to bottom, #fc8d83 5%, #e4685d 100%);
  background-color: #fc8d83;
  border-radius: 6px;
  border: 1px solid #d83526;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #b23e35;
}
.myNewGameButton:hover {
  background: linear-gradient(to bottom, #e4685d 5%, #fc8d83 100%);
  background-color: #e4685d;
}
.myNewGameButton:active {
  position: relative;
  top: 1px;
}

.alert {
  width: 100%;
  padding: 12px 16px;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 12px;
  font-size: 16px;
}

.alert.alert-success {
  background-color: rgba(227, 253, 235, 1);
  border-color: rgba(38, 179, 3, 1);
  color: rgba(60, 118, 61, 1);
}

.alert.alert-info {
  background-color: rgba(217, 237, 247, 1);
  color: rgba(49, 112, 143, 1);
  border-color: rgba(126, 182, 193, 1);
}

.alert.alert-warning {
  background-color: rgba(252, 248, 227, 1);
  border-color: rgba(177, 161, 129, 1);
  color: rgba(138, 109, 59, 1);
}

.alert.alert-danger {
  background-color: rgba(248, 215, 218, 1);
  border-color: rgba(220, 53, 69, 1);
  color: rgba(114, 28, 36, 1);
}
</style>
