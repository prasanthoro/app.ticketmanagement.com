// import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";

// export const Route = createFileRoute("/signUp")({
//   component: Signup,
// });

// function Signup() {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [errorMessage, setErrorMessage] = useState<string>("");

//   const navigate = useNavigate();

//   // Password validation function
//   const validatePassword = (password: string) => {
//     const regex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
//     return regex.test(password);
//   };

//   const handleSignUp = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validatePassword(password)) {
//       setErrorMessage(
//         "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
//       );
//       return;
//     }

//     if (password !== confirmPassword) {
//       setErrorMessage("Passwords do not match!");
//       return;
//     }

//     setErrorMessage("");
//     console.log("Sign Up:", { email, password });
//     navigate({ to: "/dashboard" });
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Create an Account</h2>
//       <form
//         onSubmit={handleSignUp}
//         style={{ display: "inline-block", textAlign: "left" }}
//       >
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{ display: "block", marginBottom: "10px" }}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{ display: "block", marginBottom: "10px" }}
//           />
//         </div>
//         <div>
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             style={{ display: "block", marginBottom: "10px" }}
//           />
//         </div>
//         {errorMessage && (
//           <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
//         )}
//         <button type="submit" style={{ display: "block", marginTop: "10px" }}>
//           Sign Up
//         </button>
//       </form>
//       <p style={{ marginTop: "20px" }}>
//         Already have an account?{" "}
//         <button
//           onClick={() => navigate({ to: "/signIn" })}
//           style={{
//             background: "none",
//             border: "none",
//             color: "blue",
//             cursor: "pointer",
//             textDecoration: "underline",
//           }}
//         >
//           Sign In
//         </button>
//       </p>
//     </div>
//   );
// }

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/signUp")({
  component: Signup,
});

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(password);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setErrorMessage("");
    console.log("Sign Up:", { email, password });
    navigate({ to: "/dashboard" });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create an Account</h2>
      <form
        onSubmit={handleSignUp}
        style={{
          display: "inline-block",
          textAlign: "left",
          padding: "50px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
              marginBottom: "15px",
              padding: "12px",
              width: "100%",
              maxWidth: "400px",
              borderRadius: "4px",
              border: "1px solid #ddd",
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
              marginBottom: "15px",
              padding: "12px",
              width: "100%",
              maxWidth: "400px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              display: "block",
              marginBottom: "15px",
              padding: "12px",
              width: "100%",
              maxWidth: "400px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
        </div>
        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
        )}
        <button
          type="submit"
          style={{
            display: "block",
            marginTop: "10px",
            padding: "12px",
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <button
          onClick={() => navigate({ to: "/signIn" })}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Sign In
        </button>
      </p>
    </div>
  );
}
