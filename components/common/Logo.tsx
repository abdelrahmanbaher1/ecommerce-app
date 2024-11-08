import React from "react";

type Props = {
  width?: string;
  height?: string;
};

const LogoIcon: React.FC<Props> = ({
  width = "100", // Default width
  height = "100", // Default height
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill="none"
      xmlSpace="preserve"
    >
      <g fillRule="evenodd" clipRule="evenodd">
        <path
          fill="#1E62D6"
          d="M128 352c53.023 0 96-42.977 96-96h32c0 70.688-57.309 128-128 128S0 326.688 0 256c0-70.691 57.309-128 128-128 31.398 0 60.141 11.344 82.406 30.117l-.039.059c3.414 2.93 5.625 7.215 5.625 12.082 0 8.824-7.156 16-16 16-3.859 0-7.371-1.434-10.145-3.723l-.039.059C173.109 168.516 151.562 160 128 160c-53.023 0-96 42.977-96 96s42.977 96 96 96z"
        />
        <path
          fill="#FF0083"
          d="M352 384c-8.844 0-16-7.156-16-16s7.156-16 16-16c53.023 0 96-42.977 96-96s-42.977-96-96-96-96 42.977-96 96h-32c0-70.691 57.312-128 128-128s128 57.309 128 128c0 70.688-57.312 128-128 128zm-64-48c8.844 0 16 7.156 16 16s-7.156 16-16 16-16-7.156-16-16 7.156-16 16-16z"
        />
      </g>
    </svg>
  );
};

export default LogoIcon;
