

let thisUser;
let thisRoom;
//getusername
$(document).ready(function () {
  $.get("/getUser", function (data, status) {
    thisUser = data;
  });
});
//getroomname
$(document).ready(function () {
  $.get("/getRoom", function (data, status) {
    console.log(data)
    document.getElementById("title").textContent = data;
    thisRoom = data;
  });
});
let ftext = ""
//message memory
$(document).ready(function () {
  $.get("/getMessages", function (data, status) {
    var finaltext = JSON.parse(data);
    for (let i = 0; i < finaltext.length; i++) {
      var item = document.createElement('li');
      item.textContent = "[" + finaltext[i].userID + "] " + finaltext[i].content;
      messages.appendChild(item);
    }
  });
});

/*This file was inspired the socket.io chat tutorial https://socket.io/get-started/chat and the lecture of the joint painting by the professor https://d2l.ucalgary.ca/d2l/le/content/422910/viewContent/5219346/View*/
let socket = io.connect('http://localhost:3000');

//receive messages from others
socket.on('updatemessage', function (usr, msg) {
  console.log(usr)
  console.log(msg)
  var item = document.createElement('li');
  item.textContent = "[" + usr + "] " + msg;
  messages.appendChild(item);
});
https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript

document.getElementById("SendFile").addEventListener("change", function (e) {
  const uploadedFile = this.files[0];
  console.log(uploadedFile)
  const objURL = window.URL.createObjectURL(uploadedFile);
  socket.emit('fileUpload',uploadedFile.name, uploadedFile)
  /*
  const objURL = window.URL.createObjectURL(uploadedFile);
  //https://stackoverflow.com/questions/3916191/download-data-url-file
  var item = document.createElement('li');

  const link = document.createElement("a");
  link.href = objURL;
  link.download = uploadedFile.name;
  link.innerHTML = '<a href="' + link +'">HTML</a>';
  messages.appendChild(link);
  socket.emit('fileUpload',uploadedFile.name, )
  */
});

document.getElementById("sendMessage").addEventListener("click", function (e) {
  e.preventDefault();
  socket.emit('chatmessage', thisUser, document.getElementById("textBox").value,thisRoom)
  var item = document.createElement('li');
  item.textContent = "[" + thisUser + "] " + document.getElementById("textBox").value;
  item.style.fontWeight = "bold"
  messages.appendChild(item);
  textBox.value = '';

});

document.getElementById("back-to-servers").addEventListener("click", function (e) {
  e.preventDefault();
  //change page req
  const xhttp2 = new XMLHttpRequest();
  xhttp2.open("GET", "/login");
  //xhttp2.setRequestHeader('Login', 'one');
  xhttp2.send();
  //socket.emit('newuser', document.getElementById("email").value, document.getElementById("password").value)
  window.location.href = "http://localhost:3000/login"
});