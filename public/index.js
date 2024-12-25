const name = require("../models/tasks");
const getDate = () => {
  const today = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const date = today.toLocaleDateString("en-US", options);
  return date;
};
const heading = document.querySelector("h2");
heading.innerHTML = getDate();

// making every input uppersace
function upper() {
  const input = document.querySelector("input");
  input.value = input.value.toUpperCase();
}

// notifications api

window.onload = () => {
  Notification.permission;

  Notification.requestPermission().then((result) => {
    console.log(result);
  });
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }

  Notification.requestPermission().then((permission) => {
    // set the button to show or hide the notification
    notificationBtn.style.display = permission === "granted" ? "none" : "block";
  });
};

// Creatiing a new Notification
const img = "/image source";
const text = `You've got "${name}" to complete`;
const notification = new Notification("To do list", { body: text, icon: img });

// closing the notification when overdue

const n = new Notification("To do list", { body: text, icon: img });
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    n.close();
  }
});
