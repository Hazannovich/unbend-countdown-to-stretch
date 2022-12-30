import React, { useState, useEffect, useRef } from "react";
import { ActiveCard, SpanTimer } from "../../components/ui/CostumDivs";
import Beep from "./beepbeep.mp3";
import { Stretch } from "./StretchList";
import useSound from "use-sound";
import {
  DefaultTimeButton,
  PlayButton,
  ResetButton,
  SkipButton,
} from "./TimerButtons";
import "./Timer.css";
const Timer = () => {
  const [defaultTime, setDefaultTime] = useState(25);
  const [defaultBreakTime, setDefaultBreakTime] = useState(5);
  const [timer, setTimer] = useState(defaultTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const isStarted = useRef(false);
  const [beep] = useSound(Beep, { volume: 0.25 });
  const totalTime = useRef(defaultTime);
  let intervalRef = useRef();
  const seconds = (timer % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const minutes = Math.floor(timer / 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const indSize = window.innerWidth <= 639 ? "16rem" : "19rem";
  const borderSize = window.innerWidth <= 639 ? "13rem" : "16rem";
  const secondsValue = (timer % 60) / 60;
  const minutesValue = Math.floor(timer / 60);
  const val =
    ((totalTime.current - (minutesValue + secondsValue)) / totalTime.current) *
    100;
  const DecreaseTime = () => setTimer((prev) => prev - 1);
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(DecreaseTime, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  if (timer === 0) {
    setIsBreak((currentStatus) => !currentStatus);
    if (!isBreak) {
      setTimer(() => defaultBreakTime * 60);
      totalTime.current = defaultBreakTime;
    } else {
      setTimer(() => defaultTime * 60);
      totalTime.current = defaultTime;
    }
    beep();
  }
  if (isReset) {
    setIsReset(() => false);
    setTimer(() => defaultTime * 60);
    totalTime.current = defaultTime;
  }
  const HandlePlayClick = () => {
    if (isActive) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(DecreaseTime, 1000);
    }
    setIsActive((currentIsActive) => !currentIsActive);
    isStarted.current = true;
  };

  if (isBreak) {
    return (
      <ActiveCard title="Stretch">
        <div
          className="fixed m-auto top-0 bottom-0 left-0 right-0 pointer-events-none text-secondary radial-progress"
          style={{ "--value": val, "--size": indSize, "--thickness": "3px" }}
        >
          <div className="pointer-events-auto">
            <Stretch />
          </div>
        </div>
      </ActiveCard>
    );
  }
  return (
    <>
      <ActiveCard title="Timer">
        <div
          className="fixed m-auto top-0 bottom-0 left-0 right-0 pointer-events-none text-secondary radial-progress"
          style={{ "--value": val, "--size": indSize, "--thickness": "3px" }}
        >
          <div className="pb-3 my-auto sm:pb-[1.5rem] px-auto pointer-events-auto text-primary">
            <div className="grid mb-3 grid-flow-col gap-0 justify-center text-center auto-cols-max">
              <div className="flex flex-col">
                <span
                  className={
                    (isStarted.current
                      ? "countdown "
                      : "mx-[0.85rem] sm:mx-[0.42rem] noCountdown ") +
                    "flex justify-center selection:font-mono sm:mt-1  text-5xl sm:text-2xl"
                  }
                >
                  {isStarted.current ? (
                    <SpanTimer value={minutes}></SpanTimer>
                  ) : (
                    <span>{minutes}</span>
                  )}
                </span>
              </div>
              <span className="flex justify-center font-mono text-5xl sm:text-2xl">
                :
              </span>
              <div className="flex justify-center flex-col">
                <span
                  className={
                    (timer.seconds !== 0
                      ? "countdown "
                      : "mx-[0.55rem] sm:mx-[0.28rem] noCountdown") +
                    "flex justify-center selection:font-mono text-5xl sm:text-2xl"
                  }
                >
                  {timer.seconds !== 0 ? (
                    <SpanTimer value={seconds}></SpanTimer>
                  ) : (
                    <span>{seconds}</span>
                  )}
                </span>
              </div>
            </div>
            <div className="flex justify-evenly items-center">
              <ResetButton
                setIsReset={setIsReset}
                setIsActive={setIsActive}
                isStarted={isStarted}
              />
              <PlayButton
                isActive={isActive}
                HandlePlayClick={HandlePlayClick}
              />
              <SkipButton setTimer={setTimer} />
            </div>
            <DefaultTimeButton
              title="Work"
              time={defaultTime}
              setTime={setDefaultTime}
              isStarted={isStarted}
              setTimer={setTimer}
              totalTime={totalTime}
              borderSize={borderSize}
            />
            <DefaultTimeButton
              title="Break"
              time={defaultBreakTime}
              setTime={setDefaultBreakTime}
              isStarted={isStarted}
              setTimer={setTimer}
              totalTime={totalTime}
              borderSize={borderSize}
            />
          </div>
        </div>
      </ActiveCard>
    </>
  );
};

export default Timer;
