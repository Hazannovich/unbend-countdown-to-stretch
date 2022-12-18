import React, {useState} from 'react';
import styled from "styled-components";
import {motion} from "framer-motion";

const RotateDiv = styled.div`
  transform: rotate(${props => (props.userInput === -2 ? props.degrees : (props.degrees !== 90 ? props.degrees * props.userInput : -90))}deg);
`;
export const RotatedDiv = (props) => {
    let degree = Math.atan(window.innerHeight / window.innerWidth) * 180 / Math.PI
    if (window.innerWidth <= 639) {
        degree = 90
    }
    const [degrees, setDegrees] = useState(degree);
    React.useEffect(() => {
        const handleResize = () => {
            let degrees = Math.atan(window.innerHeight / window.innerWidth) * 180 / Math.PI;
            if (window.innerWidth <= 639) {
                degrees = 90;
            }
            setDegrees(degrees);
        }
        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })


    return (<RotateDiv degrees={degrees} userInput={(props.userInput || props.userInput === 0 ? props.userInput : -2)}>
        {props.children}
    </RotateDiv>)
}

export const AnimatedDiv = (props) => {

    return (
        <>
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
                    x: 200
                }}
                transition={{duration: 0.8}}
            >
                {props.children}
            </motion.div>
        </>
    )
}
