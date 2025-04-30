"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLink from "../NavLink/NavLink";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

export default function ProfileLink() {
  const profileLink = {
    title: "Profile",
    path: "/profile",
  };
  const { data: session } = useSession();
  if (!session) {
    return null;
  }
  return (
    <NavLink key={"/profile"} link={profileLink}>
      <FontAwesomeIcon icon={faUser} className="hover:text-main"/>
    </NavLink>
  );
}
