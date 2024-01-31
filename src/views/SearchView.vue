<template>
  <div class="search-view">
    <SearchFrom />
  </div>
</template>

<script>
import SearchFrom from '../components/SearchFrom.vue'

export default {
  name:"SearchView",
  components:{
    SearchFrom
  }
}
</script>
  
<style lang="scss">
  .search-view {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>