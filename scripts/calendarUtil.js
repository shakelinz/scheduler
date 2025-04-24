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
    if(!localStorage.getItem("currentUser")) {//no user is logged in
        document.location.href = "login.html";
    }
  let elementId = event.target.id; //looks like: "day4hour14"

  //take the day-number from the id:
  let dayNumber = elementId[3];
  let dayDate = "0";
  let hour = 0;
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
