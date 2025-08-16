import React, { useState } from "react";
import { loginUser } from "./api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      toast.error("Fill all fields");
      return;
    }
    const res = await loginUser(form);
    if (res.success) {
      toast.success("Login successful");
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
      navigate("/dashboard");
    } else {
      toast.error(res.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">Taj Enterprises Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 mb-5 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-700 text-white w-full py-3 rounded-lg font-semibold hover:bg-blue-800"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
