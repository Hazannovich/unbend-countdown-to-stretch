import React, { useEffect, useState, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "../index.css";
import NavBar from "./NavBar";
import useToken from "../hooks/useToken";
import { RouteIntroDiv } from "./ui/CostumDivs";
import { FlashMsg } from "./utils/FlashMsg";
import Bus from "./utils/Bus";
// import {TransitionGroup, CSSTransition} from "react-transition-group";

const Timer = lazy(() => import("../pages/Timer/Timer"));
const Login = lazy(() => import("../pages/Accounts/Login"));
const Register = lazy(() => import("../pages/Accounts/Register"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const About = lazy(() => import("../pages/About/About"));
const Profile = lazy(() => import("../pages/Settings/Profile"));
window.flash = (message, type = "success") =>
  Bus.emit("flash", { message, type });
window.flash("record has been created successfully!", "success");
const AnimatedRoutes = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const { token, removeToken, setToken } = useToken();
  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  return (
    <>
      <NavBar
        location={location}
        key={location.pathname}
        token={token}
        removeToken={removeToken}
      >
        <RouteIntroDiv
          transitionStage={transitionStage}
          setTransitionStage={setTransitionStage}
          setDisplayLocation={setDisplayLocation}
          location={location}
        >
          <>
            <Routes location={displayLocation} key={location.pathname}>
              <Route exac path="/" element={<Timer />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route
                path="/register"
                element={<Register setToken={setToken} />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/profile"
                element={<Profile token={token} setToken={setToken} />}
              />
            </Routes>
          </>
        </RouteIntroDiv>
      </NavBar>
    </>
  );
};
export default AnimatedRoutes;
