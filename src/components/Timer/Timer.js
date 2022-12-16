import React, {useState} from "react";
import {motion} from "framer-motion";
import {AnimatedDiv} from "../CostumDivs";

const Timer = () => {

    const [defaultTime, setDefaultTime] = useState(25);
    const [timer, setTime] = React.useState({minutes: defaultTime, seconds: 0});
    const [isActive, setIsActive] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [userInput, setUserInput] = useState(defaultTime);
    const TimerChangeHandler = () => {
        if (isActive) {
            if (timer.seconds === 0) {
                setTime({minutes: timer.minutes - 1, seconds: 59})
            } else {
                setTime({minutes: timer.minutes, seconds: timer.seconds - 1})
            }
            if (timer.minutes === 0 && timer.seconds === 0) {
                setIsReset(true)
            }
        }
        if (isReset) {
            setIsActive(false)
            setTime({minutes: defaultTime, seconds: 0})
            setIsReset(false)
        }
    }
    const userChangeHandler = () => {
        setDefaultTime(userInput)
        setIsReset(true)
    }
    const userInputHandler = (event) => {
        setUserInput(event.target.value)
    }
    const ResetTimerHandler = () => {
        setIsReset(true)
    }
    const StartTimerHandler = () => {
        if (!isActive) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    setTimeout(TimerChangeHandler, 1000)
    return (
        <div>
            <AnimatedDiv>
                <div className="flex justify-center items-center">
                    <motion.h1
                        className={(isActive ? "" : "")}>{timer.minutes.toLocaleString('en-US', {
                        minimumIntegerDigits: 2
                    }) + ':' + timer.seconds.toLocaleString('en-US', {
                        minimumIntegerDigits: 2
                    })}</motion.h1>
                </div>
                <div>
                    <div className="flex justify-center items-center">
                        <motion.button
                            whileHover={{scale: 1.1}}
                            transition={{duration: 0.1}}
                            whileTap={{scale: 0.8}}
                            className="left-0 pr-2"
                            onClick={StartTimerHandler}>{isActive ? 'Stop' : 'Start'}
                        </motion.button>
                        <motion.button
                            whileHover={{scale: 1.1}}
                            transition={{duration: 0.1}}
                            whileTap={{scale: 0.8}}
                            className="right-0 pl-2"
                            onClick={ResetTimerHandler}>Reset
                        </motion.button>
                    </div>
                    <form>
                        <div className="flex justify-center items-center">
                            <label className="pr-1">Work:</label>
                            <input type={'number'} min={1} onChange={userInputHandler} onBlur={userChangeHandler}
                                   value={userInput}
                                   className="w-12 bg-primary py-2"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <label className="pr-1">Break:</label>
                            <input type={'number'} min={1} onChange={userInputHandler} onBlur={userChangeHandler}
                                   value={5}
                                   className="w-12 bg-primary "/>
                        </div>
                    </form>
                </div>
            </AnimatedDiv>
        </div>
    )
}

export default Timer