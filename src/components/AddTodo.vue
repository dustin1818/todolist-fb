<script setup>
import { onMounted, ref } from 'vue'
import { db } from '@/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const newTodo = ref('')
const auth = getAuth()
const userId = ref('')
const showModal = ref(false)

const onSubmit = async () => {
  try {
    if (!newTodo.value.trim()) {
      alert('Please add a todo')
      return
    }

    await addDoc(collection(db, 'todos'), {
      text: newTodo.value,
      createdAt: serverTimestamp(),
      userId: userId.value,
      completed: false,
    })

    newTodo.value = ''
    showModal.value = !showModal.value
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid
      userId.value = uid
    }
  })
})

const toggleModal = () => {
  showModal.value = !showModal.value
}
</script>

<template>
  <div class="add-todo-btn" @click="toggleModal">
    <FontAwesomeIcon class="plus" :icon="faPlus" />
  </div>

  <div class="modal-overlay" v-if="showModal">
    <div class="modal-content">
      <FontAwesomeIcon class="circleXMark" :icon="faCircleXmark" @click="toggleModal" />
      <form action="" @submit.prevent="onSubmit" class="modal-form">
        <div class="form-group">
          <label for="todoInput">Add a todo:</label>
          <input id="todoInput" type="text" v-model="newTodo" placeholder="Enter a todo..." />
        </div>
        <button type="submit">Add todo</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: auto;
}
input {
  padding: 8px;
  font-size: 16px;
}
button {
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
}

.add-todo-btn {
  height: 45px;
  width: 45px;
  background-color: #f26e56;
  display: grid;
  place-items: center;
  border-radius: 100%;
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;

  @media screen and (max-width: 640px) {
    height: 35px;
    width: 35px;
    bottom: 10px;
    right: 10px;
  }

  &:hover {
    transform: translateY(-20px);
    transition: all 0.5s ease-in-out;
  }

  .plus {
    color: #ffffff;
    background: transparent;
    font-weight: 500;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  position: relative;

  .circleXMark {
    font-size: 24px;
    background: transparent;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }

  .modal-form {
    display: flex;
    flex-direction: column;
    background: transparent;

    .form-group {
      margin-bottom: 1rem;
      background: transparent;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
        background: transparent;
      }

      input {
        width: 100%;
        background: transparent;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;

        &:focus {
          border-color: #f26e56;
          outline: none;
        }
      }
    }

    button {
      background-color: #f26e56;
      color: #fff;
      padding: 0.6rem;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        background-color: #f26e56;
      }
    }
  }
}
</style>
