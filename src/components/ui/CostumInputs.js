import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

export const InputField = (props) => {
  return (
    <input
      type={props.type}
      ref={props.forwardRef}
      placeholder={props.placeholder}
      defaultValue={props.default}
      className="input input-bordered bg-base-300 focus:outline-0 focus:bg-white input-sm w-full"
    />
  );
};

export const InputGroupField = (props) => {
  return (
    <div className="form-control p-1">
      <label className="input-group border-l-2 rounded-l-[var(--rounded-btn)] input-group-sm">
        <FontAwesomeIcon
          className={"m-auto px-1 " + props.iconClass}
          icon={props.icon}
        />
        <InputField
          type={props.type}
          forwardRef={props.forwardRef}
          placeholder={props.placeholder}
          default={props.default}
        />
      </label>
    </div>
  );
};
