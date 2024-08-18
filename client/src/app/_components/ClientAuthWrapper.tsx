import { ReactNode } from "react";
import ClientAuth from "./ClientAuth";

export default async function ClientAuthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ClientAuth>{children}</ClientAuth>
    </>
  );
}
