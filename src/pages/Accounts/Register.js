import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ActiveCard } from "../../components/ui/CostumDivs";

const Register = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();

  function RegisterSubmitHandler(event) {
    event.preventDefault();

    const newUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordConfirm: passwordConfirmRef.current.value,
      name: nameRef.current.value,
    };
    fetch("http://127.0.0.1:5000/register/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
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
    passwordConfirmRef.current.value = "";
    nameRef.current.value = "";
    navigate("/");
  }

  return (
    <>
      <ActiveCard>
        <div className="form-control w-full max-w-xs">
          <form onSubmit={RegisterSubmitHandler}>
            <input
              ref={emailRef}
              type="email"
              className="input input-bordered w-full max-w-xs"
              id="email"
              name="email"
              placeholder="Email"
            />
            <input
              ref={passwordRef}
              className={"input input-bordered w-full max-w-xs"}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <input
              ref={passwordConfirmRef}
              type="password"
              className="input input-bordered w-full max-w-xs"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <input
              ref={nameRef}
              className={"input input-bordered w-full max-w-xs"}
              type="text"
              id="name"
              name="name"
              placeholder="Name"
            />
            <div className="mt-2 flex justify-center items-center">
              <button className={"btn glass btn-ghost"} type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </ActiveCard>
    </>
  );
};

export default Register;
