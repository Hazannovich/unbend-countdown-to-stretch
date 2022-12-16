import React from "react";
import {AnimatedDiv} from "../CostumDivs";


const Login = () => {


    return (
        <div>
            <AnimatedDiv>
                <form>
                    <input className="bg-primary border-solid border-2 border-gray-700" type="email" id="email"
                           name="email" placeholder="Email"/>
                    <br></br>
                    <input className="my-2 bg-primary border-solid border-2 border-gray-700" type="password"
                           id="password" name="password"
                           placeholder="Password"/>
                    <div className="text-white flex justify-center items-center">
                        <button className={"hover:text-rose-500"} type="submit">Login</button>
                    </div>
                </form>
            </AnimatedDiv>
        </div>
    )
}

export default Login