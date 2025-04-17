"use client";

import Logout from "./Logout";
import Login from "./Login";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Signin() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("UPDATED SESSION: ", session);
  }, [session, status]);

  if (status === "loading") {
    return <Link href="#" className="navLink logBtn"></Link>;
  }

  return session ? <Logout /> : <Login />;
}
