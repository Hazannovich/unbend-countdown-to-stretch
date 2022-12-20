import React from "react";
import {
    NavLink
} from "react-router-dom";

const NavButton = props => {
    return (
        <>
            <NavLink className={({isActive}) => (isActive ? 'underline underline-offset-4' +
                ' decoration-white' +
                ' ' : '')}
                     to={"/" + (props.itemTitle !== "Timer" ? props.itemTitle.toLowerCase() : "")}>{props.itemTitle}</NavLink>
        </>
    );
}


export default NavButton
