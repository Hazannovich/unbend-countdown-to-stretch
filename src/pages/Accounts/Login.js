import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ActiveCard } from "../../components/ui/CostumDivs";
import { InputGroupField } from "../../components/ui/CostumInputs";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submitted = useRef(false);
  useEffect(() => {
    if (!loading && submitted.current) {
      navigate("/");
      return () => (submitted.current = false);
    }
  }, [loading, submitted]);
  const LoginSubmitHandler = (event) => {
    event.preventDefault();
    submitted.current = true;
    setLoading(true);
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
        setTimeout(() => {
          setLoading(false);
          props.setToken(data.access_token);
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  return (
    <>
      <ActiveCard>
        <form className="w-full m-auto" onSubmit={LoginSubmitHandler}>
          <InputGroupField
            icon={solid("envelope")}
            type="text"
            forwardRef={emailRef}
            placeholder="Email"
          />
          <InputGroupField
            icon={solid("key")}
            type="password"
            forwardRef={passwordRef}
            placeholder="Password"
          />
          <div className="mt-2 flex justify-center items-center">
            <button className="btn " type="submit">
              Login
            </button>
          </div>
        </form>
        {loading && submitted ? (
          <progress className="flex m-auto progress w-56"></progress>
        ) : (
          <h1 className="flex m-auto progress w-56"></h1>
        )}
      </ActiveCard>
    </>
  );
};

export default Login;
