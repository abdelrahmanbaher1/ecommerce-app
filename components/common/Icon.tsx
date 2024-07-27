import { ICONS } from "@/lib/Icon";
import { TConfigIcons } from "@/lib/types";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

type TProps = {
  name: TConfigIcons;
  alt: string;
  size?: number;
  color?: string;
  onClick?: () => void;
  className?: string;
};

const Icon = ({
  className,
  name,
  alt,
  size = 25,
  color = "white",
  onClick,
}: TProps) => {
  const { resolvedTheme } = useTheme();
  const iconClass = resolvedTheme === "dark" ? "icon-dark" : "icon-light";

  return (
    <Image
      src={ICONS[name]}
      alt={alt}
      width={size}
      height={size}
      onClick={onClick}
      className={`icon ${iconClass}`}
      style={{ color: color }}
    />
  );
};

export default Icon;
