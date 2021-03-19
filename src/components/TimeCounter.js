import { React, useState, useEffect } from 'react';

const TimerCounter = (props) => {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);

  useEffect(() => {
    let timerId = setInterval(() => {
      let newSecond = second + 1;
      setMinute(parseInt(newSecond / 60) + minute);
      setSecond(newSecond % 60);
    }, 1000);
    return () => clearInterval(timerId);
  }, [minute, second]);

  return (
    <p>
      Time: { minute } : { second }
    </p>
  );
};

export default TimerCounter;