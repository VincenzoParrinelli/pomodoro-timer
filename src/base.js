import { initializeApp } from 'firebase/app'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    "projectId": "pomodoro-timer-acdd6",
    "appId": "1:398478762265:web:a74f1f86e8bf05d1f5e588",
    "storageBucket": "pomodoro-timer-acdd6.appspot.com",
    "locationId": "europe-west",
    "apiKey": "AIzaSyBPqqpD0vLleVaRIpIY6UFXlmkOYIcb3t4",
    "authDomain": "pomodoro-timer-acdd6.firebaseapp.com",
    "messagingSenderId": "398478762265"
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
