import React from "react";


const Login = () => {


    return (
        <div className="flex px-0.5 h-screen text-xl text-secondary">
            <div className={"m-auto"}>
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
            </div>
        </div>
    )
}

export default Login