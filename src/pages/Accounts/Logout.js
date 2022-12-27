import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";

function Logout(props) {
  function logMeOut() {
    fetch("http://127.0.0.1:5000/logout/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => props.token())
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NavLink className="btn btn-md sm:btn-sm" onClick={logMeOut} to="/">
          Logout
        </NavLink>
      </Suspense>
    </>
  );
}

export default Logout;
