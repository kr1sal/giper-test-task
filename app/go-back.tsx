import Link from "next/link";
import {FcUpLeft} from "react-icons/fc";
import React from "react";

export default function GoBack() {
  return (
    <Link href="/" className="btn btn-square rounded-full">
      <FcUpLeft className="size-7"/>
    </Link>
  );
}