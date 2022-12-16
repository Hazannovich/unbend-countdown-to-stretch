import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import Timer from "./Timer/Timer";
import Login from "./Accounts/Login";
import Register from "./Accounts/Register";
import Contact from "./Contact/Contact";
import About from "./About/About";
import {AnimatePresence} from "framer-motion";
import NavBar from "./NavBar";

const AnimatedRoutes = () => {
    const location = useLocation()
    return (
        <NavBar>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route exac path="/" element={<Timer/>}/>
                    <Route path="/timer" element={<Timer/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </AnimatePresence>
        </NavBar>
    )
}
export default AnimatedRoutes