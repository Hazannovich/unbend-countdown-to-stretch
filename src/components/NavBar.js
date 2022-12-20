import React from "react";
import NavButton from "./Buttons";
import {RotatedDiv} from "./CostumDivs";
import {Link} from "react-router-dom";

const NavBar = (props) => {

    const itemMenu = [
        "Register",
        "Login",
        "Timer",
        "About",
    ]

    return (
        <div
            className="fixed border-box text-neutral-300">
            <Link to="/" className="px-5 text-xl sm:hidden">uNbend</Link>
            {/*<img className={"static justify-items-start"} src="../logo.png" alt="logo" width={96} height={96}/>*/}
            <RotatedDiv>
                <div className="flex w-screen h-screen sm:h-1/4 justify-center place-content-center">
                    <div className="m-auto mx-0">
                        <RotatedDiv userInput={-1}><NavButton itemTitle={itemMenu[0]}/></RotatedDiv>
                    </div>
                    <div className="ml-auto mr-0 my-auto sm:mx-5">
                        <RotatedDiv userInput={-1}><NavButton itemTitle={itemMenu[1]}/></RotatedDiv>
                    </div>
                    <div className=" w-1/2 sm:w-full sm:my-0 sm-h-1/4 mx-0 my-auto px-24 sm:px-5 sm:py-0 ">
                        <RotatedDiv userInput={-1}>{props.children}</RotatedDiv>
                    </div>
                    <div className="mr-auto ml-auto my-auto sm:mx-5">
                        <RotatedDiv userInput={-1}><NavButton itemTitle={itemMenu[2]}/></RotatedDiv>
                    </div>
                    <div className="m-auto ml-0">
                        <RotatedDiv userInput={-1}><NavButton itemTitle={itemMenu[3]}/>
                        </RotatedDiv>
                    </div>
                </div>
            </RotatedDiv>
        </div>
    )
}

export default NavBar