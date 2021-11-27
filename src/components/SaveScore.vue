<template>
  <div class="modal">
    <div class="modalContent">
      <form>
        <div class="flexFormEl">
          <label>Your name:</label>
          <input v-model="name" class="name" type="text" />
        </div>

        <div class="flexFormEl">
          <label>Best Score:</label>
          <p>{{ score }}</p>
        </div>
        <button class="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  props: ['score'],
  setup() {
    const name = ref('')

    return { name }
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
  font-size: 3.5vw;
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
  color: crimson;
  font-style: bold;
  margin: auto;
}

.flexFormEl label {
  margin-right: 4vw;
}

.name {
  background-color: rgb(43, 43, 43);
  border: none;
  border-bottom: 2px solid rgb(255, 184, 184);
  font-size: 3.5vw;
  color: white;
  width: 25vw;
}

.name:focus{
    outline: none;
    background-color: rgb(51, 49, 49);;
}

.submit {
  padding: 15px;
  border-radius: 1vh;
  font-size: 3.5vw;
  color: white;
  background-color: rgb(0, 146, 90);
  border: none;
}
</style>