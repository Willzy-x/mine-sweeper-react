import { React, useState, useEffect } from "react";
import _ from "lodash";

const TimerCounter = (props) => {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      let newSecond = second + 1;
      setMinute(parseInt(newSecond / 60) + minute);
      setSecond(newSecond % 60);
    }, 1000);
    return () => clearInterval(timerId);
  }, [minute, second]);

  return (
    <span className="badge badge-primary">
      Time: { _.padStart(minute, 2, "0") } : { _.padStart(second, 2, "0") }
    </span>
  );
};

export default TimerCounter;