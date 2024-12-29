async function login(email, password) {
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Important! This allows cookies to be sent
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = "/tasks"; // Redirect on successful login
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    // Handle error (show to user)
  }
}
