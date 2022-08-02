

document.getElementById("esb").addEventListener("click", function (e) {
  e.preventDefault();
  //change page req
  const xhttp2 = new XMLHttpRequest();
  xhttp2.open("GET", "/chatroom");
  //xhttp2.setRequestHeader('Login', 'one');
  xhttp2.send();
  //socket.emit('newuser', document.getElementById("email").value, document.getElementById("password").value)
  window.location.href = "http://localhost:3000/chatroom"
});
