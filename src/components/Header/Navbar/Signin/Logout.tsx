"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button className="navLink" onClick={() => signOut()}>
      Logout
    </button>
  );
}
