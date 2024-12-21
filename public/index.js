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

// notifications
function notify() {
  Notification.requestPermission().then(
    alert("Would you like to receive notifications from this site?")
  );
  if (perm === "granted") {
    setInterval(() => {
      alert("You have uncompleted tasks.");
    }, 3600000);
  }
}
