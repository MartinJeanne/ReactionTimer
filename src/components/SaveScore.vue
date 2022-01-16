<template>
  <div class="modal" @click.self="closeModal">
    <div class="modalContent">
      <form @submit.prevent="handleSubmit">
        <div class="flexFormEl">
          <label>Your name</label>
          <input v-model="name" class="name" type="text" />
        </div>

        <div class="flexFormEl">
          <label>Best Score</label>
          <p>{{ score }}</p>
        </div>
        <button class="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { projectFirestore } from '../firebase/config'

export default {
  props: ['score'],
  emits: ['close'],
  setup(props, context) {
    const name = ref('')

    function closeModal() {
      context.emit('close')
    }

    async function handleSubmit() {
      const record = {
        name: name.value,
        score: props.score
      }

      const res = await projectFirestore.collection('record').add(record)
      context.emit('close')
    }

    return { name, closeModal, handleSubmit }
  }
}
</script>

<style>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
}

.modalContent {
  padding: 4vw;
  font-size: 3vw;
  background-color: rgb(43, 43, 43);
  border-radius: 10px;
}

.flexFormEl {
  display: flex;
  align-items: center;
  margin-bottom: 3vh;
}

.flexFormEl p {
  text-align: center;
  padding: 0;
  margin: 0;
  font-size: 1.5em;
  display: block;
  color: rgb(238, 74, 106);
  font-style: bold;
  margin: auto;
}

.flexFormEl label {
  margin-right: 4vw;
  letter-spacing: 1px;
}

.name {
  background-color: rgb(43, 43, 43);
  border: none;
  border-bottom: 2px solid rgb(255, 184, 184);
  font-size: 3.5vw;
  color: white;
  width: 20vw;
  text-align: center;
}

.name:focus {
  outline: none;
  background-color: rgb(63, 60, 60);
}

.submit {
  padding: 15px;
  border-radius: 1vh;
  font-size: 3.5vw;
  color: white;
  background-color: rgb(0, 146, 90);
  border: none;
  cursor: pointer;
}
</style>