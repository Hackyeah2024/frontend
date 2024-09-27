"use client";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { ReactPlayerProps } from "react-player";

export const Player = (props: ReactPlayerProps) => {
  return <ReactPlayer {...props} />;
};
