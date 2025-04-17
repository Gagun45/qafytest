"use client";

import { signIn } from "next-auth/react";
import styles from "./LoginPage.module.css";
import Link from "next/link";

export default function LoginForm() {
  return (
    <main>
      <div className="w-full h-full flex justify-center pt-6 items-center">
        <div className='w-[325px] flex flex-col gap-[30px]'>
          <form className={styles.form}>
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <button className={styles.button}>Login</button>
            <Link href="/register">
              {"Dont have an account?"} <b>Register</b>
            </Link>
          </form>
          <button
            className={styles.button}
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Login via Google
          </button>
        </div>
      </div>
    </main>
  );
}
