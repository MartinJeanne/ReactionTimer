<template>
  <div class="block" v-if="showBlock" @click="stopTimer"><p>Click me</p></div>
  <div class="anticheat" v-if="!showBlock" @click="cheat"></div>
</template>

<script>
export default {
  props: ['delay'],
  data() {
    return {
      showBlock: false,
      timer: null,
      reactionTime: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.showBlock = true
      this.startTimer()
    }, this.delay)
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.reactionTime += 10
      }, 10)
    },
    stopTimer() {
      clearInterval(this.timer)
      this.$emit('end', this.reactionTime)
    },
    cheat() {
      this.$emit('end', -1)
    }
  }
}
</script>

<style>
.block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(10, 175, 139);
  color: white;
  font-size: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.anticheat {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>