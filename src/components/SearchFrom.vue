<template>
  <div class="search-form card">
    <h3>Itinéraire</h3>

    <div class="select-ways">
      <div class="select-container" @click="toggleDropdown">
        <span>{{ selectedOption }}</span>
        <div class="arrow" :class="{ 'rotate-arrow': isDropdownOpen }"><svg-icon type="mdi" :path="chevron"></svg-icon></div>
      </div>
      <div v-if="isDropdownOpen" class="dropdown">
        <label>
          <input type="radio" v-model="selectedOption" value="Aller simple" />
          Aller simple
        </label>
        <label>
          <input type="radio" v-model="selectedOption" value="Aller-retour" />
          Aller-retour
        </label>
      </div>
    </div>
    <div class="filter-button" @click="toggleDropdownFilters"><svg-icon type="mdi" :path="tune"></svg-icon></div>
    <div class="filters" v-if="isFilterOpen"></div>

    <div class="row">
      <div class="form-control">
        <label :for="fromId">{{ fromLabel }}</label>
        <input type="text" :name="fromName" :id="fromId" v-model="fromValue">
      </div>
      <div class="add-btn"><svg-icon type="mdi" :path="plus"></svg-icon></div>
    </div>

    <div class="row">
      <div class="form-control">
        <label :for="toId">{{ toLabel }}</label>
        <input type="text" :name="toName" :id="toId" v-model="toValue">
      </div>
      <div class="switch-btn" @click="swapInputs"><svg-icon type="mdi" :path="swap"></svg-icon></div>
    </div>
    <div class="row">
       <label for="datetimeInput">Départ :</label>
      <input type="datetime-local" id="datetimeInput" v-model="selectedDate" >
      <p>{{ formattedDate }}</p>
    </div>
    <div class="row">
      <button type="submit">Rechercher</button>
    </div>
    
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiTune, mdiChevronDown, mdiPlus, mdiSwapVertical  } from '@mdi/js';

export default {
  name : "SearchForm",
  components:{
    SvgIcon
  },
  data() {
    return {
      isDropdownOpen: false,
      selectedOption: "Aller simple",
      tune: mdiTune,
      plus: mdiPlus,
      swap:mdiSwapVertical ,
      chevron:mdiChevronDown,
      isFilterOpen:false,
      selectedDate: '',
      formattedDate: '',
      fromLabel: "De",
      fromName: "from",
      fromId: "fromInput",
      fromValue: "",

      toLabel: "À",
      toName: "to",
      toId: "toInput",
      toValue: "",
    };
  },
  watch: {
    selectedDate: 'updateFormattedDate',
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleDropdownFilters(){
      this.isFilterOpen = !this.isFilterOpen;
    },
    updateFormattedDate() {
      if (this.selectedDate) {
        const parsedDate = new Date(this.selectedDate);
        this.formattedDate = this.formatDate(parsedDate);
      } else {
        this.formattedDate = '';
      }
    },
    formatDate(date) {
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };

      return new Intl.DateTimeFormat('fr-FR', options).format(date);
    },
    swapInputs() {
      [this.fromLabel, this.toLabel] = [this.toLabel, this.fromLabel];
      [this.fromName, this.toName] = [this.toName, this.fromName];
      [this.fromId, this.toId] = [this.toId, this.fromId];
      [this.fromValue, this.toValue] = [this.toValue, this.fromValue];
    },
  }
};
</script>

<style lang="scss">
  .select-ways{
    display: block;
    position: relative;
    float: left;
    margin-bottom: 20px;
    .select-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      border: none;
      padding: 10px 10px;
      color: var(--main-color);
      font-weight: 600;
      font-size: 1rem;
      background: #fff9fb;
      border-radius: 8px;
      width: 150px;
    }

    .arrow {
      margin-left: 5px;
      transition: transform 0.3s;
      font-size: 21px;
      color:var(--main-color);
    }

    .rotate-arrow {
      transform: rotate(180deg);
    }
    .dropdown {
      border: 2px solid var(--main-color);
      border-radius:  8px;
      padding: 5px 0;
      max-width: 130px;
      cursor: pointer;
      transition: ease-in-out 0.3s;
      -webkit-animation: scale-up-ver-top 0.4s both;
	    animation: scale-up-ver-top 0.4s both;
    }
    label {
      display: block;
      margin-bottom: 5px;
      cursor: pointer;
      font-size: 0.9rem;
    }
  }

.filter-button {
    display: flex;
    position: relative;
    float: left;
    cursor: pointer;
    border: 1px solid var(--main-color);
    padding: 10px 11px;
    border-radius: 11px;
    color: var(--main-color);
    margin: 0 3%;
    &:hover{
      background: var(--main-color);
      color:white;
    }
}

.filters {
    width: 100%;
    min-height: 100px;
    position: relative;
    float: left;
    margin-top: 10px;
    border-radius: 8px;
    transition: height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    overflow: hidden;
    -webkit-animation: scale-up-ver-top 0.4s both;
	  animation: scale-up-ver-top 0.4s both;
    color: #fff;
    background: var(--main-color); 
}
.row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    button {
      width: 100%;
      padding: 20px;
      font-size: 1.2rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      background: var(--main-color);
      color: #fff;
      border: none;

      &:hover{
        filter: brightness(95%);
      }
    }

    .add-btn,.switch-btn {
      width: 15%;
      border: 1px solid var(--main-color);
      padding: 5px 0px;
      border-radius: 8px;
      margin-left: 10px;
      cursor: pointer;
      color:var(--main-color);
    
      &:hover{
        background: var(--main-color);
        fill:#fff;
        color: #fff;
        path{
          color:#fff;
        }
      }

    }
    
    .form-control {
      width: 85%;
      display: block;
      position: relative;
      float: left;
  
      input {
        width: 100%;
        display: block;
        position: relative;
        float: left;
        padding: 10px;
        font-size: 1rem;
        color: #000;
        border: 1px solid #e3e3e3;
        border-radius: 8px;
        padding-left: 50px;
        &:focus{
          outline: 2px solid var(--main-color);
        }
      }
      label {
        position: absolute;
        z-index: 9;
        left: 15px;
        top: 9px;
        font-weight: 700;
        color: var(--main-color);
      }

    }
}




</style>
