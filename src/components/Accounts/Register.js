import React, {useEffect, useRef, useState} from "react";
import {ActiveCard} from "../CostumDivs";


const Register = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const [newUser, setNewUser] = useState(false);
    useEffect(() => {
        if (newUser) {
            fetch('http://127.0.0.1:5000/register/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
                .then(res => res.json())
                .then(res => console.log(res));
        }
        setNewUser(false);
    }, [newUser])

    function RegisterSubmitHandler(event) {
        event.preventDefault();
        setNewUser({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            passwordConfirm: passwordConfirmRef.current.value,
            name: nameRef.current.value
        });
        emailRef.current.value = "";
        passwordRef.current.value = "";
        passwordConfirmRef.current.value = "";
        nameRef.current.value = "";
    }

    return (<>
            <ActiveCard>
                <div className="form-control w-full max-w-xs">
                    <form onSubmit={RegisterSubmitHandler}>
                        <input ref={emailRef} type="email"
                               className="input input-bordered w-full max-w-xs" id="email"
                               name="email" placeholder="Email"/>
                        <br></br>
                        <input ref={passwordRef}
                               className={"input input-bordered w-full max-w-xs"}
                               type="password"
                               id="password" name="password"
                               placeholder="Password"/>
                        <br></br>
                        <input ref={passwordConfirmRef} type="password"
                               className="input input-bordered w-full max-w-xs"
                               id="confirmPassword" name="confirmPassword"
                               placeholder="Confirm Password"/>
                        <br></br>
                        <input ref={nameRef}
                               className={"input input-bordered w-full max-w-xs"}
                               type="text"
                               id="name"
                               name="name"
                               placeholder="First Name"/>
                        <div className="mt-2 flex justify-center items-center">
                            <button className={"btn glass btn-ghost"} type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </ActiveCard>
        </>
    )
}

export default Register