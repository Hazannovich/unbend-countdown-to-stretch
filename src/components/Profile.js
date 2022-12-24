import React, { useState } from "react";
import { ActiveCard } from "./CostumDivs";

const Profile = (props) => {
  const [profileData, setProfileData] = useState(null);
  function getData() {
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
            profile_name: data.name,
            about_me: data.about,
          });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  return (
    <ActiveCard>
      <button className="btn" onClick={getData}>
        Profile
      </button>
      {profileData && (
        <div>
          <p>Profile name: {profileData.profile_name}</p>
          <p>About me: {profileData.about_me}</p>
        </div>
      )}
    </ActiveCard>
  );
};

export default Profile;
