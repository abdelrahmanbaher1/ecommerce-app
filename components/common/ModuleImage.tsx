// import { IMAGE_DOMAINS } from "@/lib/helpers/constants";
// import React from "react";
// import Logo from "@/public/icons/cart.svg";
// import Image from "next/image";

// type TProps = {
//   src: string;
//   width?: number;
//   height?: number;
//   className?: string;
//   alt: string;
//   isCarousel?: boolean;
//   priority?: boolean;
//   onClick?: () => void;
//   imagestyles?: React.CSSProperties;
// };

// const fallBackImg = Logo;
// const ModuleImage = ({
//   src,
//   width = 24,
//   height = 24,
//   alt,
//   className,
//   isCarousel = false,
//   priority = false,
//   onClick,
//   imagestyles,
// }: TProps) => {
//   let flag = 0;
//   if (!IMAGE_DOMAINS.includes(src)) {
//     console.log({ here: src });

//     flag = 1;
//   }
//   return (
//     <div
//       className="relative transition-opacity duration-100 ease-linear opacity-100 overflow-hidden"
//       onClick={onClick}
//     >
//       <Image
//         src={flag === 1 ? fallBackImg : src}
//         loading="eager"
//         alt={alt}
//         width={width}
//         height={height}
//         className={className}
//         objectFit={isCarousel ? "cover" : ""}
//         layout="fill"
//         priority={priority}
//       />
//     </div>
//   );
// };

// export default ModuleImage;
