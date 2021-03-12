import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"

const app = firebase.initializeApp ({
  apiKey: "AIzaSyDqMS5DN6ccaSk1osv3-c_fh5zIUATFAvE",
  authDomain: "sr-auth-b4f3a.firebaseapp.com",
  projectId: "sr-auth-b4f3a",
  storageBucket: "sr-auth-b4f3a.appspot.com",
  messagingSenderId: "573860503199",
  appId: "1:573860503199:web:5c06f078e22f68bc4b0caa"
})


export const auth = app.auth()
export default app