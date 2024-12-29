async function fetchTasks() {
  try {
    const response = await fetch("/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important! This allows cookies to be sent
    });

    if (response.ok) {
      const tasks = await response.json();
      return tasks;
    } else {
      throw new Error("Failed to fetch tasks");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    // Handle error (show to user)
  }
}
