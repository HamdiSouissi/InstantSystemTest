<template>
  <div class="journey">
    <div class="paths">
            <div v-for="(path, index) in journey.paths" :key="path.mode" class="path-container">
                
                <PathView  :path="path" />
                <span v-if="path.mode ==='WALK' && index < journey.paths.length - 1 " class="path-separator">
                    <svg-icon type="mdi" :path="chevron"></svg-icon>
                </span>

            </div>
        
    </div>
    <span class="duration">{{ formatDuration(journey.duration) }}</span>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronRight } from '@mdi/js'
import PathView from './PathView.vue'
export default {
    name:"JourneyView",
    props: ['journey'],
    components:{
        PathView,
        SvgIcon
    },
    data() {
      return{
        chevron : mdiChevronRight,
      }
    },
    methods :{
        formatDuration(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      let formattedDuration = '';
      
      if (hours > 0) {
        formattedDuration += `${hours}h `;
      }
      if (minutes > 0) {
        formattedDuration += `${minutes}min`;
      }
      return formattedDuration;
    },
    }
}
</script>

<style lang="scss">
    

.journey {
    box-shadow: 0px 0px 14px -7px rgba(0, 0, 0, 0.65);
    -webkit-box-shadow: 0px 0px 14px -7px rgba(0, 0, 0, 0.65);
    -moz-box-shadow: 0px 0px 14px -7px rgba(0, 0, 0, 0.65);
    display: flex;
    position: relative;
    float: left;
    width: 100%;
    margin: 5px;
    border-radius: 8px;
    padding: 15px;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;

    .paths {
        display: flex;

        .path-container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;

            span.path-separator {
                width: 25px;
                height: 25px ;
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }

            .path-separator svg {
                width: 25px;
                height: 25px;

                path{
                    fill: var(--main-color);
                }
            }
        }
    }
    span.duration {
        font-size: 0.7rem;
        font-weight: 700;
    }
}
</style>