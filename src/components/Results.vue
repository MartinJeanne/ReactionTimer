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
      <br /><br />
      <p>Global best scores:</p>
      <ul>
        <li v-for="(r, index) in record" :key="r.id">
          {{ index + 1 }}.{{ r.name }}: {{ r.time }}ms
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import getRecord from '../composables/getRecord'
import { projectFirestore } from '../firebase/config'

export default {
  props: {
    scores: Array
  },
  setup(props) {
    const currentScore = ref(null)
    const currentRole = ref('')

    const { record, load } = getRecord()
    load()

    function sortScore() {
      props.scores.sort(function (a, b) {
        return a - b
      })
      props.scores.forEach((score, index) => {
        if (index > 2) props.scores.splice(index, 1)
      })
    }

    async function saveCurrentScore() {
      const res = await projectFirestore
        .collection('record')
        .add({ name: 'Tinin', time: currentScore.value })
    }

    onMounted(() => {
      currentScore.value = props.scores[props.scores.length - 1]
      console.log(currentScore.value)
      sortScore()
      if (currentScore.value < 200) {
        currentRole.value = 'flash  !!'
      } else if (currentScore.value < 250  ) {
        currentRole.value = 'a ninja !'
      } else if (currentScore.value < 300  ) {
        currentRole.value = 'quit fast'
      } else if (currentScore.value < 350  ) {
        currentRole.value = 'quit slow'
      } else {
        currentRole.value = 'slow'
      }
      //saveCurrentScore()
    })

    return { currentScore, currentRole, sortScore, record }
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