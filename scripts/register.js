import { User, Task} from "./classes.js";
let users = JSON.parse(localStorage.getItem("users"));
// Making sure the button will load before the function
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("rgtBtn").addEventListener("click", register_handler);

})

// Function to insert the user details to the localstorage
function register_handler(event){
    event.preventDefault();
    if(users.some(u => u.username === document.getElementById("username").value)) {
        alert("username already exists");
        return;
    }
    console.log("check");
    
    let lastUserId = users[users.length - 1];
    let isManager = false;//the default is regular employee
    if(!lastUserId) {//the first user 
        lastUserId = 0;
    }else {
        lastUserId = lastUserId.userId;
    }
    if(document.getElementById("userOption").checked) {//manager pressed
        isManager = true;
    }
    let newUser = new User(lastUserId + 1, document.getElementById("username").value, document.getElementById("password").value, [], isManager);
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    document.location.href = "login.html";
}

