import Image from "next/image";
import Link from "next/link";

export default function FormHeader() {
  return (
    <div className="mb-2 flex justify-center p-2">
      <Link href={"/"} className="flex items-center gap-3">
        <Image src={"/logo.png"} alt="Logo" width={32} height={32} />
        <h2 className="text-3xl font-medium">Feather</h2>
      </Link>
    </div>
  );
}
