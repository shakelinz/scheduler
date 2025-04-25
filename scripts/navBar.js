let currentUser = JSON.parse(localStorage.getItem("currentUser"));
const navBar = document.getElementById("navBar");
navBar.innerHTML = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="home.html">Scheduler<br>(home)</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul id="navBarList" class="navbar-nav">
                
                
                <li class="nav-item">
                    <a id = "register" class="nav-link" href="register.html">Register</a>
                </li>
                <li class="nav-item">
                    <a id = "login" class="nav-link" href="login.html">Log In</a>
                </li>
            </ul>
            <div id="userInfo" class="d-flex align-items-center ms-auto"></div>

        </div>
    </div>
</nav>
`;

// If someone is logged in, update navbar
if (currentUser) {
    // manager info
    let managerInfo = currentUser.isManager ? " the Manager" : "";
  document.getElementById("userInfo").innerHTML = `
          <span class="me-2">Welcome, <strong>${currentUser.username} ${managerInfo}</strong></span>
          <button class="btn btn-outline-danger ms-3" onclick="logout()">Logout</button>
      `;
  // Hide register and login links
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "none";
}

// Logout function
function logout() {
    let users = JSON.parse(localStorage.getItem("users"));
    users = users.map((user) =>
      user.username == currentUser.username ? currentUser : user
    );
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("currentUser");
    window.location.reload(); // Refresh to update navbar
    location.href = "home.html";
  }