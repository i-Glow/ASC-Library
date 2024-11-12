import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNVN3rPtlMvM70KPzxA1X_3WfE25NzHfY",
  authDomain: "asc-library-1.firebaseapp.com",
  projectId: "asc-library-1",
  storageBucket: "asc-library-1.appspot.com",
  messagingSenderId: "23052073129",
  appId: "1:23052073129:web:a5d76c309c4cf0c71f11b8",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

window.onload = async function () {
  const books = await getDocs(collection(db, "books"));
  const bookList = document.getElementById("bookList");

  books.forEach((doc) => {
    const data = doc.data();
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.style.margin = "10px";
    bookDiv.style.padding = "10px";
    bookDiv.style.border = "1px solid #ccc";
    bookDiv.style.borderRadius = "5px";

    const title = document.createElement("h3");
    title.textContent = data.name;

    const author = document.createElement("p");
    author.textContent = `Author: ${data.author}`;

    const price = document.createElement("p");
    price.textContent = `Price: $${(data.price / 100).toFixed(2)}`;

    const image = document.createElement("img");
    image.src = data.image;
    image.style.width = "200px";
    image.style.marginBottom = "10px";

    const orderButton = document.createElement("button");
    orderButton.textContent = "Order Now";
    orderButton.style.padding = "5px 10px";
    orderButton.style.backgroundColor = "#4CAF50";
    orderButton.style.color = "white";
    orderButton.style.border = "none";
    orderButton.style.borderRadius = "3px";
    orderButton.style.cursor = "pointer";
    orderButton.onclick = () => {
      console.log("to be implemented");
    };

    bookDiv.appendChild(image);
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(price);
    bookDiv.appendChild(orderButton);

    bookList.appendChild(bookDiv);
  });
};
