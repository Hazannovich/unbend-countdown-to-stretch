import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import Timer from "./Timer/Timer";
import Login from "./Accounts/Login";
import Register from "./Accounts/Register";
import Contact from "./Contact/Contact";
import About from "./About/About";
import '../index.css';
import NavBar from "./NavBar";
// import {TransitionGroup, CSSTransition} from "react-transition-group";

const AnimatedRoutes = () => {
    const location = useLocation()
    const [displayLocation, setDisplayLocation] = useState(location)
    const [transitionStage, setTransitionStage] = useState("fadeIn")
    // const timeout = {enter: 800, exit: 400}

    useEffect(() => {
        if (location !== displayLocation) {
            setTransitionStage("fadeOut")
        }
    }, [location, displayLocation])


    return (
        <NavBar location={location} key={location.pathname}>
            <div
                className={`${transitionStage}`}
                onAnimationEnd={() => {
                    if (transitionStage === "fadeOut") {
                        setTransitionStage("fadeIn");
                        setDisplayLocation(location);
                    }
                }}
            >
                <Routes location={displayLocation} key={location.pathname}>
                    <Route exac path="/" element={<Timer/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </div>
        </NavBar>
    )
}
export default AnimatedRoutes