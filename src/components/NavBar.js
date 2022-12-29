import React from "react";
import NavButton from "./Buttons";
import { RotatedDiv, RotatedItemDiv } from "./ui/CostumDivs";
import { Link } from "react-router-dom";
import Logout from "../pages/Accounts/Logout";
import Footer from "./Footer";
const NavBar = (props) => {
  let itemMenu = ["Timer", "About", "Profile", "Logout"];
  if (!props.token || props.token === "" || props.token === undefined) {
    itemMenu = ["Timer", "About", "Login", "Register"];
  }

  return (
    <div className="fixed container sm:text-base items-center mx-auto text-neutral-300">
      <Link
        to="/"
        className="px-5 fixed badge badge-outline badge-lg  sm:hidden text-2xl sm:text-base  m-2 text-red-500"
      >
        uNbendEx
      </Link>
      <RotatedDiv>
        <div className="flex h-screen w-screen justify-evenly place-items-center lg:ml-[7.6rem]">
          <div className="flex sm:relative sm:right-[2rem] mx-auto">
            <RotatedItemDiv>
              <NavButton itemTitle={itemMenu[0]} />
            </RotatedItemDiv>
          </div>
          <div className="flex sm:relative mx-auto sm:mr-[10rem] sm:right-[3rem] sm:ml-0">
            <RotatedItemDiv>
              <NavButton itemTitle={itemMenu[1]} />
            </RotatedItemDiv>
          </div>
          <div className="flex mx-auto  sm:w-[0rem] sm:mr-[6rem] sm:ml-0 sm:relative sm:top-0 sm:right-[5rem]">
            <RotatedItemDiv userInput={-1}>{props.children}</RotatedItemDiv>
          </div>
          <div className="flex mx-auto sm:relative sm:right-[3rem] sm:mx-0">
            <RotatedItemDiv>
              <NavButton itemTitle={itemMenu[2]} />
            </RotatedItemDiv>
          </div>
          <div className="flex sm:relative sm:right-[4.5rem] mx-auto sm:mr-2 sm:mx-0">
            <RotatedItemDiv>
              {itemMenu[3] === "Logout" ? (
                <Logout token={props.removeToken} />
              ) : (
                <NavButton itemTitle={itemMenu[3]} />
              )}
            </RotatedItemDiv>
          </div>
        </div>
      </RotatedDiv>
    </div>
  );
};

export default NavBar;
