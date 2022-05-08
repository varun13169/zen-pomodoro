import React from "react";

export default function ClockSVG(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-alarm"
      width="56"
      height="56"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#000000"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="13" r="7" />
      <polyline points="12 10 12 13 14 13" />
      <line x1="7" y1="4" x2="4.25" y2="6" />
      <line x1="17" y1="4" x2="19.75" y2="6" />
    </svg>
  );
}
