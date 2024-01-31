<template>
    <div class="path" v-if="path.mode!='WALK'">
        <img :src="getIcon(path.mode)" alt="">
        <div class="path-number"  v-if="path.extra_datas?.number"
          :style="{ color: path.extra_datas?.text_color, backgroundColor: path.extra_datas?.color }"
        >{{path.extra_datas?.number}}</div>
    </div> 
</template>

<script>
import busIcon from "../assets/icons/ic_bus_circ.svg";
import trainIcon from "../assets/icons/ic_tc_circ.svg";
import bikeIcon from "../assets/icons/ic_bike_circ.svg";
import carIcon from "../assets/icons/ic_car_circ.svg";
import metroIcon from "../assets/icons/ic_metro_circ.svg";
import tramIcon from "../assets/icons/ic_tram_circ.svg";
import walkIcon from "../assets/icons/ic_walk_circ.svg";

export default {
    name:'PathView',
    props: ['path'],
    methods:{
        getIcon(mode){
            switch (mode) {
                case 'BUS': return busIcon ;
                case 'TRAIN': return trainIcon;
                case 'BIKE': return bikeIcon;
                case 'CAR': return carIcon;
                case 'METRO': return metroIcon;
                case 'TRAM': return tramIcon;
                default : return walkIcon;
            }
        }
    }
}
</script>

<style lang="scss">
    .path {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1px;

        .path-number {
            border-radius: 50%;
            font-size: 0.6rem;
            display: flex;
            align-items: center;
            width: 20px;
            height: 21px;
            justify-content: center;
            margin: 0 2px;
        }
    }
</style>