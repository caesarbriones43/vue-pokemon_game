<template>
  <div class="options-container">
    <ul>
      <div v-if="isDisabled">
        <li
          class="disabled"
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          @click="$emit('selection', pokemon.id)"
        >
          {{ pokemon.name }}
        </li>
      </div>
      <div v-else>
        <li
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          @click="$emit('selection', pokemon.id)"
        >
          {{ pokemon.name }}
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PokemonOptions",
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Pokemon Options */

.disabled {
  pointer-events: none;
  opacity: 0.6;
}

ul {
  list-style-type: none;
}
li {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  justify-content: center;
}
</style>
