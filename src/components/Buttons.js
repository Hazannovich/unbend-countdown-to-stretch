import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";

const NavButton = (props) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "btn btn-md btn-disabled" : "btn btn-md"
          }
          to={
            "/" +
            (props.itemTitle !== "Timer" ? props.itemTitle.toLowerCase() : "")
          }
        >
          {props.itemTitle}
        </NavLink>
      </Suspense>
    </>
  );
};

export default NavButton;
