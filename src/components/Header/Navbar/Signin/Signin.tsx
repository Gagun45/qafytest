"use client";
import Logout from "./Logout";
import Login from "./Login";
import { useSession } from "next-auth/react";

export default function Signin() {
  const { data: session } = useSession();
  return <div>{session ? <Logout /> : <Login />}</div>;
}
