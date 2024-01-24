import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCN4d_C-O6NXXr7SpcdDu3kDWqkSBtN3lM",
    authDomain: "test-proj-17b15.firebaseapp.com",
    projectId: "test-proj-17b15",
    storageBucket: "test-proj-17b15.appspot.com",
    messagingSenderId: "1004829558220",
    appId: "1:1004829558220:web:30f734b9ba0a453ab8c969",
    databaseURL: "https://test-proj-17b15-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

//--------------------login module-------------------------------------------------

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

let emailInpt = document.getElementById('emailInp');
let passInpt = document.getElementById('passInp');
let loginInpt = document.getElementById('sign_in');

let signInUser = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, emailInpt.value, passInpt.value)
        .then((credentials) => {
            get(child(ref(db), 'UserAuthList/' + credentials.user.uid))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        sessionStorage.setItem("user-info", JSON.stringify({
                            username: snapshot.val().username
                        }));
                        sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                        window.location.href = '../html/home.html';
                    }
                })
                .catch((error) => {
                    alert("Error fetching user data: " + error.message);
                });
        })
        .catch((error) => {
            alert("Invalid email/password or something failed!! " + error.message);
        });
};
loginInpt.addEventListener("submit", signInUser);
