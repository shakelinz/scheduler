import { User, Task} from "./classes.js";
let users = JSON.parse(localStorage.getItem("users"));


// Making sure the button will load before the function
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("logInBtn").addEventListener("click", logIn_handler);

})


function logIn_handler(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (users.some(user => user.username === username && user.password === password)) {
        localStorage.setItem('currentUser', JSON.stringify(users.find(user => user.username === username)));
        document.location.href = "home.html";
    } else {
        alert('Invalid username or password');
        return;
    }
}