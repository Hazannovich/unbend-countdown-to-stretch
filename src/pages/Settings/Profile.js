import { cleanup } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { ActiveCard } from "../../components/ui/CostumDivs";

const Profile = (props) => {
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/profile/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        props.token &&
          setProfileData({
            name: data.name,
            email: data.email,
          });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    return () => cleanup();
  });
  return (
    <ActiveCard>
      <h1>Profile</h1>
      {profileData && (
        <div>
          <p>name: {profileData.name}</p>
          <p>email: {profileData.email}</p>
        </div>
      )}
    </ActiveCard>
  );
};

export default Profile;
