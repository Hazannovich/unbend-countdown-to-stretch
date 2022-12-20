import React, {useRef} from "react";


const Register = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const firstNameRef = useRef();

    function RegisterSubmitHandler(event) {
        event.preventDefault();
        // const newAccount = {
        //     email: emailRef.current.value,
        //     password: passwordRef.current.value,
        //     passwordConfirm: passwordConfirmRef.current.value,
        //     firstName: firstNameRef.current.value
        // }
    }

    return (
        <div className="flex px-0.5 h-screen text-2xl text-secondary">
            <div className={"m-auto "}>
                <div>
                    <form onSubmit={RegisterSubmitHandler}>
                        <input ref={emailRef} type="email"
                               className="bg-primary text-base border-solid border-2 border-gray-700" id="email"
                               name="email" placeholder="Email"/>
                        <br></br>
                        <input ref={passwordRef}
                               className={"text-base my-2 bg-primary border-solid border-2 border-gray-700"}
                               type="password"
                               id="password" name="password"
                               placeholder="Password"/>
                        <br></br>
                        <input ref={passwordConfirmRef} type="password"
                               className="bg-primary text-base border-solid border-2 border-gray-700"
                               id="confirmPassword" name="confirmPassword"
                               placeholder="Confirm Password"/>
                        <br></br>
                        <input ref={firstNameRef}
                               className={"my-2 text-base bg-primary border-solid border-2 border-gray-700"}
                               type="text"
                               id="name"
                               name="name"
                               placeholder="First Name"/>
                        <div className="text-white flex justify-center items-center">
                            <button className={"hover:text-rose-500"} type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register