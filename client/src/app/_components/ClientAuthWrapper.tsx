import { ReactNode } from "react";
import ClientAuth from "./ClientAuth";
import StoreProvider from "../_lib/StoreProvider";
import Toast from "./Toast";

export default async function ClientAuthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Toast />
      <StoreProvider>
        <ClientAuth>{children}</ClientAuth>
      </StoreProvider>
    </>
  );
}
