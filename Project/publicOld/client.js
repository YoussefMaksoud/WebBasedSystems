
/*This file was inspired the socket.io chat tutorial https://socket.io/get-started/chat and the lecture of the joint painting by the professor https://d2l.ucalgary.ca/d2l/le/content/422910/viewContent/5219346/View*/
let socket = io.connect('http://localhost:3000');

document.getElementById("create-Server-Button").addEventListener("click", function (e) {
  e.preventDefault();
  if (document.getElementById("email").value && document.getElementById("password").value && document.getElementById("confirmPassword").value && document.getElementById("password").value == document.getElementById("confirmPassword").value) {
    var jsonStuff = { "email": document.getElementById("email").value, "password": document.getElementById("password").value }
    var toSend = JSON.stringify(jsonStuff)
    document.cookie = "username=" + document.getElementById("email").value;
    const xhttp = new XMLHttpRequest();
    // Send a request
    xhttp.open("POST", "/json-handler");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(toSend);
    //change page req
    const xhttp2 = new XMLHttpRequest();

    xhttp2.open("GET", "/login");
    //xhttp2.setRequestHeader('Login', 'one');
    xhttp2.send(toSend);
    //socket.emit('newuser', document.getElementById("email").value, document.getElementById("password").value)
    window.location.href = "http://localhost:3000/login"
    window.scrollTo(0, document.body.scrollHeight);
    document.getElementById("email").value = '';
    document.getElementById("password").value = '';
    document.getElementById("confirmPassword").value = '';
  }
});

document.getElementById("back-btn").addEventListener("click", function (e) {
  e.preventDefault();
  //change page req
  const xhttp2 = new XMLHttpRequest();
  xhttp2.open("GET", "/");
  //xhttp2.setRequestHeader('Login', 'one');
  xhttp2.send();
  //socket.emit('newuser', document.getElementById("email").value, document.getElementById("password").value)
  window.location.href = "http://localhost:3000"
});