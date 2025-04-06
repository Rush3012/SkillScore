const BASE_URL = "http://localhost:8080";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    return await response.json(); // Should return { role: "student" } or { role: "faculty" }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const getStudentDashboard = async () => {
  try {
    const response = await fetch(`${BASE_URL}/student/dashboard`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch student dashboard");
    }

    return await response.json();
  } catch (error) {
    console.error("Student dashboard error:", error);
    throw error;
  }
};

export const getFacultyDashboard = async () => {
  try {
    const response = await fetch(`${BASE_URL}/faculty/dashboard`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch faculty dashboard");
    }

    return await response.json();
  } catch (error) {
    console.error("Faculty dashboard error:", error);
    throw error;
  }
};
