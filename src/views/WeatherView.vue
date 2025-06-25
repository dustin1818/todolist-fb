<script setup>
import Header from '@/components/Header.vue'
import SideNav from '@/components/SideNav.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCar, faCloudRain, faDroplet } from '@fortawesome/free-solid-svg-icons'
import { computed, onMounted, ref, watchEffect } from 'vue'
import axios from 'axios'

const weatherValue = ref()
const location = ref('makati')
const country = ref('ph')

const celsius = computed(() => {
  return (weatherValue.value?.main.temp - 273.15).toFixed(0)
})

const dateToday = computed(() => {
  const currentDate = new Date()
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = currentDate.toLocaleDateString('en-US', options)
  return formattedDate
})

watchEffect(async () => {
  const appId = 'c76dede2f64e7d13028ccbccd9f193e4'
  const weatherData = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location.value},${country.value}&appid=${appId}`,
  )
  weatherValue.value = weatherData.data
})
</script>

<template>
  <div class="container">
    <Header />
  </div>

  <div class="upper-container">
    <div class="upper-details">
      <h3>{{ weatherValue?.name }}, {{ weatherValue?.sys.country }}</h3>
    </div>

    <img
      src="../assets/vecteezy_3d-icon-cloudy-thunderstrom-heavy-rain-weather-forecast_24683626.png"
      alt="vecteezy_3d-icon-cloudy-thunderstrom-heavy-rain-weather-forecast_24683626.png"
    />

    <div class="lower-details">
      <h2 class="heading">{{ celsius }}</h2>
      <p>{{ weatherValue?.weather[0]?.main }}</p>
      <span>{{ dateToday }}</span>
    </div>

    <div class="sub-data">
      <div class="data">
        <FontAwesomeIcon class="icon" :icon="faCar" />
        <p>{{ weatherValue?.wind.speed }} km/h</p>
        <span>Wind</span>
      </div>
      <div class="data">
        <FontAwesomeIcon class="icon" :icon="faDroplet" />
        <p>{{ weatherValue?.main.humidity }} g/kg</p>
        <span>Humidity</span>
      </div>
      <div class="data">
        <FontAwesomeIcon class="icon" :icon="faCloudRain" />
        <p>{{ weatherValue?.wind.gust }} %</p>
        <span>Chance of rain</span>
      </div>
    </div>
  </div>

  <div class="input-container">
    <label>Location:</label>
    <br />
    <input type="text" v-model="location" autocapitalize="words" />
  </div>

  <SideNav />
</template>

<style scoped>
.upper-container {
  background: #17bbf3;
  padding: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .upper-details {
    margin-bottom: 30px;

    h3 {
      color: #fbfbfb;
      font-weight: 600;
      font-size: 22px;
    }
  }

  img {
    width: auto;
    height: 265px;
    background: transparent;
  }

  .lower-details {
    color: #ffffff;
    text-align: center;

    .heading {
      font-size: 45px;
      letter-spacing: 5px;
      text-align: center;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        right: 5px;
        top: 10px;
        border: solid 1px #dcdada;
        height: 8px;
        width: 8px;
        border-radius: 100%;
      }
    }

    p {
      font-size: 20px;
      color: #ffffff;
    }

    span {
      color: #dcdada;
      font-size: 14px;
      text-align: center;
    }
  }

  .sub-data {
    display: flex;
    gap: 100px;
    margin-top: 40px;
    text-align: center;

    .data {
      color: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 4px;

      p {
        color: #fbfbfb;
      }
    }
  }
}

.input-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 640px) {
    padding: 20px 20px 40px 20px;
    margin-top: 0;
  }

  input {
    width: 70%;
    padding: 10px;
    border-radius: 2px;
    border: solid 1px #252424;
    text-align: center;
    outline: none;
    text-transform: capitalize;
  }
}
</style>
