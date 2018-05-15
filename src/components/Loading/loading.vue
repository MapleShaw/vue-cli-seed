<template>
  <div class="loading-wrap" v-show="isVisible">
    <div class="loader"></div>
    <p class="loading-text">{{text}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
.loading-wrap {
  color: rgb(255, 255, 255);
  width: 7.6em;
  min-height: 7.6em;
  top: 180px;
  left: 50%;
  margin-left: -3.8em;
  background: rgba(17, 17, 17, 0.7);
  text-align: center;
  border-radius: 5px;
  position: fixed;
}
.loading-wrap .loader {
  margin: 35px auto 16px;
  font-size: 10px;
  position: relative;
  border-top: 5px solid rgba(255, 255, 255, 0.2);
  border-right: 5px solid rgba(255, 255, 255, 0.2);
  border-bottom: 5px solid rgba(255, 255, 255, 0.2);
  border-left: 5px solid rgb(255, 255, 255);
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load 1.1s infinite linear;
  animation: load 1.1s infinite linear;
}
.loading-wrap .loader,
.loading-wrap .loader:after {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
@-webkit-keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
