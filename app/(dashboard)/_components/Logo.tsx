import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-center w-28 mx-auto items-center">
      <Image
        src="../logo.svg"
        height={200}
        width={50}
        className="h-24 w-fit"
        alt="Logo of the application"
      />
    </div>
  );
};

export default Logo;
