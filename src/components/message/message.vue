<template>
  <transition name="fade">
    <div class="message-toast" v-if="show">
      <p>{{message}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      duration: 2000,
      show: false
    }
  },
  mounted () {
    this.show = true
    this.startTimer()
  },
  methods: {
    close () {
      this.show = false
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.close()
        }, this.duration)
      }
    }
  }
}
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .message-toast {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    p {
      color: #fff;
      background-color: rgba(0,0,0,.7);
      padding: r(20) r(10);
      border-radius: r(3);
      text-align: center;
      width: r(288);
      font-size: r(14);
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: r(70);
    }
  }
</style>
