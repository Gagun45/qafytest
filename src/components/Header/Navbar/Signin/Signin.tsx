"use client";

import Logout from "./Logout";
import Login from "./Login";
import { useSession } from "next-auth/react";

export default function Signin() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <button className="navLink logBtn"></button>;
  }

  return session ? <Logout /> : <Login />;
}
