import Link from "next/link";
import React from "react";

type Props = {};

function Header({}: Props) {
  return (
    <div className="flex items-center justify-between mx-auto max-w-6xl">
      I am the header
      <Link href={`/sign-in`} className="">
        Sign in
      </Link>
    </div>
  );
}

export default Header;
