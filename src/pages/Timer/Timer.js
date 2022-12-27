import React, { useState, useEffect, useRef } from "react";
import { ActiveCard, SpanTimer } from "../../components/ui/CostumDivs";
import Beep from "./beepbeep.mp3";
import { Stretch } from "./StretchList";
import useSound from "use-sound";
import { cleanup } from "@testing-library/react";
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
  const [timer, setTimer] = useState({ minutes: defaultTime, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const isStarted = useRef(false);
  const [beep] = useSound(Beep, { volume: 0.25 });
  const totalTime = useRef(defaultTime);
  const intervalRef = useRef();
  const seconds = timer.seconds.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const minutes = timer.minutes.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const indSize = window.innerWidth <= 639 ? "16rem" : "19rem";
  const borderSize = window.innerWidth <= 639 ? "13rem" : "16rem";
  const secondsValue = timer.seconds / 60;
  const val =
    ((totalTime.current - (timer.minutes + secondsValue)) / totalTime.current) *
    100;
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isActive) {
        if (timer.seconds === 0 && timer.minutes !== 0) {
          setTimer({ minutes: timer.minutes - 1, seconds: 59 });
        } else if (timer.seconds !== 0) {
          setTimer({ minutes: timer.minutes, seconds: timer.seconds - 1 });
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
      cleanup();
    };
  }, [isActive, timer]);

  if (timer.minutes === 0 && timer.seconds === 0) {
    setIsBreak((currentStatus) => !currentStatus);
    if (!isBreak) {
      setTimer(() => {
        return { minutes: defaultBreakTime, seconds: 0 };
      });
      totalTime.current = defaultBreakTime;
    } else {
      setTimer(() => {
        return { minutes: defaultTime, seconds: 0 };
      });
      totalTime.current = defaultTime;
    }
    beep();
  }
  if (isReset) {
    setIsReset(() => false);
    setTimer(() => {
      return { minutes: defaultTime, seconds: 0 };
    });
    totalTime.current = defaultTime;
  }

  const DefaultTimeHandler = (amount) => {
    setDefaultTime((curr) => {
      if (180 >= curr + amount && curr + amount >= 1) {
        return curr + amount;
      }
      return curr;
    });
    if (
      !isStarted.current &&
      180 >= defaultTime + amount &&
      defaultTime + amount >= 1
    ) {
      setTimer(() => {
        return { minutes: defaultTime + amount, seconds: 0 };
      });
      totalTime.current = defaultTime + amount;
    }
  };

  const DefaultBreakTimeHandler = (amount) => {
    return setDefaultBreakTime((curr) => {
      if (180 >= curr + amount && curr + amount >= 1) {
        return curr + amount;
      }
      return curr;
    });
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
          <div className="pointer-events-auto text-primary">
            <div className="grid grid-flow-col pb-2 gap-0 justify-center text-center auto-cols-max">
              <div className="flex flex-col">
                <span
                  className={
                    (isStarted.current ? "countdown " : "mx-[0.85rem] ") +
                    "flex justify-center selection:font-mono text-5xl sm:text-3xl"
                  }
                >
                  {isStarted.current ? (
                    <SpanTimer value={minutes}></SpanTimer>
                  ) : (
                    <span>{minutes}</span>
                  )}
                </span>
              </div>
              <div className="">
                <span className="flex justify-center font-mono text-5xl sm:text-3xl">
                  :
                </span>
              </div>
              <div className="flex justify-center flex-col">
                <span
                  className={
                    (timer.seconds !== 0 ? "countdown " : "mx-[0.55rem] ") +
                    "flex justify-center selection:font-mono text-5xl sm:text-3xl"
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
            <div className="flex justify-center items-center">
              <PlayButton
                setIsActive={setIsActive}
                isStarted={isStarted}
                isActive={isActive}
              />
              <ResetButton
                setIsReset={setIsReset}
                setIsActive={setIsActive}
                isStarted={isStarted}
              />
              <SkipButton setTimer={setTimer} />
            </div>
            <DefaultTimeButton
              title="Work"
              TimeHandler={DefaultTimeHandler}
              time={defaultTime}
              setTime={setDefaultTime}
              isStarted={isStarted}
              setTimer={setTimer}
              totalTime={totalTime}
              borderSize={borderSize}
            />
            <DefaultTimeButton
              title="Break"
              TimeHandler={DefaultBreakTimeHandler}
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
