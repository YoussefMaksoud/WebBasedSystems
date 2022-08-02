

//get currently joined rooms
const xhttp2 = new XMLHttpRequest();
xhttp2.open("GET", "/inrooms", false);
xhttp2.send();
if (xhttp2.readyState === xhttp2.DONE) {
  if (xhttp2.status === 200) {
    console.log(xhttp2.response);
    console.log(xhttp2.responseText);
  }
}
var finaltext = JSON.parse(xhttp2.responseText);
for (let i = 0; i < finaltext.length; i++) {
  var item = document.createElement('li');
  item.id = 'item' + i;
  var p = document.createElement('p');
  var b1 = document.createElement('button');
  var b2 = document.createElement('button');
  p.textContent = finaltext[i].room;
  b1.textContent = "Leave";
  p.className = 'room-name';
  b1.className = 'leave';
  b2.className = 'join';
  p.id = 'room-name' + i;
  b1.id = 'leave' + i;
  b2.id = 'join' + + i;
  b2.textContent = "Join";
  item.appendChild(p);
  item.appendChild(b1);
  item.appendChild(b2);
  console.log(item)
  rlist.append(item)
}
document.getElementById("rlist").addEventListener("click", function (e) {
  // e.target was the clicked element
  let id = String(e.target.id)
  if (id.startsWith("leave")) {
    let p = "room-name" + id.substring(5)
    let rname = document.getElementById(p).innerHTML
    var jsonStuff = { "ServerName": rname }
    var toSend = JSON.stringify(jsonStuff)
    const xhttp = new XMLHttpRequest();
    // Send a request
    xhttp.open("POST", "/leaveroom");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(toSend);
    document.getElementById("rlist").removeChild(document.getElementById('item' + id.substring(5)));
  } else if (id.startsWith("join")) {
    let p = "room-name" + id.substring(4)
    let rname = document.getElementById(p).innerHTML
    var jsonStuff = { "ServerName": rname }
    var toSend = JSON.stringify(jsonStuff)
    const xhttp = new XMLHttpRequest();
    // Send a request
    xhttp.open("POST", "/joinexisting");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(toSend);
    window.location.href = "http://localhost:3000/chatroom"
  }
});


document.getElementById("Join").addEventListener("click", function (e) {
  e.preventDefault();
  //change page req
  const xhttp2 = new XMLHttpRequest();
  xhttp2.open("GET", "/join");
  //xhttp2.setRequestHeader('Login', 'one');
  xhttp2.send();
  //socket.emit('newuser', document.getElementById("email").value, document.getElementById("password").value)
  window.location.href = "http://localhost:3000/join"

});
document.getElementById("Create").addEventListener("click", function (e) {
  e.preventDefault();
  //change page req
  const xhttp2 = new XMLHttpRequest();
  xhttp2.open("GET", "/create");
  //xhttp2.setRequestHeader('Login', 'one');
  xhttp2.send();
  //socket.emit('newuser', document.getElementById("email").value, document.getElementById("password").value)
  window.location.href = "http://localhost:3000/create"

});
document.getElementById("logout").addEventListener("click", function (e) {
  e.preventDefault();
  //change page req
  const xhttp2 = new XMLHttpRequest();
  xhttp2.open("GET", "/");
  //xhttp2.setRequestHeader('Login', 'one');
  xhttp2.send();
  //socket.emit('newuser', document.getElementById("email").value, document.getElementById("password").value)
  window.location.href = "http://localhost:3000"

});