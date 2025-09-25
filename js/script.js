// Greeting based on current time
const hours = new Date().getHours();
let greeting;
//checking the time
if (hours < 12) {
  greeting = "Good morning!";
} else if (hours < 18) {
  greeting = "Good afternoon!";
} else {
  greeting = "Good evening!";
}

// Show greeting popup
alert(greeting);
