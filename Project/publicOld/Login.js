

document.getElementById("signup").addEventListener("click", function (e) {
  /*e.preventDefault();
  if (document.getElementById("email").value && document.getElementById("password").value) {
    console.log()
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
  }*/
  e.preventDefault();
  //change page req
  const xhttp2 = new XMLHttpRequest();
  xhttp2.open("GET", "/new");
  //xhttp2.setRequestHeader('Login', 'one');
  xhttp2.send();
  //socket.emit('newuser', document.getElementById("email").value, document.getElementById("password").value)
  window.location.href = "http://localhost:3000/new"
});

document.getElementById("login").addEventListener("click", function (e) {
  e.preventDefault();
  if (document.getElementById("email").value && document.getElementById("password").value) {
    var jsonStuff = { "email": document.getElementById("email").value, "password": document.getElementById("password").value }
    var toSend = JSON.stringify(jsonStuff)

    const xhttp = new XMLHttpRequest();
    // Send a request
    xhttp.open("POST", "/json-handler1");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(toSend);
    //change page req
    document.cookie = "username=" + document.getElementById("email").value;
    const xhttp2 = new XMLHttpRequest();

    xhttp2.open("GET", "/login");
    //xhttp2.setRequestHeader('Login', 'one');
    xhttp2.send(toSend);
    //socket.emit('newuser', document.getElementById("email").value, document.getElementById("password").value)
    window.location.href = "http://localhost:3000/login"
  }
});