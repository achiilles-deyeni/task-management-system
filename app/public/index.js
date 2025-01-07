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
const heading = document.getElementById("heading");
heading.innerHTML = getDate();

const getYear = () => {
  const year = new Date().getFullYear();
  return year;
};

const footerYear = document.querySelector("span");
footerYear.innerHTML = getYear();

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
    notification.style.display = permission === "granted" ? "none" : "block";
  });
};

// Creatiing a new Notification
const img = "/image source";
const text = `You've got some tasks to complete`;
const notification = new Notification("To do list", { body: text, icon: img });

// closing the notification when overdue

const n = new Notification("To do list", { body: text, icon: img });
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    n.close();
  }
});

// validation
validateRegistration = () => {
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    handleValidationErrors;
};

validateLogin = () => {
  body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationErrors;
};
