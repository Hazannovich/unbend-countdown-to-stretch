import React, {useState} from "react";
import {
    Link
} from "react-router-dom";
import {motion} from "framer-motion";

const NavButton = props => {

    return (
        <>
            <motion.button
                whileHover={{scale: 1.1}}
                transition={{duration: 0.1}}
                whileTap={{scale: 0.8}}
                className={"" +
                    "transform" +
                    " transition-all" +
                    " hover:text-neutral-500" +
                    " duration-300 m-auto"}><Link to={"/" + props.itemTitle.toLowerCase()}>{props.itemTitle}</Link>
            </motion.button>
        </>
    );
}

export const TimerBreakWorkButton = (props) => {
    const [time, setTime] = React.useState(props.val);

    const TimeHandler = amount => {
        setTime((currentTime) => currentTime + amount)
    };

    return (
        <div className="flex justify-center items-center">
            <motion.button
                whileHover={{scale: 1.1}}
                transition={{duration: 0.1}}
                whileTap={{scale: 0.8}}
                onClick={() => TimeHandler(-1)}>-
            </motion.button>
            {props.children}
            <motion.button
                whileHover={{scale: 1.1}}
                transition={{duration: 0.1}}
                whileTap={{scale: 0.8}}
                onClick={() => TimeHandler(1)}>+
            </motion.button>
        </div>
    )

}

export default NavButton
