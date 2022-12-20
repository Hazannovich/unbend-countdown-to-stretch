import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {ActiveCard, Drawer, SpanTimer} from "../CostumDivs";


const Timer = () => {

    const [defaultTime, setDefaultTime] = useState(25);
    const [defaultBreakTime, setDefaultBreakTime] = useState(5);
    const [timer, setTimer] = useState({minutes: defaultTime, seconds: 0});
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [timeIndicator, setTimeIndicator] = useState(100 / defaultTime);
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
                        setTimeIndicator(() => ((defaultBreakTime - timer.minutes) / defaultBreakTime))
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
            setIsReset(() => false)
        }
        if (!isStarted) {
            setTimer(() => {
                return {minutes: defaultTime, seconds: 0}
            })
        }

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
    const minutes = timer.minutes.toLocaleString('en-US', {
        minimumIntegerDigits: 2
    })
    const seconds = timer.seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2
    })

    return (
        <>
            <ActiveCard>
                <div className="grid grid-flow-col gap-5 justify-center text-center auto-cols-max">
                    <div className="flex flex-col">
    <span className="countdown font-mono text-5xl sm:text-3xl">
     <SpanTimer value={minutes}></SpanTimer>
    </span>
                        min
                    </div>
                    <div className="flex flex-col">
    <span className="countdown font-mono text-5xl sm:text-3xl">
     <SpanTimer value={seconds}></SpanTimer>
    </span>sec
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <motion.button
                        whileHover={{scale: 1.1}}
                        transition={{duration: 0.1}}
                        whileTap={{scale: 0.8}}
                        className="pr-2"
                        onClick={() => setIsActive(currentIsActive => !currentIsActive)}>{isActive ? 'Stop' : 'Start'}
                    </motion.button>
                    <motion.button
                        whileHover={{scale: 1.1}}
                        transition={{duration: 0.1}}
                        whileTap={{scale: 0.8}}
                        className="pl-2"
                        onClick={() => setIsReset(() => true)}>Reset
                    </motion.button>
                </div>
                <div className="justify-center items-center">
                    <div className="flex justify-center border-t-neutral-300 border-t-2">
                        <label className="block">Work</label>
                    </div>
                    <div className="flex justify-center items-center">
                        <motion.button
                            whileHover={{scale: 1.1}}
                            transition={{duration: 0.1}}
                            whileTap={{scale: 0.8}}
                            type={"button"}
                            className="mr-1 mb-1 text-4xl text-red-900"
                            onClick={() => defaultTimeHandler(-1)}>-
                        </motion.button>
                        <span className="text-neutral-300 text-2xl sm:text-xl">{defaultTime}</span>
                        <motion.button
                            whileHover={{scale: 1.1}}
                            transition={{duration: 0.1}}
                            whileTap={{scale: 0.8}}
                            type={"button"}
                            className="ml-1 text-2xl text-green-300"
                            onClick={() => defaultTimeHandler(1)}>+
                        </motion.button>
                    </div>
                </div>
                <div className="justify-center items-center">
                    <div className="flex justify-center border-t-neutral-300 border-t-2">
                        <label className="block ">Break</label>
                    </div>
                    <div className="flex justify-center items-center">
                        <motion.button
                            whileHover={{scale: 1.1}}
                            transition={{duration: 0.1}}
                            whileTap={{scale: 0.8}}
                            type={"button"}
                            className="mr-1 mb-1 text-4xl text-red-900"
                            onClick={() => defaultBreakTimeHandler(-1)}>-
                        </motion.button>
                        <span className="text-neutral-300 text-2xl sm:text-xl">{defaultBreakTime}</span>
                        <motion.button
                            whileHover={{scale: 1.1}}
                            transition={{duration: 0.1}}
                            whileTap={{scale: 0.8}}
                            type={"button"}
                            className="ml-1 text-2xl text-green-300"
                            onClick={() => defaultBreakTimeHandler(1)}>+
                        </motion.button>
                    </div>
                </div>
            </ActiveCard>
        </>
    )
}

export default Timer