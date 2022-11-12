import React, { useRef } from "react";
import "./Input.css";

const Input = (props) => {
  const ref = useRef(null);
  return (
    <div>
      <form className="formStyle">
        <input
          className="inputS"
          type="text"
          ref={ref}
          placeholder="Type Pokemon"
          onChange={(e) => props.onChange(e.target.value)}
        />
        <button className="buttonS" onClick={(e) => props.onClick(e)}>
          Search
        </button>
      </form>
    </div>
  );
};

export default Input;
