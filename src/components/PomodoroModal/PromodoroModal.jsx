import React from "react";
import { closePromodoroModel } from "./promodoroModalUtils";
import styles from "./promodoroModal.module.css";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import { useState } from "react";

export default function PromodoroModel({ modalDetails }) {
  const { _id, title, description, time } = modalDetails.taskDetails;

  const [counterStartState, setCounterStartState] = useState({
    counterStart: false,
  });

  const [countdownTimerInMinutesState, setCountdownTimerInMinutesState] =
    useState({
      timeInMinutes: time,
    });
  console.log(typeof time);
  console.log(time);

  return (
    <div className="dui-modal" style={{ backgroundColor: "#c2c2c2db" }}>
      <div
        className={`${styles["pomodoro-content-holder"]} dui-util-spc-pad-m`}
      >
        <p
          className="dui-modal__close"
          onClick={() => modalDetails.actions.modalCloseAction()}
        >
          X
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <div>
            <p
              className={`dui-primary-color dui-util-txt-reg dui-util-fw-sbld`}
            >
              Promodoro
            </p>
            <CountdownTimer
              countdownTimerInMinutes={countdownTimerInMinutesState}
              counterStartState={counterStartState}
              setCounterStartState={setCounterStartState}
            ></CountdownTimer>

            <div className={`${styles["pomodoro-content-holder--actions"]}`}>
              <button
                className={`${styles["pomodoro-content-holder--action-start"]} 
          dui-btn dui-btn--primary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent`}
                onClick={() => {
                  setCounterStartState((counterStartState) => {
                    return {
                      ...counterStartState,
                      counterStart: !counterStartState.counterStart,
                    };
                  });
                }}
              >
                {counterStartState.counterStart === true ? "Pause" : "Start"}
              </button>
              <button
                className={`${styles["pomodoro-content-holder--action-reset"]} dui-btn dui-btn--secondary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent`}
                onClick={() => {
                  // Pause the counter
                  setCounterStartState((counterStartState) => {
                    return {
                      ...counterStartState,
                      counterStart: false,
                    };
                  });
                  // wraping in set timeout to queue it in
                  setTimeout(() => {
                    // reset the timer
                    setCountdownTimerInMinutesState(
                      (countdownTimerInMinutesState) => {
                        return { timeInMinutes: time };
                      }
                    );
                  }, 1000);
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <div className={`${styles["task-details"]}`}>
            <p className={`${styles["task-details--title"]} dui-util-fw-bld`}>
              {title}
            </p>
            <p className={`${styles["task-details--desc"]}`}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
