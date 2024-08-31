"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";

export default function FormHeader() {
  return (
    <Link
      href={"/auth/login/"}
      className="mb-2 flex items-center justify-center gap-3 p-2"
    >
      <div className="flex items-center justify-center">
        <Image src={logo} alt="Logo" className="object-cover" />
      </div>
      <h2 className="text-3xl font-medium text-green-500">Feather</h2>
    </Link>
  );
}
