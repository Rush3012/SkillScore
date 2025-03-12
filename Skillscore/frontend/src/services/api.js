export const loginUser = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "student@example.com" && password === "1234") {
          resolve({ role: "student" });
        } else if (email === "faculty@example.com" && password === "1234") {
          resolve({ role: "faculty" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000); // Simulating a network delay
    });
  };
  