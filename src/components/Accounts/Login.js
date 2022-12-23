import React, {useEffect, useRef, useState} from "react";
import {ActiveCard} from "../CostumDivs";


const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [user, setUser] = useState(false);
    useEffect(() => {
        if (user) {
            fetch('http://127.0.0.1:5000/login/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(user),
            })
                .then(res => res.json())
                .then(res => console.log(res));
        }
        setUser(false);
    }, [user])

    const LoginSubmitHandler = (event) => {
        event.preventDefault();
        setUser({
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }

    return (<>
        <ActiveCard>
            <div className="form-control w-full max-w-xs">
                <form onSubmit={LoginSubmitHandler}>
                    <input className="input input-bordered w-full max-w-xs"
                           ref={emailRef}
                           type="email"
                           id="email"
                           name="email" placeholder="Email"/>
                    <input className="input input-bordered w-full max-w-xs"
                           ref={passwordRef}
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