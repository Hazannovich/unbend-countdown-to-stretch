import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActiveCard } from "../CostumDivs";

const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  if (user) {
  }

  const LoginSubmitHandler = (event) => {
    event.preventDefault();
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    fetch("http://127.0.0.1:5000/login/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        props.setToken(data.access_token);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    emailRef.current.value = "";
    passwordRef.current.value = "";
    navigate("/");
  };

  return (
    <>
      <ActiveCard>
        <div className="form-control w-full max-w-xs">
          <form onSubmit={LoginSubmitHandler}>
            <input
              className="input input-bordered w-full max-w-xs"
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="input input-bordered w-full max-w-xs"
              ref={passwordRef}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <div className="mt-2 flex justify-center items-center">
              <button className="btn glass btn-ghost" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </ActiveCard>
    </>
  );
};

export default Login;
