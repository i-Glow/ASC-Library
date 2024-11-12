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
    image.style.aspectRatio = "3/4";
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
      addBookToCart({ bookId: doc.id, returnDate: "", type: "achat" });
      alert(`book added to cart: ${data.name}`);
    };

    const borrowButton = document.createElement("button");
    borrowButton.textContent = "Borrow (15d)";
    borrowButton.style.margin = "0px 10px";
    borrowButton.style.padding = "5px 10px";
    borrowButton.style.backgroundColor = "#4CAF50";
    borrowButton.style.color = "white";
    borrowButton.style.border = "none";
    borrowButton.style.borderRadius = "3px";
    borrowButton.style.cursor = "pointer";
    borrowButton.onclick = () => {
      const date = new Date();
      date.setDate(date.getDate() + 15);

      addBookToCart({
        bookId: doc.id,
        returnDate: new Date(date).toISOString(),
        type: "emprunt",
      });
      alert(`book added to cart: ${data.name}`);
    };

    bookDiv.appendChild(image);
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(price);
    bookDiv.appendChild(orderButton);
    bookDiv.appendChild(borrowButton);

    bookList.appendChild(bookDiv);
  });
};

function addBookToCart(book) {
  const cart = getCookie("cart");
  const bookList = cart ? JSON.parse(cart) : [];
  bookList.push(book);

  document.cookie = `cart=${JSON.stringify(
    bookList
  )}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}
