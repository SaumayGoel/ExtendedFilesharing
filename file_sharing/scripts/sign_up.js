import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCN4d_C-O6NXXr7SpcdDu3kDWqkSBtN3lM",
    authDomain: "test-proj-17b15.firebaseapp.com",
    projectId: "test-proj-17b15",
    storageBucket: "test-proj-17b15.appspot.com",
    messagingSenderId: "1004829558220",
    appId: "1:1004829558220:web:30f734b9ba0a453ab8c969",
    databaseURL: "https://test-proj-17b15-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
//--------------------register module-------------------------------------------------

let userInp = document.getElementById('sign_up_username');
let emailInp = document.getElementById('sign_up_email');
let passInp = document.getElementById('sign_up_password');
let signupInp = document.getElementById('sign_up');
let status_text = document.querySelector('.status_text');

let register = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, emailInp.value, passInp.value)
        .then((credentials) => {
            alert('Account created');
            set(ref(db, 'UserAuthList/' + credentials.user.uid), {
                username: userInp.value
            });
            //window.location.href = "../index.html"
        })
        .catch((error) => {
            alert("Error creating account: " + error.message);
        });
};

signupInp.addEventListener("submit", register);