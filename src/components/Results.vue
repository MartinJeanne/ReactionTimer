<template>
  <div id="score">
    <p id="cureentScore">
      You score: <b>{{ currentScore }}ms</b>
    </p>
    <div>
      <p>Your best scores:</p>
      <ol>
        <li v-for="score in scores" :key="score">
          {{ score }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentScore'],
  data() {
    return {
      scores: []
    }
  },
  mounted() {},
  methods: {
    updateScores(currentTime) {
      if (this.scores.length < 3) {
        this.scores.push(currentTime)
        this.scores.sort(function (a, b) {
          return a - b
        })
      } else {
        for (let i = 0; i < this.scores.length; i++) {
          if (currentTime < this.scores[i]) {
            this.scores[i] = currentTime
            return
          }
        }
      }
    }
  }
}
</script>

<style>
p {
  display: inline-block;
}

#score {
  width: 20vw;
  height: 20vh;
  margin: 10vh auto;
  background-color: rgb(77, 82, 80);
  border-radius: 2vh;
}
</style>