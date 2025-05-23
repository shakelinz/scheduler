import { User, Task, initLocalStorage } from "./classes.js";
import { setDatesInWeek, fillWeek, prevWeek, nextWeek, openModalForNew } from "./calendarUtil.js"
initLocalStorage();

function closeModal() {
    document.getElementById("deleteTaskDiv").style.display = "none";
    document.getElementById("creatorsNameDiv").style.display = "none";
    document.getElementById("newTaskModal").close();
}
function saveTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let description = document.getElementById("description").value;
    let priority = document.getElementById("priority").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let creatorId = currentUser.userId;
    let status = "pending";
    let task = tasks.find(task => task.taskId == taskId);
    if (task) {
        // Editing an existing task
        task.description = description;
        task.priority = priority;
        task.date = date;
        task.time = time;
        task.status = status;
        let userTaskIndex = currentUser.tasks.findIndex(task => task.taskId == taskId);
        if (userTaskIndex !== -1) {
            currentUser.tasks[userTaskIndex] = task;
        }
    } else {
        // Creating a new task
        let newTaskId;

        // Check if there's any task in the tasks list
        if (tasks.length > 0) {
            newTaskId = Math.max(...tasks.map(task => task.taskId)) + 1; // Ensure unique task ID
        } else {
            newTaskId = 1; // If no tasks exist, start from 1
        }

        // Create a new task with the unique ID
        task = new Task(newTaskId, description, priority, date, time, creatorId, status);

        // Push the new task to the global tasks array and current user’s task array
        tasks.push(task);
        currentUser.tasks.push(task);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    closeModal();
    //location.reload();

    // Return the save and delete buttons to their original state
    document.getElementById("deleteTaskDiv").onclick = () => deleteTask(0);
    document.getElementById("saveChanges").onclick = () => saveTask(0);
    //we want to stay on the same week we've been. So:
    redrawCurrentWeek(date);
}

function redrawCurrentWeek(wantedDateInWeek) {
    //set a date object according to variable 'wantedDateInWeek'
    let wantedDateInWeekObj = new Date(wantedDateInWeek);
    let weekStartDate = setDatesInWeek(wantedDateInWeekObj);
    fillWeek(weekStartDate);
}


function editTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let users = JSON.parse(localStorage.getItem("users"));
    let task = tasks.find(task => task.taskId === taskId);
    if (task && task.status !== "finished") {
        document.getElementById("deleteTaskDiv").style.display = "block";
        document.getElementById("creatorsNameDiv").style.display = "block";
        document.getElementById("creatorsNameDiv").innerText = `Creator: ${users.find(u => u.userId == task.creatorId).username}`;
        document.getElementById("description").value = task.description;
        document.getElementById("modalTitle").innerText = task.description;
        document.getElementById("priority").value = task.priority;
        document.getElementById("deleteTaskDiv").onclick = () => deleteTask(task.taskId);
        document.getElementById("saveChanges").onclick = () => saveTask(task.taskId);
        document.getElementById("newTaskModal").showModal();
        document.getElementById("date").value = task.date;
        document.getElementById("time").value = Number(task.time);
    }
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let task = currentUser.tasks.find(task => task.taskId == taskId);
    if (task) {
        task.status = "finished";
    }
    task = tasks.find(task => task.taskId == taskId);
    task.status = "finished";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    let taskDate = task.date;
    closeModal();
    //location.reload();
    // Return the save and delete buttons to their original state
    document.getElementById("deleteTaskDiv").onclick = () => deleteTask(0);
    document.getElementById("saveChanges").onclick = () => saveTask(0);
    //we want to stay on the same week we've been. So:
    redrawCurrentWeek(taskDate);
}


// Attaching functions globally in order for them to work with onclick
window.prevWeek = prevWeek;
window.nextWeek = nextWeek;
window.openModalForNew = openModalForNew;
window.closeModal = closeModal;
window.saveTask = saveTask;
window.editTask = editTask;
window.deleteTask = deleteTask;


//main code
//let weekStartDate = new Date(setDatesInWeek());
//fillWeek(weekStartDate);
redrawCurrentWeek(new Date().toISOString().split('T')[0]);


// dates date טיפול בתאריכים
// -----------------------------------
// ערך מהאינפוט דייט
// let fromInput = document.getElementById("myInputDate").value;
// היום
// let d = new Date();
// ממשתנה אחר
// let d = new Date(fromInput);
// פורמט נפוץ בישראל dd/mm/yyyy
// let formattedDate = d.toLocaleDateString('en-GB');
// להוסיף יום אחד
// d.setDate(d.getDate() + 1);
// לחסר יום אחד אחורה
// yom.setDate(yom.getDate() - 1);

// חלקים של תאריך - החלק של השעה:
// שעה
// d.getHours()
// דקות
// d.getMinutes()
// שניות
// d.getSeconds()

// מומל. להשתמש בשביל סטורג' וכד' בפורמט
// "YYYY-MM-DD":
// const date = new Date(); // or any other date object
// const isoDate = date.toISOString().split('T')[0]; // "YYYY-MM-DD"
// localStorage.setItem('selectedDate', isoDate);
// ...
// const storedDate = localStorage.getItem('selectedDate');
// if (storedDate) {
//   const date = new Date(storedDate); // interpreted as "YYYY-MM-DD"
//   console.log(date.toDateString()); // or use it however you want
// }

// מומלץ לצורך מציאת תאריך של יום ראשון השבוע
// function getWeekDates(referenceDate = new Date()) {
//   const week = [];

//   const dayOfWeek = referenceDate.getDay(); // 0 (Sun) to 6 (Sat)
//   const sunday = new Date(referenceDate); // clone
//   sunday.setDate(referenceDate.getDate() - dayOfWeek); // go back to Sunday

//   for (let i = 0; i < 7; i++) {
//     const date = new Date(sunday); // clone Sunday
//     date.setDate(sunday.getDate() + i); // add days
//     week.push(date.toISOString().split('T')[0]); // store as 'YYYY-MM-DD'
//   }

//   return week;
// }

// // Example usage:
// const weekDates = getWeekDates(new Date("2025-04-22")); // Tuesday
// console.log(weekDates);
// // Output: ["2025-04-20", "2025-04-21", ..., "2025-04-26"]
