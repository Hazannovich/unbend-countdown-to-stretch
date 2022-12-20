import React from "react";
import {ActiveCard} from "../CostumDivs";


const Login = () => {
    return (<>
        <ActiveCard>
            <div className="form-control w-full max-w-xs">
                <form>
                    <input className="input input-bordered w-full max-w-xs"
                           type="email"
                           id="email"
                           name="email" placeholder="Email"/>
                    <input className="input input-bordered w-full max-w-xs"
                           type="password"
                           id="password" name="password"
                           placeholder="Password"/>
                    <div className="mt-2 flex justify-center items-center">
                        <button className="btn glass btn-ghost" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </ActiveCard>
    </>)
}

export default Login