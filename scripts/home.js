import { User, Task, initLocalStorage } from "./classes.js";
import {setDatesInWeek, fillWeek, prevWeek, nextWeek, openModalForNew} from "./calendarUtil.js"
initLocalStorage();

//main code
let weekStartDate = new Date(setDatesInWeek());
fillWeek(weekStartDate);
// Attaching functions globally in order for them to work with onclick
window.prevWeek = prevWeek;
window.nextWeek = nextWeek;
window.openModalForNew = openModalForNew;


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
