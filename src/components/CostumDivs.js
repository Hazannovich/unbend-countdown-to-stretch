import React, {useState} from 'react';
import styled from "styled-components";

const RotateDiv = styled.div`
  transform: rotate(${props => (props.userInput === -2 ? props.degrees : (props.degrees !== 90 ? props.degrees * props.userInput : -90))}deg);
  align-items: center;
  justify-content: space-evenly;
  display: flex;
  padding: 0;
  margin: 0;
  border: 0;
  height: 100%;
  width: 100%;
`;
const RotateItemDiv = styled.div`
  transform: rotate(${props => (props.userInput === -2 ? props.degrees : (props.degrees !== 90 ? props.degrees * props.userInput : -90))}deg);
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0;
  margin: auto;
  border: 0;
  height: fit-content;
  width: 100%;
`;
export const SpanTimer = styled.span`
  --value: ${props => props.value};
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


    return (
        <RotateDiv degrees={degrees} userInput={(props.userInput || props.userInput === 0 ? props.userInput : -2)}>
            {props.children}
        </RotateDiv>
    )
}

export const ActiveCard = (props) => {
    return (
        <div className="card overflow-scroll bg-base-100 shadow-xl">
            <div className="card-body sm:p-5 h-[20rem] sm:h-[17rem] sm:w-[18rem] w-96">
                {props.children}
            </div>
        </div>)
}
export const RotatedItemDiv = (props) => {
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


    return (
        <RotateItemDiv degrees={degrees} userInput={(props.userInput || props.userInput === 0 ? props.userInput : -2)}>
            {props.children}
        </RotateItemDiv>
    )
}

export const Drawer = (props) => {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content">
                {props.children}
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    <li>Home</li>
                    <li>Profile</li>
                </ul>
            </div>
        </div>
    )
}
