import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";

function Header() {
  return (
    <header className="flex justify-between items-center sticky top-0 bg-slate-50 z-50 shadow-md p-5">
      {/* Left */}
      <Image src={Logo} alt="Logo" height={50} width={50} />

      {/* Right */}
      <div className="flex sm:flex-row text-s h-full xs:text-base  divide-x items-center text-gray-500">
        <Link
          href=""
          target="_blank"
          className="p-2 md:px-2 font-light md:text-right"
        >
          About
        </Link>
        <Link href="" target="_blank" className="p-2 md:px-2 font-light">
          GitHub Repo
        </Link>
      </div>
    </header>
  );
}

export default Header;
