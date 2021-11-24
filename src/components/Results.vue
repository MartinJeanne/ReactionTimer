<template>
  <div id="score" v-if="currentScore">
    <p id="currentScore">
      Your score: <b>{{ currentScore }}ms</b>
    </p>
    <p id="currentRole">Your are {{ currentRole }}</p>
    <div id="bestScores">
      <p>Your best scores:</p>
      <ul>
        <li v-for="(score, index) in scores" :key="score">
          {{ index + 1 }}. {{ score }}ms
        </li>
      </ul>
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
      currentScore: null,
      currentRole: ''
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
    if (this.currentScore < 200) {
      this.currentRole = 'flash  !!'
    } else if (this.currentScore < 250) {
      this.currentRole = 'a ninja !'
    } else if (this.currentScore < 300) {
      this.currentRole = 'quite fast'
    } else if (this.currentScore < 350) {
      this.currentRole = 'quite slow'
    } else {
      this.currentRole = 'a turtle'
    }
  }
}
</script>

<style>
p {
  display: inline-block;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#score {
  width: 30vw;
  margin: 10vh auto;
  background-color: rgb(77, 82, 80);
  padding: 0 0.8vw 1vw 0.8vw;
  border-radius: 2vh;
}

#currentScore {
  margin: 0;
  padding-top: 1.3vw;
  font-size: 3vw;
}

#currentScore b {
  color: rgb(255, 181, 196);
}

#currentRole {
  margin: 1vw 0 3vw 0;
  font-size: 2vw;
  color: rgb(255, 181, 196);
  font-style: italic;
}

#bestScores p {
  font-size: 1.8vw;
  border-bottom: 2px solid rgba(255, 255, 255, 0.6);
  margin: 0;
}
#bestScores li {
  font-size: 1.8vw;
  margin-top: 1vw;
}
</style>