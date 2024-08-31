"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";

export default function FormHeader() {
  return (
    <div className="mb-2 flex justify-center gap-3 p-2">
      <Image src={logo} alt="Logo" width={32} height={32} />
      <h2 className="text-3xl font-medium text-green-500">Feather</h2>
    </div>
  );
}
