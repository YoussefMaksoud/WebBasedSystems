
const socket = io();
const chatMessages = document.querySelector('.messages');
const usernameForm = document.getElementById('login');
const inputForm = document.getElementById('form');

const randNames = ['john', 'jeff', 'rebecca', 'stacy', 'arnold', 'malone', 'chelsea']
const randColours = ['#f74324', '#bd1047', '#998882', '#95683d', '#ec8364', '#5e6530', '#21de2a']

//retrieve the username and the color from the url
var {usernameChoice, colorChoice} = Qs.parse(window.location.search, {
    ignoreQueryPrefix: true
})

//if client is in guest mode randomly assign a name and a color
if(typeof usernameChoice === "undefined" || typeof colorChoice === "undefined"){
    usernameChoice = randNames[Math.floor(Math.random() * 7)] + Math.floor(Math.random()*(999-100+1)+100).toString();
    colorChoice = randColours[Math.floor(Math.random() * 7)];
}

//set the sockets username
socket.username = usernameChoice;

//join chatroom
socket.emit('join chat', socket.username, colorChoice);

//recieving a message from the server
socket.on('message', (message, color) =>{
    displayMessage(message, color);
});

//retrieving the user list from the server
socket.on('chat users', ({users}) => {
    displayUsers(users);
})

//submitting a message
inputForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //get the message
    const the_message = event.target.elements.input.value;
    socket.emit("chat message", the_message, socket.username, colorChoice);

    //clear the box
    event.target.elements.input.value = "";
    event.target.elements.input.focus();
});

//changing the username and color
usernameForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const new_username = event.target.elements.username.value; //value entered in input textbox
    const new_color = event.target.elements.newColor.value; //color input value

    event.target.elements.username.value = ""; //clearing the textbox
    event.target.elements.username.focus();

    socket.username = new_username;
    colorChoice = new_color;

    socket.emit('change username', new_username, new_color); //send the new username and color to the server

})

//displaying the message in the chatroom
function displayMessage(message, color) {
    const div = document.createElement('div'); //create a new div element
    if(message.username == socket.username){
        div.style.backgroundColor = 'rgb(87, 61, 238)'; //if the current user has sent the message, message bubble appears darker
    }
    div.classList.add('message'); //create a new message

    //the html of the new message
    div.innerHTML = 
    `<p class = "meta"><font color = ${color}>${message.username}</font>
        <span>${message.time}</span>
    </p>
    <p class = "text">
        ${message.message}
    </p>`;
    document.querySelector('.messages').appendChild(div);

    //scroll-up messages
    window.scrollTo(0,document.body.scrollHeight);
}

//displays the user in the sidebar
function displayUsers(users){
    const ul = document.getElementById('users');
    ul.innerHTML = `${users.map(user => `<li><font color = ${user.color}>${user.username.replace(',', '')}</font></li>`).join(" ")}`

}