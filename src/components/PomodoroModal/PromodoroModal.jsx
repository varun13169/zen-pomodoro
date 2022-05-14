import React from "react";
import { closePromodoroModel } from "./promodoroModalUtils";
import styles from "./promodoroModal.module.css";

export default function PromodoroModel({ modalDetails }) {
  const { _id, title, description, time } = modalDetails.taskDetails;

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

        <button
          className={`${styles[""]} dui-btn dui-btn--secondary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent`}
        >
          Start
        </button>
        <button
          className={`${styles[""]} dui-btn dui-btn--secondary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent`}
        >
          Pause
        </button>
        <button
          className={`${styles[""]} dui-btn dui-btn--secondary dui-util-bdr-radi-5px-s dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent`}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
