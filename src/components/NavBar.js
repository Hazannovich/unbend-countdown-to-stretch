import React from "react";
import NavButton from "./Buttons";
import {RotatedDiv} from "./CostumDivs";
import {AnimatePresence, motion} from "framer-motion";

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
        "Timer",
        "About",
    ]

    return (
        <AnimatePresence>
            <div
                className="fixed bg-primary text-secondary h-screen w-screen">
                <RotatedDiv>
                    <div className={" flex w-screen h-screen justify-center"}>
                        <div
                            className={"m-auto"}>
                            <RotatedDiv userInput={-1}>
                                <NavButton itemTitle={itemMenu[0]}/>
                            </RotatedDiv>
                        </div>
                        <div
                            className={"m-auto "}>
                            <RotatedDiv userInput={-1}>
                                <NavButton itemTitle={itemMenu[1]}/>
                            </RotatedDiv>
                        </div>
                        <div
                            className={"m-auto"}>
                            <RotatedDiv userInput={-1}>
                                <motion.div
                                    layout
                                    key={props.key}
                                    initial={{
                                        opacity: 0,
                                        y: 100
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 100,
                                    }}
                                    transition={{duration: 0.8}}
                                >
                                    {props.children}
                                </motion.div>

                            </RotatedDiv>
                        </div>
                        <div
                            className={"m-auto"}>
                            <RotatedDiv userInput={-1}>
                                <NavButton itemTitle={itemMenu[2]}/>
                            </RotatedDiv>
                        </div>
                        <div
                            className={"m-auto"}>
                            <RotatedDiv userInput={-1}>
                                <NavButton itemTitle={itemMenu[3]}/>
                            </RotatedDiv>
                        </div>

                    </div>
                </RotatedDiv>
            </div>
        </AnimatePresence>
    )
}

export default NavBar