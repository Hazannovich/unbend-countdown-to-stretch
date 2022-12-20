import React from "react";
import NavButton from "./Buttons";
import {Drawer, RotatedDiv, RotatedItemDiv} from "./CostumDivs";
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
            className="fixed container sm:text-base items-center mx-auto text-neutral-300">
            <Link to="/"
                  className="px-5 badge badge-outline badge-lg  text-2xl sm:text-base  m-2 text-red-500">Unbend</Link>
            {/*<img className={"static justify-items-start"} src="../logo.png" alt="logo" width={96} height={96}/>*/}
            <RotatedDiv>
                <div className="flex h-screen w-screen justify-evenly ">
                    <div className="flex sm:relative sm:right-[1rem] mr-auto sm:mx-0 sm:mr-0">
                        <RotatedItemDiv userInput={-1}><NavButton itemTitle={itemMenu[0]}/></RotatedItemDiv>
                    </div>
                    <div className="flex sm:relative mr-auto sm:mr-[10rem] sm:right-[3rem] sm:ml-0">
                        <RotatedItemDiv userInput={-1}><NavButton itemTitle={itemMenu[1]}/></RotatedItemDiv>
                    </div>
                    <div
                        className="flex mx-[3rem]  sm:w-[0rem] sm:mr-[6rem] sm:top-[0rem] sm:ml-0 sm:relative sm:top-0 sm:right-[5rem]">
                        <RotatedItemDiv userInput={-1}>
                            {props.children}
                        </RotatedItemDiv>
                    </div>
                    <div className="flex  ml-auto sm:relative sm:right-[3rem] sm:mx-0">
                        <RotatedItemDiv userInput={-1}><NavButton itemTitle={itemMenu[2]}/></RotatedItemDiv>
                    </div>
                    <div className="flex sm:relative sm:right-[4.5rem] ml-auto mr-1 sm:mx-0">
                        <RotatedItemDiv userInput={-1}><NavButton itemTitle={itemMenu[3]}/>
                        </RotatedItemDiv>
                    </div>
                </div>
            </RotatedDiv>
        </div>
    )
}

export default NavBar