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
  props: {
    scores: Array
  },
  data() {
    return {
      data: [],
      currentScore: null
    }
  },
  methods: {
    sortScore() {
      this.scores.sort(function (a, b) {
        return a - b
      })
      this.scores.forEach((score, index) => {
        if (index > 2) this.scores.splice(index, 1)
      })
    }
  },
  mounted() {
    this.currentScore = this.scores[this.scores.length - 1]
    this.sortScore()
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