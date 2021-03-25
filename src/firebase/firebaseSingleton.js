import firebase from 'firebase/app'
import firebaseConfig from './firebaseConfig'
import 'firebase/auth'
import 'firebase/database'

export const fb  = firebase.initializeApp(firebaseConfig)


