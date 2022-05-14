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
      timeInMinutes: 5,
    });

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
        <p>{title}</p>
        <p>{description}</p>

        <CountdownTimer
          countdownTimerInMinutes={countdownTimerInMinutesState}
          counterStartState={counterStartState}
        ></CountdownTimer>

        <button
          className={`${styles[""]} 
          dui-btn dui-btn--secondary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent`}
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
        {/* <button
          className={`${styles[""]} dui-btn dui-btn--secondary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent`}
        >
          Pause
        </button> */}
        <button
          className={`${styles[""]} dui-btn dui-btn--secondary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent`}
          onClick={() => {
            setCountdownTimerInMinutesState((countdownTimerInMinutesState) => {
              return { timeInMinutes: 5 };
            });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
