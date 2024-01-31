<template>
  <div class="result-view">
    <ResultForm />
  </div>
</template>

<script>
import ResultForm from '../components/ResultForm.vue'

export default {
  name:"ResultView",
  components:{
    ResultForm
  }
}
</script>

<style lang="scss">
.result-view {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>