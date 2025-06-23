<script setup>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import SideNav from '@/components/SideNav.vue'
import { db } from '@/firebase'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { computed, onMounted, ref } from 'vue'

const todoList = ref([])
const activeTodos = computed(() => todoList.value.filter((todo) => !todo.completed))
const completedTodos = computed(() => todoList.value.filter((todo) => todo.completed))

const auth = getAuth()

onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid
      const todosCol = collection(db, 'todos')
      const unsubscribe = onSnapshot(todosCol, (snapshot) => {
        const todos = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          if (data.userId === uid) {
            todos.push({
              id: doc.id,
              ...data,
            })
          }
        })
        todoList.value = todos
      })
      return () => unsubscribe()
    }
  })
})

const moveToCompleted = async (todo) => {
  try {
    const updatedCompleted = !todo.collection
    const todoRef = doc(db, 'todos', todo.id)

    await updateDoc(todoRef, {
      completed: updatedCompleted,
    })

    const index = todoList.value.findIndex((t) => t.id == todo.id)

    if (index !== -1) {
      todoList.value[index].completed = updatedCompleted
    }
  } catch (error) {
    console.error(error)
  }
}

const deleteTodo = async (todo) => {
  const confirmed = confirm('Are you sure you want to delete todo?')

  if (confirmed) {
    await deleteDoc(doc(db, 'todos', todo.id))
    todoList.value = todoList.value.filter((t) => t.id !== todo.id)
  } else {
    alert('Delete todo has been canceled.')
  }
}
</script>

<template>
  <div class="container">
    <Header />
    <main>
      <div class="dashboard-container">
        <div class="dashboard">
          <img src="../assets/cycle.png" alt="./assets/cycle.png" />
          <div class="dash-info">
            <p>On going</p>
            <span>{{ activeTodos?.length }} {{ activeTodos?.length > 1 ? 'tasks' : 'task' }}</span>
          </div>
        </div>
        <div class="dashboard two">
          <img src="../assets/checked.png" alt="./assets/cycle.png" />
          <div class="dash-info">
            <p>Completed</p>
            <span
              >{{ completedTodos?.length }}
              {{ completedTodos?.length > 1 ? 'tasks' : 'task' }}</span
            >
          </div>
        </div>
      </div>

      <p class="subtitle">Recent Task:</p>

      <div class="todo-list-container">
        <div
          class="todolist"
          v-for="(todo, index) in activeTodos"
          title="select to complete"
          v-if="activeTodos.length > 0"
        >
          <div class="todo-details">
            <span>Todo {{ index + 1 }}:</span> <br />{{ todo.text }}
          </div>

          <div class="todo-icon-div">
            <FontAwesomeIcon
              @click="deleteTodo(todo)"
              class="trash"
              :icon="faTrash"
              title="delete todo"
            />
            <FontAwesomeIcon
              @click="moveToCompleted(todo)"
              class="check"
              :icon="faCheck"
              title="Complete todo"
            />
          </div>
        </div>
      </div>

      <p style="margin: 20px 0" v-if="activeTodos.length == 0">
        There are no todos. Please add using the plus icon below.
      </p>

      <p class="subtitle" style="margin-top: 50px">Completed Task:</p>

      <div class="todo-list-container" v-if="completedTodos.length > 0">
        <div class="todolist" v-for="(todo, index) in completedTodos" title="completed todo">
          <div class="todo-details">
            <span>Todo {{ index + 1 }}:</span> <br />{{ todo.text }}
          </div>

          <div class="todo-icon-div">
            <FontAwesomeIcon
              @click="deleteTodo(todo)"
              class="trash"
              :icon="faTrash"
              title="delete todo"
            />
          </div>
        </div>
      </div>

      <p style="margin: 20px 0" v-if="completedTodos.length == 0">
        There are no completed todos. Please add using the plus icon below.
      </p>

      <SideNav />
    </main>
  </div>

  <Footer />
</template>

<style lang="scss" scoped>
.container {
  .dashboard-container {
    display: flex;
    gap: 12px;
    margin: 30px 0;

    .dashboard {
      width: 60%;
      padding: 20px;
      background: #5594f1;
      border: solid 1px #5594f1;
      border-radius: 8px;
      margin: auto auto 40px auto;
      text-align: left;
      display: flex;
      align-items: center;

      img {
        background: transparent;
        height: 40px;
        width: 40px;
        object-fit: cover;
        margin-right: 20px;
      }

      .dash-info {
        background: #5594f1;

        p,
        span {
          border: none;
          color: #000;
          background: #5594f1;
        }

        p {
          font-weight: 700;
        }
      }
    }

    .dashboard.two {
      background-color: #54c3c6;
      border: solid 1px #54c3c6;

      .dash-info {
        background: #54c3c6;
        p,
        span {
          background: #54c3c6;
        }
      }
    }
  }

  .subtitle {
    font-size: 18px;
    color: #1f1f1f;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .todo-list-container {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .todolist {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      border-radius: 12px;
      outline: none;
      border: solid 1px #000000;
      padding: 14px;
      width: 95%;
      min-height: 85px;
      font-size: 18px;
      cursor: pointer;

      .trash {
        color: #e92f2f;
        cursor: pointer;
        position: absolute;
        right: 20px;
        z-index: 100;

        &:hover {
          transform: scale(1.3);
          transition: all 0.3s ease;
        }
      }

      .check {
        color: #0aa06e;
        cursor: pointer;
        position: absolute;
        right: 45px;
        z-index: 100;

        &:hover {
          transform: scale(1.3);
          transition: all 0.3s ease;
        }
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

      &:hover {
        transform: scale(1.0235);
        transition: all 0.3s ease;
      }
    }
  }
}
</style>
