import { db, auth } from "./config.js";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const input = document.querySelector("#todo-val");
const form = document.querySelector("form");
const body = document.querySelector("body");
const div = document.querySelector(".main-div");
const btn = document.querySelector("#btn");

let Array = [];

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
    render(uid);
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
        // obj.docId = docRef.id;
        // Array = [obj.do, ...Array];
        // // console.log(Array);
        // div.innerHTML = `${input.value}<br>` + div.innerHTML;
        Array = [];
        render(uid);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  } else {
  }
});

async function render(uid) {

  const querySnapshot = await getDocs(
    query(
      collection(db, "users"),
      orderBy("postDate", "desc"),
      where("uid", "==", uid)
    )
  );
  div.innerHTML = "";
  Array = []

  querySnapshot.forEach((doc) => {
    Array.push({ ...doc.data(), docId: doc.id });
  });
  Array.forEach((obj) => {
    div.innerHTML += `<div class="p-2">${obj.Todo
      }<button class="delete border-2 ml-5 bg-red-400">delete</button> <button class="edit border-2 ml-5 bg-blue-400">edit</button></div>`;
  })
  const remove = document.querySelectorAll(".delete");
  const update = document.querySelectorAll(".edit");
  remove.forEach((button, index) => {
    button.addEventListener("click", async () => {
      console.log("Delete button clicked", [index]);
      await deleteDoc(doc(db, "users", Array[index].docId))
      render(uid);
    });
  });
  console.log(Array);
  update.forEach((button, index) => {
    button.addEventListener("click", async () => {
      console.log("Update button clicked", [index]);
      const newVal = prompt("Enter updated todo ")
      console.log(newVal);
      await updateDoc(doc(db, "users", Array[index].docId), {
        Todo: newVal,
      });
      render(uid)
    });
  });
}