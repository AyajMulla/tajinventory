const API_BASE = "http://localhost/taj_api"; // Replace with your actual backend path

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return await res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE}/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

// Add, get, delete, update product API calls can go here as well
