"use client";

import type { LinkInterface } from "../Navbar";
import NavLink from "../NavLink/NavLink";

export default function Login() {
  const link: LinkInterface = { title: "Login", path: "/login" };
  return <NavLink link={link} />;
}
