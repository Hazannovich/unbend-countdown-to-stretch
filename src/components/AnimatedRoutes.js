import React, { useEffect, useState, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "../index.css";
import NavBar from "./NavBar";
import useToken from "./useToken";
// import {TransitionGroup, CSSTransition} from "react-transition-group";

const Timer = lazy(() => import("./Timer/Timer"));
const Login = lazy(() => import("./Accounts/Login"));
const Register = lazy(() => import("./Accounts/Register"));
const Contact = lazy(() => import("./Contact/Contact"));
const About = lazy(() => import("./About/About"));
const Profile = lazy(() => import("./Profile"));

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
    <NavBar
      location={location}
      key={location.pathname}
      token={token}
      removeToken={removeToken}
    >
      <div
        className={`${transitionStage}`}
        onAnimationEnd={() => {
          if (transitionStage === "fadeOut") {
            setTransitionStage("fadeIn");
            setDisplayLocation(location);
          }
        }}
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
      </div>
    </NavBar>
  );
};
export default AnimatedRoutes;
