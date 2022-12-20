import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";


const Timer = () => {

    const [defaultTime, setDefaultTime] = useState(25);
    const [defaultBreakTime, setDefaultBreakTime] = useState(5);
    const [timer, setTimer] = useState({minutes: defaultTime, seconds: 0});
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [timeIndicator, setTimeIndicator] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    useEffect(() => {
        const interval = setTimeout(() => {
            if (isActive) {
                setIsStarted(() => true);
                if (timer.minutes === 0 && timer.seconds === 0) {
                    setIsBreak((currentStatus) => !currentStatus)
                    if (isBreak) {
                        setTimer(() => {
                            return {minutes: defaultBreakTime, seconds: 0}
                        })
                    } else {
                        setTimer(() => {
                            return {minutes: defaultTime, seconds: 0}
                        })
                    }
                } else if (timer.seconds === 0) {
                    setTimer({minutes: timer.minutes - 1, seconds: 59});
                    if (isBreak) {
                        setTimeIndicator(() => defaultBreakTime - timer.minutes)
                    } else {
                        setTimeIndicator(() => defaultTime - timer.minutes)
                    }
                } else {
                    setTimer({minutes: timer.minutes, seconds: timer.seconds - 1});
                }
                if (isBreak) {
                    // <a href="#">break video </a>
                }
            }

        }, 1000)
        return () => {
            clearTimeout(interval)
        }
    }, [isBreak, isActive, timer, defaultTime, defaultBreakTime, timeIndicator])
    useEffect(() => {
        if (isReset) {
            setIsActive(() => false)
            setIsStarted(() => false)
        }
        if (!isStarted) {
            setTimer(() => {
                return {minutes: defaultTime, seconds: 0}
            })
        }
        setIsReset(() => false)
    }, [isReset, defaultTime, isStarted])

    const defaultTimeHandler = (amount) => {
        return setDefaultTime((curr) => {
                if (curr + amount >= 1) {
                    return curr + amount;
                }
                return curr;
            }
        )
    }
    const defaultBreakTimeHandler = (amount) => {
        return setDefaultBreakTime((curr) => {
            if (curr + amount > 0) {
                return curr + amount;
            }
            return curr;
        })
    }

    return (
        <div
            className=" flex h-screen text-xl text-secondary">
            <div
                className=" py-5 rounded-2xl border-white border-solid border-2 shadow-2xl shadow-inner drop-shadow-2xl m-auto">
                <div className={" text-4xl text-neutral-300 flex justify-center items-center"}>
                    <motion.h1
                        className={(isActive ? "" : "")}>{timer.minutes.toLocaleString('en-US', {
                        minimumIntegerDigits: 2
                    }) + ':' + timer.seconds.toLocaleString('en-US', {
                        minimumIntegerDigits: 2
                    })}</motion.h1>
                </div>
                <div className=" p-2 flex justify-center items-center">
                    <motion.button
                        whileHover={{scale: 1.1}}
                        transition={{duration: 0.1}}
                        whileTap={{scale: 0.8}}
                        className="left-0 p-2"
                        onClick={() => setIsActive(currentIsActive => !currentIsActive)}>{isActive ? 'Stop' : 'Start'}
                    </motion.button>
                    <motion.button
                        whileHover={{scale: 1.1}}
                        transition={{duration: 0.1}}
                        whileTap={{scale: 0.8}}
                        className="p-2"
                        onClick={() => setIsReset(() => true)}>Reset
                    </motion.button>
                </div>
                <form>
                    <div className="p-2 flex justify-center items-center">
                        <label className="p-2">Work:</label>
                        <motion.button
                            whileHover={{scale: 1.1}}
                            transition={{duration: 0.1}}
                            whileTap={{scale: 0.8}}
                            type={"button"}
                            onClick={() => defaultTimeHandler(-1)}>-
                        </motion.button>
                        <span className="text-neutral-300">{defaultTime}</span>
                        <motion.button
                            whileHover={{scale: 1.1}}
                            transition={{duration: 0.1}}
                            whileTap={{scale: 0.8}}
                            type={"button"}
                            onClick={() => defaultTimeHandler(1)}>+
                        </motion.button>
                    </div>
                    <div className="flex p-2 justify-center items-center">
                        <label className="p-2">Break:</label>
                        <motion.button
                            whileHover={{scale: 1.1}}
                            transition={{duration: 0.1}}
                            whileTap={{scale: 0.8}}
                            type={"button"}
                            onClick={() => defaultBreakTimeHandler(-1)}>-
                        </motion.button>
                        <span className="text-neutral-300">{defaultBreakTime}</span>
                        <motion.button
                            whileHover={{scale: 1.1}}
                            transition={{duration: 0.1}}
                            whileTap={{scale: 0.8}}
                            type={"button"}
                            onClick={() => defaultBreakTimeHandler(1)}>+
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Timer