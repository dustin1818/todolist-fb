import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDG9trUw6xuhN9c9qHIsN0whTLTbCyzpV8',
  authDomain: 'todolist-2025-d2174.firebaseapp.com',
  projectId: 'todolist-2025-d2174',
  storageBucket: 'todolist-2025-d2174.firebasestorage.app',
  messagingSenderId: '459434640050',
  appId: '1:459434640050:web:e5bee6f29c18cd1af47fab',
  measurementId: 'G-0RSXHF92EF',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
