<template>
    <div class="journey" @click="toggleJourneyDetails">   
        <div class="journey-header">
            <div class="paths">
                <div v-for="(path, index) in journey.paths" :key="path.mode" class="path-container">
                    <PathView  :path="path"  v-if="!path.hide" />
                    <span v-if="path.hide && index < journey.paths.length - 1 " class="path-separator">
                        <svg-icon type="mdi" :path="chevron"></svg-icon>
                    </span>
                </div>
            </div>
            <span class="duration">{{ formatDuration(journey.duration) }}</span>
        </div>
        <div v-if="isDetailsOpened" class="journey-details">
            <hr>
            <div v-for="path in journey.paths" :key="path.mode" class="path-detail">
                <div v-if="name =='Public transport'" class="public-transportation">
                    <span v-html=' path.hide ? "Marché " : "Prendre le "+path.mode+" "'></span>
                    <PathView  :path="path" />
                    <span v-html="path.hide ? 'jusqu\'à <b>' + path.end.name + '</b>' : ' pour <b>' + path.extra_datas.stops.length + '</b> arrêt(s) jusqu\'à <b>' + path.end.name + '</b>'"></span>
                    <span class="path-info">
                        Durée et distance estimé: {{formatDistance(path.distance)}} / {{formatDuration(path.duration)}}
                        <svg-icon class="info-icon" type="mdi" :path="info"></svg-icon>
                    </span>
                </div>
                <div v-else class="other">
                    <span>Conduire votre {{path.mode}}</span>
                    <PathView  :path="path" />
                    <span v-html=" 'jusqu\'à <b>' + path.end.name + '</b>'"></span>
                    <span class="path-info">
                        <svg-icon class="info-icon" type="mdi" :path="info"></svg-icon>
                        Durée et distance estimé: {{formatDistance(path.distance)}} / {{formatDuration(path.duration)}}
                     </span>
                </div>
            </div>
            <hr>
        </div>
        <div class="journey-footer">
            <div v-if=" journey.pricing.total_cost" class="price">à partir de : {{journey.pricing.total_cost}} €</div>
            <div v-if=" journey.criterion" class="recommendation">{{journey.criterion}}</div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronRight, mdiInformationVariantCircle } from '@mdi/js';
import PathView from './PathView.vue';

export default {
  name: "JourneyView",
  props: {
    journey: Object,
    name: String,
  },
  components: {
    PathView,
    SvgIcon,
  },
  data() {
    return {
      chevron: mdiChevronRight,
      info: mdiInformationVariantCircle,
      isDetailsOpened: false,
    };
  },
  methods: {
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
      return formattedDuration.trim();
    },
    toggleJourneyDetails() {
      this.isDetailsOpened = !this.isDetailsOpened;
    },
    formatDistance(distance) {
      return distance >= 1000 ? `${(distance / 1000).toFixed(1)} km` : `${distance} m`;
    },
  },
};
</script>


<style lang="scss">
@mixin center-flex {
  display: flex;
  align-items: center;
  
}

 .journey {
    box-shadow: 0px 0px 14px -7px rgba(0, 0, 0, 0.65);
    -webkit-box-shadow: 0px 0px 14px -7px rgba(0, 0, 0, 0.65);
    -moz-box-shadow: 0px 0px 14px -7px rgba(0, 0, 0, 0.65);
    display: flex;
    position: relative;
    float: left;
    width: 100%;
    margin: 5px;
    margin-top: 15px;
    border-radius: 8px;
    padding: 5px 15px;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;

    .journey-header, .journey-footer {
        @include center-flex;
        position: relative;
        float: left;
        width: 100%;
        justify-content: space-between;
    }

    .journey-details, .path-detail {
        display: block;
        position: relative;
        float: left;
        width: 100%;
        margin-top: 5px;
        
        .public-transportation, .other {
             @include center-flex;
            flex-wrap: wrap;
            font-size: 0.7rem;
        }
    }
    .paths {
        display: flex;

        .path-container {
            @include center-flex;
            justify-content: center;
            flex-wrap: nowrap;

            span.path-separator {
                @include center-flex;
                justify-content: flex-start;
                width: 25px;
                height: 25px;

                svg {
                    width: 25px;
                    height: 25px;

                    path {
                        fill: var(--main-color);
                    }
                }
            }
        }
    }

    span.duration, .price, .recommendation {
        @include center-flex;
        background: var(--secondary-background-color);
        padding: 3px 5px;
        font-weight: 700;
        font-size: 0.7rem;
        border-radius: 4px;
        margin-bottom: 12px;
        margin-top: 15px;
        color: var(--dark-blue);
    }

    span.path-info {
        @include center-flex;
        background: var(--secondary-background-color);
        padding: 3px 5px;
        font-weight: 700;
        font-size: 0.5rem;
        border-radius: 4px;
        margin-bottom: 12px;
        margin-top: 2px;
        width: 100%;
        justify-content: flex-end;
    }

    svg.info-icon {
        width: 14px;
        height: 15px;
        margin-left: 5px;

        path {
            fill: var(--blue);
        }
    }
}
</style>