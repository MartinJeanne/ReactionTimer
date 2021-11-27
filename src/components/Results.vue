<template>
  <div id="scores" v-if="currentScore">
    <p id="currentScore">
      Your score: <b>{{ currentScore }}ms</b>
    </p>
    <br />
    <p id="currentRole">Your are {{ currentRole }}</p>

    <div id="bestScores">
      <div id="userScore">
        <p>Your best scores:</p>
        <ul>
          <li v-for="(score, index) in scores" :key="score">
            {{ index + 1 }}. {{ score }}ms
          </li>
        </ul>
      </div>

      <div id="globalScore">
        <p>Global best scores:</p>
        <ul>
          <li v-for="(r, index) in record" :key="r.id">
            {{ index + 1 }}. {{ r.name }}: {{ r.time }}ms
          </li>
        </ul>
      </div>
    </div>
    <button @click="saveBestScore" class="save">Save your best score</button>
    <SaveScore v-if="isSaving" :score="bestScore" />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import getRecord from '../composables/getRecord'
import { projectFirestore } from '../firebase/config'
import SaveScore from './SaveScore.vue'

export default {
  props: {
    scores: Array
  },
  components: { SaveScore },
  setup(props) {
    const currentScore = ref(null)
    const currentRole = ref('')
    const bestScore = ref(null)
    const isSaving = ref(false)

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

    async function saveBestScore() {
      isSaving.value = true
      bestScore.value = props.scores[0]
      /*
      const res = await projectFirestore
        .collection('record')
        .add({ name: 'Tinin', time: currentScore.value })
        */
    }

    onMounted(() => {
      currentScore.value = props.scores[props.scores.length - 1]
      sortScore()
      if (currentScore.value < 200) {
        currentRole.value = 'flash  !!'
      } else if (currentScore.value < 250) {
        currentRole.value = 'a ninja !'
      } else if (currentScore.value < 300) {
        currentRole.value = 'quit fast'
      } else if (currentScore.value < 350) {
        currentRole.value = 'quit slow'
      } else {
        currentRole.value = 'slow'
      }
    })

    return {
      currentScore,
      currentRole,
      sortScore,
      record,
      saveBestScore,
      bestScore,
      isSaving
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

#scores {
  width: 40vw;
  margin: 8vh auto;
  background-color: rgb(77, 82, 80);
  padding: 0 0.8vw 1vw 0.8vw;
  border-radius: 2%;
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

#bestScores {
  display: flex;
  justify-content: space-between;
  padding: 2vw;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2%;
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

.save {
  display: block;
  padding: 10px;
  margin: 3vh auto;
  border-radius: 1vh;
  border: 2px solid rgb(241, 241, 241);
  background-color: rgb(0, 172, 86);
  color: white;
  font-size: 1.5vw;
}
</style>