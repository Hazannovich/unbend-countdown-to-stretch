import { cleanup } from "@testing-library/react";
import React, { useEffect, useState, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import { ActiveCard } from "../../components/ui/CostumDivs";

const Profile = (props) => {
  const [loading, setLoading] = useState(true);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const defaultWorkRef = useRef();
  const defaultBreakRef = useRef();
  const profileData = useFetch(setLoading, "profile/", props.token);
  const ChangeSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <ActiveCard>
      {loading ? (
        <progress className="flex m-auto progress w-56"></progress>
      ) : (
        <form className="" onSubmit={ChangeSubmitHandler}>
          <div className="form-control  ">
            <label className="input-group input-group-sm">
              <span className="pl-[0.2rem] pr-[1.85rem]">Name</span>
              <input
                type="text"
                ref={nameRef}
                defaultValue={profileData.name}
                className="input input-bordered input-sm pr-10 sm:pr-0"
              />
            </label>
          </div>
          <div className="form-control ">
            <label className="input-group py-1 input-group-sm ">
              <span className="pl-[0.2rem] pr-[2rem]">Email</span>
              <input
                type="text"
                ref={emailRef}
                defaultValue={profileData.email}
                className="input input-bordered input-sm pr-10 sm:pr-0"
              />
            </label>
          </div>
          <div className="form-control ">
            <label className="input-group input-group-sm ">
              <span className="px-[0.2rem]">Password</span>
              <input
                type="password"
                ref={passwordRef}
                defaultValue={profileData.password}
                className="input input-bordered input-sm pr-10 sm:pr-0"
              />
            </label>
          </div>
          <div className=" inline-flex py-1 justify-evenly">
            <label className="input-group input-group-sm ">
              <span className="pl-[0.2rem] pr-[2.1rem]">Work</span>
              <input
                type="text"
                ref={defaultWorkRef}
                defaultValue={profileData.default_work}
                className="input input-bordered input-sm w-[35%] sm:w-1/2"
              />
            </label>
            <label className="input-group input-group-sm">
              <span className="sm:pl-[0.2rem]">Break</span>
              <input
                type="text"
                ref={defaultBreakRef}
                defaultValue={profileData.default_break}
                className="input input-bordered input-sm w-[35%] sm:w-1/2"
              />
            </label>
          </div>
          <div className="form-control mt-2 justify-center">
            <button className="btn glass btn-ghost" type="submit">
              Change
            </button>
          </div>
        </form>
      )}
    </ActiveCard>
  );
};

export default Profile;
