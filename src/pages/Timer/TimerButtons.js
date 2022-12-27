import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export const DefaultTimeButton = (props) => {
  const HandleChange = (event) => {
    props.setTime(event.target.value);
    if (!props.isStarted.current && props.title === "Work") {
      props.setTimer(() => {
        return { minutes: event.target.value, seconds: 0 };
      });
      props.totalTime.current = event.target.value;
    }
  };
  return (
    <>
      <div className="justify-center items-center">
        <div
          style={{ width: props.borderSize }}
          className="flex mx-auto justify-center border-dashed border-t-neutral-300 border-t-2"
        >
          <label className="block">{props.title}</label>
        </div>

        <div className="flex justify-center items-center">
          <button
            className="btn-circle text-2xl px-auto btn btn-sm btn-ghost inline-block text-red-700"
            onClick={() => props.TimeHandler(-1)}
          >
            <FontAwesomeIcon icon={regular("circle-down")} />
          </button>
          <input
            type="range"
            step="1"
            min="1"
            max="180"
            value={props.time}
            className="range range-xs"
            onChange={HandleChange}
          />

          <button
            className="btn-circle text-2xl px-auto btn btn-sm btn-ghost inline-block text-green-600"
            onClick={() => props.TimeHandler(1)}
          >
            <FontAwesomeIcon icon={regular("circle-up")} />
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
        className="btn-circle text-2xl px-auto btn btn-sm btn-ghost inline-block"
        onClick={() => {
          props.setTimer(() => {
            return { minutes: 0, seconds: 0 };
          });
        }}
      >
        <FontAwesomeIcon icon={solid("forward")} />
      </button>
    </>
  );
};

export const ResetButton = (props) => {
  return (
    <>
      <button
        className="btn-circle text-2xl px-auto btn btn-sm btn-ghost inline-block"
        onClick={() => {
          props.setIsReset(() => true);
          props.setIsActive(() => false);
          props.isStarted.current = false;
        }}
      >
        <FontAwesomeIcon icon={solid("arrows-rotate")} />
      </button>
    </>
  );
};

export const PlayButton = (props) => {
  return (
    <>
      <button
        className="btn flex justify-center btn-sm btn-circle text-2xl px-auto btn-ghost"
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
