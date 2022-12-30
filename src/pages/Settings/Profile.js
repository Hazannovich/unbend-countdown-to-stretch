import React, { useEffect, useState, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import { ActiveCard } from "../../components/ui/CostumDivs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { InputField, InputGroupField } from "../../components/ui/CostumInputs";
const Profile = (props) => {
  const [loading, setLoading] = useState(true);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const defaultWorkRef = useRef();
  const defaultBreakRef = useRef();
  const passwordConfirmRef = useRef();
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const profileData = useFetch(setLoading, "profile/", props.token);
  const ChangeSubmitHandler = (event) => {
    event.preventDefault();
  };
  const ConfirmSubmitHandler = (event) => {
    const password = { password: passwordConfirmRef.current.value };
    event.preventDefault();
    setLoading(() => true);
    fetch("http://127.0.0.1:5000/confirm-pass/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify(password),
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setPasswordConfirmed(data);
          setLoading(() => false);
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    passwordConfirmRef.current.value = profileData.name;
  };
  if (!passwordConfirmed) {
    return (
      <ActiveCard>
        <form
          className="flex justify-center m-auto "
          onSubmit={ConfirmSubmitHandler}
        >
          <div className="form-control">
            <div className="input-group">
              <InputField
                type="password"
                forwardRef={passwordConfirmRef}
                placeholder="Confirm Password."
              />
              <button className="btn text-xl btn-square btn-sm">
                <FontAwesomeIcon icon={regular("circle-check")} />
              </button>
            </div>
          </div>
        </form>
      </ActiveCard>
    );
  }
  return (
    <ActiveCard>
      {loading ? (
        <progress className="flex m-auto progress w-56"></progress>
      ) : (
        <form className="w-full m-auto" onSubmit={ChangeSubmitHandler}>
          <InputGroupField
            iconClass="pr-[0.4rem]"
            icon={solid("user")}
            type="text"
            forwardRef={nameRef}
            default={profileData.name}
          />
          <InputGroupField
            icon={solid("envelope")}
            type="text"
            forwardRef={emailRef}
            default={profileData.email}
          />
          <InputGroupField
            icon={solid("key")}
            type="password"
            forwardRef={passwordRef}
          />
          <div className="flex">
            <InputGroupField
              icon={solid("business-time")}
              type="number"
              forwardRef={defaultWorkRef}
              default={profileData.default_work}
            />
            <InputGroupField
              icon={solid("mug-saucer")}
              type="number"
              forwardRef={defaultBreakRef}
              default={profileData.default_break}
            />
          </div>
          <div className="form-control mt-1 items-center justify-center">
            <button className="btn btn-md" type="submit">
              Change
            </button>
          </div>
        </form>
      )}
    </ActiveCard>
  );
};

export default Profile;
