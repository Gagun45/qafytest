import { SessionProvider } from "next-auth/react";
import type React from "react";

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
