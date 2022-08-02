

document.getElementById("csb").addEventListener("click", function (e) {
  e.preventDefault();
  if (document.getElementById("ServerName").value) {
    var jsonStuff = { "ServerName": document.getElementById("ServerName").value, "Description": document.getElementById("ServerDescription").value , "Password":document.getElementById("ServerPassword").value}
    var toSend = JSON.stringify(jsonStuff)
    const xhttp = new XMLHttpRequest();
    // Send a request
    xhttp.open("POST", "/createServer");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(toSend);
    window.location.href = "http://localhost:3000/login"
  }
});

document.getElementById("back").addEventListener("click", function (e) {
  const xhttp2 = new XMLHttpRequest();
  console.log("here")
  xhttp2.open("GET", "/login");
  //xhttp2.setRequestHeader('Login', 'one');
  xhttp2.send();
  //socket.emit('newuser', document.getElementById("email").value, document.getElementById("password").value)
  window.location.href = "http://localhost:3000/login"
});
