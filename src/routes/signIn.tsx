import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/signIn")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const fldata = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://dev-api.peepul.farm/v1.0/users/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fldata),
        }
      );

      const data = await response.json();
      if (data.data.access_token) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("accessToken", data.data.access_token);
        navigate({ to: "/dashboard" });
      } else {
        alert("Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: "inline-block",
          textAlign: "left",
          padding: "80px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              display: "block",
              marginBottom: "20px",
              padding: "15px",
              width: "100%",
              maxWidth: "500px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              display: "block",
              marginBottom: "20px",
              padding: "15px",
              width: "100%",
              maxWidth: "500px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            display: "block",
            marginTop: "20px",
            padding: "15px",
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <button
          onClick={() => navigate({ to: "/signUp" })}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "16px",
          }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
