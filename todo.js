import { db, auth } from "./config.js";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const input = document.querySelector("#todo-val");
const form = document.querySelector("form");
const body = document.querySelector("body");
const btn = document.querySelector("#btn");

let div = document.createElement("div");
document.body.appendChild(div);
div.innerHTML = `${input.value}`;
btn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("loggedout");
      window.location = "./index.html";
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
});
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log(input.value);
      const obj = {
        Todo: input.value,
        uid: uid,
        postDate: Timestamp.fromDate(new Date()),
      };
      try {
        const docRef = await addDoc(collection(db, "users"), obj);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  } else {
  }
});

const querySnapshot = await getDocs(
  query(collection(db, "users"), orderBy("postDate", "desc"))
);
querySnapshot.forEach((doc) => {
  doc = doc.data();
  div.innerHTML += `<h1>${doc.Todo}</h1>`;
});
