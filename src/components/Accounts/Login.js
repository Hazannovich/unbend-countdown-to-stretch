import React from "react";
import {AnimatedDiv} from "../CostumDivs";


const Login = () => {


    return (
        <div className="flex h-screen text-xl text-secondary">
            <div className={"m-auto"}>
                {/*<AnimatedDiv key={"Login"}>*/}
                <div>
                    <form>
                        <input className="bg-primary text-base border-solid border-2 border-gray-700" type="email"
                               id="email"
                               name="email" placeholder="Email"/>
                        <br></br>
                        <input className="my-2 text-base bg-primary border-solid border-2 border-gray-700"
                               type="password"
                               id="password" name="password"
                               placeholder="Password"/>
                        <div className="text-white flex justify-center items-center">
                            <button className={"hover:text-rose-500"} type="submit">Login</button>
                        </div>
                    </form>
                </div>
                {/*</AnimatedDiv>*/}
            </div>
        </div>
    )
}

export default Login