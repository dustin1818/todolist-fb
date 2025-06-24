<script setup>
import Footer from '@/components/Footer.vue'
import { reactive } from 'vue'
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import router from '@/router'

const form = reactive({
  name: '',
  email: '',
  pass: '',
})

const provider = new GoogleAuthProvider()

const onSubmit = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, form.email, form.pass)
    .then((userCredential) => {
      const user = userCredential.user
      console.log('Successfully registered', user)
      alert('Login successful')
      router.push('/home')
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(errorCode)
      alert(errorMessage)
    })
    .finally(() => {
      form.name = ''
      form.email = ''
      form.pass = ''
    })
}

const loginWithGoogle = () => {
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log(token, user)
      router.push('/home')
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.error(errorCode)
      alert(errorMessage)
      console.error(email, credential)
    })
}
</script>

<template>
  <div class="container">
    <h1 class="title">Login your account &#128077;</h1>

    <p class="subcaption">
      If registered, please input your account details below to access your todolist.
    </p>

    <form class="input-container" @submit.prevent="onSubmit">
      <div class="login-input-wrapper">
        <input
          class="login-input"
          type="email"
          v-model="form.email"
          placeholder="brucewayne83@gmail.com"
        />
      </div>
      <div class="login-input-wrapper">
        <input class="login-input" type="password" v-model="form.pass" placeholder="******" />
      </div>

      <div class="terms-conditions">
        <input type="checkbox" name="" id="" />
        <p>I agree to privacy policy & terms</p>
      </div>

      <button class="continue-btn" type="submit">Continue</button>
    </form>

    <div class="seperator">
      <p>Or</p>
    </div>

    <div class="icons-container">
      <div class="icon-wrapper" @click="loginWithGoogle()">
        <img src="../assets/search.png" alt="" />
      </div>
      <div class="icon-wrapper">
        <img src="../assets/facebook.png" alt="" />
      </div>
    </div>

    <div class="confirmation-caption" style="text-align: center">
      <p>
        Don't have an account?
        <span>
          <RouterLink to="/signup"> <a>Sign up here</a></RouterLink></span
        >
      </p>
    </div>

    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 95vh;

  .title {
    font-weight: 600;
    font-size: 28px;
  }

  .subcaption {
    margin: 20px 0;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .login-input-wrapper {
      position: relative;

      .login-input {
        border-radius: 12px;
        outline: none;
        border: solid 1px #000000;
        padding: 10px;
        width: 100%;
        font-size: 18px;
      }

      &::after {
        position: absolute;
        content: '';
        border: solid 1px #000000;
        width: 96%;
        bottom: -2px;
        background: #000000;
        left: 0;
        right: 0;
        border-radius: 5px;
        margin: auto;
      }
    }
  }

  .terms-conditions {
    display: flex;
    gap: 8px;
    margin-top: 20px;
  }

  .continue-btn {
    width: 100%;
    border-radius: 8px;
    padding: 10px 15px;
    margin: 28px 0;
    background: #f26e56;
    color: #ffffff;
    border: none;

    &:hover {
      transform: translateY(-15px);
      transition: all 0.5s ease-in-out;
    }
  }

  .seperator {
    position: relative;
    text-align: center;

    &::before {
      content: '';
      left: 0;
      height: 1px;
      background-color: #6d6d6d;
      position: absolute;
      width: 47%;
      top: 13px;
    }

    &::after {
      content: '';
      height: 1px;
      background-color: #6d6d6d;
      right: 0;
      position: absolute;
      width: 47%;
      top: 13px;
    }
  }

  .icons-container {
    display: flex;
    gap: 12px;
    margin: 20px 0 40px 0;

    .icon-wrapper {
      padding: 10px 28px;
      border: solid 1px #000000;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        transform: scale(0.9253);
        transition: all 0.3s ease-in-out;
      }
    }
  }
}
</style>
