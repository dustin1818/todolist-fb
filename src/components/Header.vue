<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { onMounted, ref } from 'vue'

const displayName = ref('')
const auth = getAuth()

onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      displayName.value = user.displayName ?? user.email.split('@gmail.com')[0]
      return () => unsubscribe()
    }
  })
})
</script>

<template>
  <header class="header">
    <div class="avatar-container">
      <img src="https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png" alt="" />
      <div class="avatar-details">
        <h2>Hi, {{ displayName }} &#128075;</h2>
        <p>Your daily adventure starts now</p>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.avatar-container {
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 20px;
  }
}
</style>
