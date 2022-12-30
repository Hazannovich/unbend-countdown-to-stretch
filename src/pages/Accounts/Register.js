import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ActiveCard } from "../../components/ui/CostumDivs";
import { InputGroupField } from "../../components/ui/CostumInputs";
const Register = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submitted = useRef(false);
  useEffect(() => {
    if (!loading && submitted.current) {
      navigate("/");
      return () => (submitted.current = false);
    }
  }, [loading, submitted, navigate]);
  function RegisterSubmitHandler(event) {
    event.preventDefault();
    submitted.current = true;
    setLoading(true);
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
        setLoading(false);
        props.setToken(data.access_token);
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
      <form className="w-full m-auto" onSubmit={RegisterSubmitHandler}>
        <InputGroupField
          iconClass="pr-[0.4rem]"
          icon={solid("user")}
          type="text"
          forwardRef={nameRef}
          placeholder="Name"
        />
        <InputGroupField
          icon={solid("envelope")}
          type="text"
          forwardRef={emailRef}
          placeholder="Email"
        />
        <InputGroupField
          icon={solid("key")}
          type="Password"
          forwardRef={passwordRef}
          placeholder="Password"
        />
        <InputGroupField
          icon={solid("lock")}
          type="Password"
          forwardRef={passwordConfirmRef}
          placeholder="Confirm Password"
        />
        <div className="mt-2 flex justify-center items-center">
          <button className={"btn"} type="submit">
            Register
          </button>
        </div>
      </form>
      {loading && submitted ? (
        <progress className="flex m-auto progress w-56"></progress>
      ) : (
        <h1 className="flex m-auto progress w-56"> </h1>
      )}
    </ActiveCard>
  );
};

export default Register;
