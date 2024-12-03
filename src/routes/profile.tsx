import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      setMessage("You need to log in to view your profile.");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://api-ticketmanagement.onrender.com/v1.0/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Profile data:", data);
          setProfile(data);
        } else {
          const errorData = await response.json();
          setMessage(errorData.message || "Failed to fetch profile.");
        }
      } catch (error) {
        setMessage("Network error. Please try again later.");
      }
    };

    fetchProfile();
  }, [token]);

  if (!token) {
    return <p>{message}</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Profile</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      {profile?.data ? (
        <div>
          <p>
            <strong>Name:</strong> {profile.data.full_name}
          </p>
          <p>
            <strong>Email:</strong> {profile.data.email}
          </p>
        </div>
      ) : (
        !message && <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
