<template>
  <h1>Garwalle Reaction Timer</h1>
  <button @click="start" :disabled="isPlaying">Play</button>
  <Block v-if="isPlaying" :delay="delay" @end="endGame" />
  <Results v-if="!isPlaying" :scores="scores" />
</template>

<script>
import Block from './components/Block'
import Results from './components/Results'

export default {
  name: 'App',
  components: { Block, Results },
  data() {
    return {
      isPlaying: false,
      delay: null,
      scores: []
    }
  },
  methods: {
    start() {
      this.delay = 1000 + Math.random() * 5000
      this.isPlaying = true
    },
    endGame(reactionTime) {
      if ((reactionTime == -1)) {
        this.isPlaying = false
        alert('Please, wait for the green to appear before clicking !')
      } else {
        this.isPlaying = false
        this.scores.push(reactionTime)
      }
    }
  }
}
</script>

<style>
body {
  background-color: rgb(43, 43, 43);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(211, 211, 211);
  margin-top: 60px;
}

button {
  padding: 2vh;
  width: 10vw;
  font-size: 2vh;
  border-radius: 1vh;
  background-color: crimson;
  color: rgb(255, 255, 255);
  border: 2px solid white;
}

button:disabled {
  background-color: rgb(131, 18, 41);
  border-color: rgb(180, 180, 180);
}
</style>
