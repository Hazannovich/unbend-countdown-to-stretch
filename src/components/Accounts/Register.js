import React from "react";
import {AnimatedDiv} from "../CostumDivs";


const Register = () => {

    return (
        <div>
            <AnimatedDiv>
                <form>
                    <input type="email" className="bg-primary border-solid border-2 border-gray-700" id="email"
                           name="email" placeholder="Email"/>
                    <br></br>
                    <input className={"my-2 bg-primary border-solid border-2 border-gray-700"} type="password"
                           id="password" name="password"
                           placeholder="Password"/>
                    <br></br>
                    <input type="password" className="bg-primary border-solid border-2 border-gray-700"
                           id="confirmPassword" name="confirmPassword"
                           placeholder="Confirm Password"/>
                    <br></br>
                    <input className={"my-2 bg-primary border-solid border-2 border-gray-700"} type="text" id="name"
                           name="name"
                           placeholder="First Name"/>
                    <div className="text-white flex justify-center items-center">
                        <button className={"hover:text-rose-500"} type="submit">Register</button>
                    </div>
                </form>
            </AnimatedDiv>
        </div>
    )
}

export default Register