import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage, uploadBytesResumable, ref , getDownloadURL} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getFirestore, collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyCN4d_C-O6NXXr7SpcdDu3kDWqkSBtN3lM",
authDomain: "test-proj-17b15.firebaseapp.com",
databaseURL: "https://test-proj-17b15-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "test-proj-17b15",
storageBucket: "test-proj-17b15.appspot.com",
messagingSenderId: "1004829558220",
appId: "1:1004829558220:web:30f734b9ba0a453ab8c969"
};
const submit_btn = document.getElementById("submit_btn");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const usersCollection = collection(db, "users");
const auth = getAuth(app);

const copy = document.querySelector('.copy');
const url_box = document.querySelector('.url_box');

const input_field = document.getElementById("file");
const form_btn = document.getElementById("submit_btn");

const send_box = document.querySelector('.send_box');
const send_btn = document.querySelector(".send_btn");

let url_temp = ''
let upload_file = (e) =>{
    e.preventDefault()
    const file = input_field.files[0];
    if (file){
        const storageRef = ref(storage,"uploads/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',(snapshot)=>{
            const progress = Math.trunc((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            submit_btn.innerHTML = "";
            submit_btn.innerHTML = `${progress}%`;
        },(error)=>{
            console.error('error during upload',error)
        },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                submit_btn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
                url_box.setAttribute('value',downloadURL);
                url_temp += downloadURL
            })
        })
    }else{
        alert("file not found!!")
    }
}

let copyText = (e) =>{
    e.preventDefault()
    url_box.select();
    url_box.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(url_box.value)
    copy.innerHTML=''
    copy.innerHTML='<i class="fa-solid fa-check"></i>'
}
let url_send = (e) =>{
    e.preventDefault();
    let sendbox = send_box.value
    let docRef = doc(db, "users/", `${sendbox}`);
    setDoc(docRef, {url_received: `${url_temp}`,state: 'Not_Visited'})
    .then(()=>{
        send_btn.innerHTML = ''
        send_btn.innerHTML = '<i class="fa-solid fa-square-check"></i>'
    })
    .catch(()=>{
        send_btn.innerHTML = ''
        send_btn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    })
}

async function check_path(){
    let astronaut_up = document.querySelector('.astronaut_up');
    let astronaut_rot = document.querySelector('.astronaut_rot');
    let image_link = document.querySelector('.image_link')
    let usercreds = JSON.parse(sessionStorage.getItem("user-creds"));
    let file_name = document.querySelector('#file').value;

    let documentId = usercreds.email;
    const userDocRef = doc(usersCollection, documentId);
    const userDocSnapshot = await getDoc(userDocRef);
    
    if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        let received = userData.url_received;
        alert(received)
        astronaut_up.style.top = '-35px';
        astronaut_rot.classList.add('astronaut_rot');
        image_link.setAttribute('href', received);
        image_link.setAttribute('download', file_name);
    } else {
        alert("No such document!");
    }
}

send_btn.addEventListener('click', url_send)
copy.addEventListener('click',copyText)
form_btn.addEventListener('click',upload_file)

export { check_path };