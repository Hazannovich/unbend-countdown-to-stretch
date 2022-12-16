import React from "react";
import {
    Link
} from "react-router-dom";
import {motion} from "framer-motion";

const NavButton = props => {

    return (
        <div className={"flex justify-center items-center mx-5"}>
            <motion.button
                whileHover={{scale: 1.1}}
                transition={{duration: 0.1}}
                whileTap={{scale: 0.8}}
                className={"" +
                    "transform" +
                    " transition-all" +
                    " hover:text-neutral-500" +
                    " duration-300"}><Link
                to={"/" + props.itemTitle.toLowerCase()}>{props.itemTitle}</Link>
            </motion.button>
        </div>
    );

}

export default NavButton
