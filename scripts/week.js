//main code
let weekStartDate = new Date(setDatesInWeek());
fillWeek(weekStartDate);

function setDatesInWeek(anyWantedDateInWeek = new Date()) {
    //console.log(anyWantedDateInWeek);
    // getting day of week from variable anyWantedDateInWeek:
    // function getDay() returns 0 (= Sunday) to 6 (= Saturday).
    let dayNumberInWeek = anyWantedDateInWeek.getDay();
    if (dayNumberInWeek > 0) {
        // go back to Sunday
        anyWantedDateInWeek.setDate(anyWantedDateInWeek.getDate() - dayNumberInWeek);
        //console.log(dayNumberInWeek);
        //console.log(anyWantedDateInWeek);
    }
    return anyWantedDateInWeek;
}

function fillWeek(weekStartDate) {
    let startDate = new Date(weekStartDate);
    let tempPElement;
    let tempDateString = "";
    for (let i = 1; i <= 7; i++) {
        // display the date in the page, formatted as DD/MM/YYYY:
        tempDateString = startDate.toLocaleDateString('en-GB'); // DD/MM/YYYY
        tempPElement = document.getElementById(`dayDate${i}`);
        tempPElement.innerText = tempDateString;

        // "store" the date in a hidden element, formatted as YYYY-MM-DD:
        tempDateString = startDate.toISOString().split('T')[0]; // YYYY-MM-DD
        tempPElement = document.getElementById(`hidden${i}`);
        tempPElement.innerText = tempDateString;

        startDate.setDate(startDate.getDate() + 1);
    }
}

function prevWeek() {
    let sundayPElement = document.getElementById('hidden1');
    let tempDate = new Date(sundayPElement.innerText);
    tempDate.setDate(tempDate.getDate() - 1);
    let weekStartDate = new Date(setDatesInWeek(tempDate));
    fillWeek(weekStartDate);
}

function nextWeek() {
    let saturdayPElement = document.getElementById('hidden7');
    let tempDate = new Date(saturdayPElement.innerText);
    tempDate.setDate(tempDate.getDate() + 1);
    let weekStartDate = new Date(setDatesInWeek(tempDate));
    fillWeek(weekStartDate);
}

function openModalForNew(event) {
    let elementId = event.target.id; //looks like: "day4hour14"

    //take the day-number from the id:
    let dayNumber = elementId[3];

    //find the date of this day:
    const hiddenElement = document.getElementById(`hidden${dayNumber}`);
    let dayDate = hiddenElement.innerText;

    //find the time from the id:
    let hour = elementId.substring(8);

    //now we have the date: dayDate (example: "2025-04-22")
    //and the time: hour (examples: "8" or "12")
    console.log(dayDate);
    console.log(hour);
}


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
