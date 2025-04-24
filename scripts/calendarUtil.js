export function setDatesInWeek(anyWantedDateInWeek = new Date()) {
  //console.log(anyWantedDateInWeek);
  // getting day of week from variable anyWantedDateInWeek:
  // function getDay() returns 0 (= Sunday) to 6 (= Saturday).
  let dayNumberInWeek = anyWantedDateInWeek.getDay();
  if (dayNumberInWeek > 0) {
    // go back to Sunday
    anyWantedDateInWeek.setDate(
      anyWantedDateInWeek.getDate() - dayNumberInWeek
    );
    //console.log(dayNumberInWeek);
    //console.log(anyWantedDateInWeek);
  }
  return anyWantedDateInWeek;
}

export function fillWeek(weekStartDate) {
  let startDate = new Date(weekStartDate);
  let tempPElement;
  let tempDateString = "";
  for (let i = 1; i <= 7; i++) {
    // display the date in the page, formatted as DD/MM/YYYY:
    tempDateString = startDate.toLocaleDateString("en-GB"); // DD/MM/YYYY
    tempPElement = document.getElementById(`dayDate${i}`);
    tempPElement.innerText = tempDateString;

    // "store" the date in a hidden element, formatted as YYYY-MM-DD:
    tempDateString = startDate.toISOString().split("T")[0]; // YYYY-MM-DD
    tempPElement = document.getElementById(`hidden${i}`);
    tempPElement.innerText = tempDateString;

    startDate.setDate(startDate.getDate() + 1);
  }
  putTasksOnWeek(weekStartDate);
}

export function prevWeek() {
  let sundayPElement = document.getElementById("hidden1");
  let tempDate = new Date(sundayPElement.innerText);
  tempDate.setDate(tempDate.getDate() - 1);
  let weekStartDate = new Date(setDatesInWeek(tempDate));
  fillWeek(weekStartDate);
}

export function nextWeek() {
  let saturdayPElement = document.getElementById("hidden7");
  let tempDate = new Date(saturdayPElement.innerText);
  tempDate.setDate(tempDate.getDate() + 1);
  let weekStartDate = new Date(setDatesInWeek(tempDate));
  fillWeek(weekStartDate);
}

export function openModalForNew(event) {
  if (!localStorage.getItem("currentUser")) {//no user is logged in
    document.location.href = "login.html";
  }
  let elementId = event.target.id; //looks like: "day4hour14"

  //take the day-number from the id:
  let dayNumber = elementId[3];
  let dayDate = "0";
  let hour = 8;
  //   The user clicked inside the calendar
  //find the date of this day:
  const hiddenElement = document.getElementById(`hidden${dayNumber}`);
  if (hiddenElement) {
    dayDate = hiddenElement.innerText;

    //find the time from the id:
    hour = elementId.substring(8);

    //now we have the date: dayDate (example: "2025-04-22")
    //and the time: hour (examples: "8" or "12")
    console.log(dayDate);
    console.log(hour);
  }
  let newTaskModal = document.getElementById("newTaskModal");
  newTaskModal.showModal();
  document.getElementById("date").value = dayDate;
  document.getElementById("time").value = hour;
  document.getElementById("priority").value = 1;
}
let test = "test";
export let currUser;
export let tasksArr = [];
export function clearWeek() {
  let hourElement;
  let hourString = "";
  for (let i = 1; i <= 7; i++) {
    for (let j = 8; j <= 18; j++) {
      if (j < 10) {
        hourString = `0${j}:00`;
      } else {
        hourString = `${j}:00`;
      }
      hourElement = document.getElementById(`day${i}hour${j}`);
      hourElement.innerHTML = hourString;
    }
  }
}

export function putTasksOnWeek(startDate) {
  let hourElement;
  let thisWeekStartDate;
  let thisWeekEndDate;
  clearWeek();

  // get currentUser.userId & isManager
  currUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currUser) {
    return;
  }
  const userId = currUser.userId;
  const isManager = currUser.isManager;
  //if isManager == true -> show all tasks. else, show only tasks of userId (Task.creatorId)

  //also, show only tasks of dates: from startDate until (startDate + 6)
  thisWeekStartDate = new Date(startDate);
  thisWeekEndDate = new Date(startDate);
  thisWeekEndDate.setDate(thisWeekEndDate.getDate() + 6);

  //let stringThisWeekStartDate = thisWeekStartDate.toISOString().split('T')[0]; //"YYYY-MM-DD"
  //let stringThisWeekEndDate = thisWeekEndDate.toISOString().split('T')[0]; //"YYYY-MM-DD"

  //get tasks
  tasksArr = JSON.parse(localStorage.getItem("tasks"));
  if (tasksArr.length == 0) {
    return;
  }
  for (let i = 0; i < tasksArr.length; i++) {
    let tmpTask = tasksArr[i];
    if (isManager == false && tmpTask.creatorId != userId) continue;
    let tmpThisDate = new Date(tmpTask.date);
    if (tmpThisDate < thisWeekStartDate || tmpThisDate > thisWeekEndDate) continue;

    //now we know the task should appear in this week
    //from the task we have: tmpTask.time
    //the hour element's id is like this: `day${dayInWeek}hour${hour}`

    //find number of the day in the week
    let tmpDate = new Date(tmpTask.date);
    let tmpDayInWeek = tmpDate.getDay() + 1; //because getDay() returns 0 for Sunday, 1 for Monday etc.
    hourElement = document.getElementById(`day${tmpDayInWeek}hour${tmpTask.time}`);

    //add innerHTML like this: <div class="task">Task Description</div>
    hourElement.innerHTML += `
            <div class="task" onclick="editTask(${tmpTask.taskId})">${tmpTask.description}</div>    
        `;
  }
}