import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export const DefaultTimeButton = (props) => {
  const HandleTime = (event) => {
    if (event <= 180 && event >= 1) {
      props.setTime(() => event);
      if (!props.isStarted.current && props.title === "Work") {
        props.setTimer(() => {
          return { minutes: event, seconds: 0 };
        });
        props.totalTime.current = event;
      }
    }
  };
  const HandleUpdate = (event) => {
    props.setTime(() => props.time + event);
    if (!props.isStarted.current && props.title === "Work") {
      props.setTimer(() => {
        return { minutes: props.time + event, seconds: 0 };
      });
      props.totalTime.current = props.time + event;
    }
  };
  return (
    <>
      <div className="justify-center items-center">
        <div
          style={{ width: props.borderSize }}
          className="flex mx-auto justify-center border-dashed border-t-neutral-300 border-t-2"
        >
          <label className="flex mr-2 ">{props.title}</label>
          <output>{props.time}</output>
        </div>

        <div className="flex justify-center items-center">
          <button
            className="btn-circle text-2xl px-auto btn btn-sm btn-ghost inline-block text-red-700"
            onClick={() => HandleTime(parseInt(props.time - 1))}
          >
            <FontAwesomeIcon icon={regular("circle-left")} />
          </button>
          <input
            type="range"
            step="1"
            min="1"
            max="180"
            value={props.time}
            oninput="this.nextElementSibling.value = this.value"
            className={
              (props.title === "Work" ? "w-52 sm:w-44" : "w-44 sm:w-32") +
              " range range-xs"
            }
            onChange={(e) => HandleTime(parseInt(e.target.value))}
          />

          <button
            className="btn-circle text-2xl px-auto btn btn-sm btn-ghost inline-block text-green-600"
            onClick={() => HandleTime(parseInt(props.time + 1))}
          >
            <FontAwesomeIcon icon={regular("circle-right")} />
          </button>
        </div>
      </div>
    </>
  );
};

export const SkipButton = (props) => {
  return (
    <>
      <button
        className="btn-circle  p-auto text-[1rem] btn btn-sm btn-ghost"
        onClick={() => {
          props.setTimer(() => {
            return { minutes: 0, seconds: 0 };
          });
        }}
      >
        <FontAwesomeIcon
          className="border-solid border-primary border-[2.3px] rounded-full p-[0.2rem]"
          icon={solid("forward")}
        />
      </button>
    </>
  );
};

export const ResetButton = (props) => {
  return (
    <>
      <button
        className="btn-circle text-[1rem] p-auto btn btn-sm btn-ghost"
        onClick={() => {
          props.setIsReset(() => true);
          props.setIsActive(() => false);
          props.isStarted.current = false;
        }}
      >
        <FontAwesomeIcon
          className="border-solid border-primary border-[2.3px] rounded-full p-[0.2rem]"
          icon={solid("arrows-rotate")}
        />
      </button>
    </>
  );
};

export const PlayButton = (props) => {
  return (
    <>
      <button
        className="btn flex justify-center btn-sm btn-circle text-[1.67rem] p-auto btn-ghost"
        onClick={() => {
          props.setIsActive((currentIsActive) => !currentIsActive);
          props.isStarted.current = true;
        }}
      >
        {props.isActive ? (
          <FontAwesomeIcon
            className="text-red-700"
            icon={regular("circle-pause")}
          />
        ) : (
          <FontAwesomeIcon
            className="text-green-600"
            icon={regular("circle-play")}
          />
        )}
      </button>
    </>
  );
};
