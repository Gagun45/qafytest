"use client";

import Logout from "./Logout";
import Login from "./Login";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Signin() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Link href="#" className="navLink logBtn"></Link>;
  }

  return session ? <Logout /> : <Login />;
}
