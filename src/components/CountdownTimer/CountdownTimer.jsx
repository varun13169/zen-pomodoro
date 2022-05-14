import styles from "./countdownTimer.module.css";

import React from "react";
import { useState, useEffect } from "react";

export default function CountdownTimer({
  countdownTimerInMinutes,
  counterStartState,
}) {
  const { timeInMinutes } = countdownTimerInMinutes;
  const { counterStart } = counterStartState;

  const [timeLeftInMinsState, setTimeLeftInMinsState] = useState({
    timeLeftInMins: timeInMinutes,
    timeLeftInSec: 0,
  });

  useEffect(() => {
    setTimeLeftInMinsState((timeLeftInMinsState) => {
      return {
        ...timeLeftInMinsState,
        timeLeftInMins: countdownTimerInMinutes.timeInMinutes,
        timeLeftInSec: 0,
      };
    });
  }, [countdownTimerInMinutes]);

  useEffect(() => {
    if (counterStart === true && timeLeftInMinsState.timeLeftInMins !== 0) {
      setTimeout(() => {
        if (timeLeftInMinsState.timeLeftInSec === 0) {
          setTimeLeftInMinsState((timeLeftInMinsState) => {
            return {
              ...timeLeftInMinsState,
              timeLeftInMins: timeLeftInMinsState.timeLeftInMins - 1,
              timeLeftInSec: 59,
            };
          });
        } else {
          setTimeLeftInMinsState((timeLeftInMinsState) => {
            return {
              ...timeLeftInMinsState,
              timeLeftInSec: timeLeftInMinsState.timeLeftInSec - 1,
            };
          });
        }
      }, 1000);
    }
  }, [timeLeftInMinsState, counterStartState]);

  return (
    <div>
      <p>
        {timeLeftInMinsState.timeLeftInMins}:{" "}
        {timeLeftInMinsState.timeLeftInSec}
      </p>
    </div>
  );
}
