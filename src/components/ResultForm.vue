<template>
    <div class="result-form card">
      <h3>Mon trajet</h3>
      <div class="back-btn" @click="goBack">
        <svg-icon type="mdi" :path="chevronLeft"></svg-icon>
      </div>

      <div class="content">
        <p class="way-type">{{ selectedWay }}</p>
        <div class="itineray">
           <div class="line">De  <span class="b-text">{{ from }}</span> </div>
           <div class="line">À  <span class="b-text">{{ to }}</span> </div>
        </div>
      </div>

      <div class="date">
        <svg-icon type="mdi" :path="chevronLeft"></svg-icon>
        <div class="time">Départ : <span>{{ date }}</span></div>
        <svg-icon type="mdi" :path="chevronRight"></svg-icon>
      </div>

      <div v-if="groups" class="journeys">
          <div v-for="group in groups" :key="group.name">
           <b>{{group.name}}</b> 
            <JourneyView v-for="journey in group.journeys" :key="journey.id" :journey="journey" :name="group.name"/>
          </div>
      </div>
    </div>
</template>

<script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
  import { ref, onMounted } from 'vue';
  import JourneyView from "./JourneyView.vue"

  export default {
    name:"ResultForm",
    components:{
      SvgIcon,
      JourneyView
    },
    data() {
      return{
        chevronLeft : mdiChevronLeft,
        chevronRight: mdiChevronRight,
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      }
    },
    computed: {
      from() {
        return this.$route.query.from;
      },
      to() {
        return this.$route.query.to;
      },
      selectedWay() {
        return this.$route.query.option;
      },
      date() {
        return this.$route.query.date;
      }
    },
  setup() {
    const groups = ref(null);

    onMounted(async () => {
      const data = await import('../../public/journeys.json');
      groups.value = data.default.groups;
    });

    return { groups };
  }
}

</script>

<style lang="scss">
.result-form.card {
  h3 {
    text-align: center !important;
  }
  .back-btn {
    width: 35px;
    top: 24px;
    display: block;
    position: absolute;
    left: 10px;

    svg {
      width: 35px;
      height: 35px;

      path {
      fill: #37464f;
      }
    }
  }
  .content {
    width: 100%;
    display: block;
    position: relative;
    float: left;
    margin: 20px 0;

    p.way-type {
      color: #37464f;
      text-align: left;
    }
    .itineray {
      background: #f4f5ff;
      width: 100%;
      display: block;
      position: relative;
      float: left;
      text-align: left;
      padding: 5px 20px;
      margin-top: 15px;
      border-radius: 8px;
      color: #37464f;
    }
  }
  .journeys {
    width: 100%;
    display: block;
    position: relative;
    float: left;
    text-align: left;
    margin: 10px 0;
}
.date {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;

    svg path {
      fill: var(--main-color);
    }
  .time {
    box-shadow: 0px 0px 17px -7px rgba(0, 0, 0, 0.65);
    -webkit-box-shadow: 0px 0px 17px -7px rgba(0, 0, 0, 0.65);
    -moz-box-shadow: 0px 0px 17px -7px rgba(0, 0, 0, 0.65);
    padding: 10px;
    border-radius: 8px;
    color: var(--main-color);
    font-weight: 600;
    font-size: 0.8rem;

    span{
      color:#000;
      font-weight: 700;
    }
  }
}
}

 
</style>