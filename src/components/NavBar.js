import React from "react";
import NavButton from "./Buttons";
import {RotatedDiv} from "./CostumDivs";

const NavBar = (props) => {


    // const PositionsChangeHandler = (nextItem) => {
    //     setItemPositions(
    //         props.itemPositions.map((item, index) => {
    //             if (item === nextItem) {
    //                 return props.itemPositions[2]
    //             } else if (index === 2) {
    //                 return nextItem;
    //             }
    //             return item;
    //         })
    //     );
    //     setPrevPosition(itemPositions);
    // }
    const itemMenu = [
        "Register",
        "Login",
        props.children,
        "Timer",
        "About",
    ]

    return (
        <div>
            <div className="fixed left-0 right-0 bg-primary text-secondary box-border">
                <div className="static justify-center items-center h-screen w-screen">
                    <RotatedDiv>
                        <div className={" flex w-screen h-screen justify-around items-center" +
                            " box-border"}>
                            {itemMenu.map((itemName, index) => {
                                return <div key={String(itemName)}
                                            className={"grid grid-cols-1 sm:flex w-screen h-screen justify-around" +
                                                " items-center"}>
                                    <RotatedDiv userInput={-1} key={String(itemName)}>
                                        <div key={String(itemName)}
                                             className={"flex justify-center grow m-0 sm:h-1/5" +
                                                 " box-border px-0 py-0 text-2xl sm:text-lg"}>
                                            {(index === 2 ? itemMenu[2] :
                                                <NavButton itemTitle={String(itemName)}/>)}
                                        </div>
                                    </RotatedDiv>
                                </div>
                            })}
                        </div>
                    </RotatedDiv>
                </div>
            </div>
        </div>
    )
}

export default NavBar