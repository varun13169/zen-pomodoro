import styles from "./countdownTimer.module.css";

import React from "react";
import { useState, useEffect } from "react";

export default function CountdownTimer({
  countdownTimerInMinutes,
  counterStartState,
  setCounterStartState,
}) {
  const { timeInMinutes } = countdownTimerInMinutes;
  const { counterStart } = counterStartState;

  const [timeLeftInMinsState, setTimeLeftInMinsState] = useState({
    timeLeftInMins: timeInMinutes,
    timeLeftInSec: 0,
  });

  let pctage =
    ((timeInMinutes - timeLeftInMinsState.timeLeftInMins) / timeInMinutes) *
    180;
  pctage = getCircleSectorToBeColor(timeLeftInMinsState, timeInMinutes);

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
    if (
      counterStart === true &&
      timeLeftInMinsState.timeLeftInMins >= -1 &&
      timeLeftInMinsState.timeLeftInSec >= -1 &&
      (timeLeftInMinsState.timeLeftInMins !== 0 ||
        timeLeftInMinsState.timeLeftInSec !== 0)
    ) {
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
    } else {
      setCounterStartState(false);
    }
  }, [timeLeftInMinsState, counterStartState]);

  return (
    <div>
      <div className={`${styles["circle-wrap"]}`}>
        <div className={`${styles["circle"]}`}>
          <div
            class={`${styles["mask"]} ${styles["full"]}`}
            style={{
              transform: `rotate(${pctage}deg)`,
            }}
          >
            <div
              class={`${styles["fill"]}`}
              style={{
                transform: `rotate(${pctage}deg)`,
              }}
            ></div>
          </div>
          <div class={`${styles["mask"]} ${styles["half"]}`}>
            <div
              class={`${styles["fill"]}`}
              style={{
                transform: `rotate(${pctage}deg)`,
              }}
            ></div>
          </div>
        </div>

        <div class={`${styles["inner-circle"]}`}>
          <p>
            {timeLeftInMinsState.timeLeftInMins} :{" "}
            {timeLeftInMinsState.timeLeftInSec}
          </p>
        </div>
      </div>
    </div>
  );
}

function getCircleSectorToBeColor(timeLeftInMinsState, timeInMinutes) {
  const totalTimeInSec = timeInMinutes * 60;
  const totalTimeLeftInSec =
    timeLeftInMinsState.timeLeftInMins * 60 + timeLeftInMinsState.timeLeftInSec;

  let pctage = ((totalTimeInSec - totalTimeLeftInSec) / totalTimeInSec) * 180;
  return pctage;
}
