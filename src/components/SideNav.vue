<script setup>
import { faCloud, faXmark, faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { getAuth, signOut } from 'firebase/auth'
import router from '@/router'
import AddTodo from './AddTodo.vue'

const auth = getAuth()

const logout = () => {
  if (confirm('Are you sure you want to logout?')) {
    signOut(auth)
      .then(() => {
        alert('Logout successful!')
        localStorage.removeItem('user')
        router.push('/login')
      })
      .catch((error) => {
        console.error(error)
      })
  } else {
    alert('Logout canceled.')
  }
}

const goWeatherPage = () => {
  router.push('/weather')
}

const goNotesPage = () => {
  router.push('/home')
}
</script>

<template>
  <AddTodo />
  <div class="notes-btn" @click="goNotesPage">
    <FontAwesomeIcon class="note" :icon="faNoteSticky" />
  </div>

  <div class="signout-btn" @click="logout">
    <FontAwesomeIcon class="xmark" :icon="faXmark" />
  </div>

  <div class="weather-btn" @click="goWeatherPage">
    <FontAwesomeIcon class="cloud" :icon="faCloud" />
  </div>
</template>

<style>
.signout-btn {
  height: 45px;
  width: 45px;
  background-color: #e92f2f;
  display: grid;
  place-items: center;
  border-radius: 100%;
  position: absolute;
  bottom: 85px;
  right: 22px;
  cursor: pointer;

  &:hover {
    transform: translateY(-20px);
    transition: all 0.5s ease-in-out;
  }

  .xmark {
    color: #ffffff;
    background: transparent;
    font-weight: 500;
  }
}

.notes-btn {
  height: 45px;
  width: 45px;
  background-color: #52c1c5;
  display: grid;
  place-items: center;
  border-radius: 100%;
  position: absolute;
  bottom: 155px;
  right: 22px;
  cursor: pointer;

  &:hover {
    transform: translateY(-20px);
    transition: all 0.5s ease-in-out;
  }

  .note {
    color: #ffffff;
    background: transparent;
    font-weight: 500;
  }
}

.weather-btn {
  height: 45px;
  width: 45px;
  background-color: #ffc348;
  display: grid;
  place-items: center;
  border-radius: 100%;
  position: absolute;
  bottom: 225px;
  right: 22px;
  cursor: pointer;

  &:hover {
    transform: translateY(-20px);
    transition: all 0.5s ease-in-out;
  }

  .cloud {
    color: #ffffff;
    background: transparent;
    font-weight: 500;
  }
}
</style>
